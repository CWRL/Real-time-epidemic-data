<template>
<el-radio-group v-model="mx" style="margin-top: 20px;">
    <el-radio v-for="item in dangervalue" :key="item" :label="item" style="color:red" @click.native.stop="setdata(item,citystate)">{{item}}</el-radio>
</el-radio-group>
<br>
<el-radio-group v-model="citystate" style="margin-left:100px;margin-top: 20px;">
    <el-radio label="高风险" style="color:red" @click.native="setdata(mx,'高风险')">高风险</el-radio>
    <el-radio label="中风险" style="color:orange" @click.native="setdata(mx,'中风险')">中风险</el-radio>
</el-radio-group>
<div id="danger"></div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts'
import { computed, ref,onMounted,getCurrentInstance,reactive,toRaw} from 'vue'
import {usedangervalue} from '../../stores/counter'
import type {RootObject3} from '../../stores/type'
const dangerinfo=usedangervalue()
const instance=getCurrentInstance() as any
type city={
  name:string,
  value?:number[]
}
type dangertype={
    value:number,
    name:string
}
let mx=ref('')
let dangervalue=ref<string[]>([])
let dangerview=ref<dangertype[]>([])
const getdanger=async(area:city)=>{
    await dangerinfo.getdangerinfo(area.name)
    let value1:string[]=[]
    dangerinfo.dangerinfo.forEach((value:RootObject3)=>{
        if(value.danger.length!==0 || value.modeldanger.length!==0){
            value1.push(value.city)
        }
    })
    dangervalue.value=value1
    mx.value=value1[0]
    setdata(mx.value,citystate.value)

}
getdanger({name:'重庆'})
instance?.proxy?.$bus.on('setdanger',getdanger)
let citystate=ref('高风险')
let echart:any
let dangerviewfunction=()=>{
    echart?.dispose()
    echart=echarts.init(document.getElementById('danger') as HTMLElement)
    echart.setOption({
    tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: toRaw(dangerview.value),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
}
dangerinfo.$subscribe((a,b)=>{
    dangerview.value=dangerinfo.onedangerinfo
    dangerviewfunction()
})
const setdata=async(value:string,dangerstate:string)=>{
   await dangerinfo.getsetdata(value,dangerstate)
}
</script>
<style  scoped>
#err{
    width: 100%;
    height: 400px;
}
#danger{
    width: 350px;
    height: 200px;
}
</style>