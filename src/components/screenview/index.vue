<template>
    <el-table :data="cityvalues" border style="width: 350px;background-color:black" size="small" height="600"
     :cell-style="cellstyle" :header-cell-style="{background:'black','font-size':'5px',color:'white',height:'20'}"
     :header-row-style="{height:'10px','line-height':'10px'}">
    <el-table-column prop="city" label="城市" width="37"/>
    <el-table-column prop="curConfirm" label="现有确诊" width="37" />
    <el-table-column prop="confirmedRelative" label="新增确诊" width="37" />
    <el-table-column prop="nativeRelative" label="新增本土" width="37"/>
    <el-table-column prop="confirmed" label="累计确诊" width="37"/>
    <el-table-column prop="asymptomaticLocalRelative" label="新增本土无疫情" width="37"/>
    <el-table-column prop="asymptomatic" label="累计无症状" width="37"/>
    <el-table-column prop="crued" label="累计治愈" width="37"/>
    <el-table-column prop="died" label="累计死亡" width="37"/>
  </el-table>
</template>

<script setup lang='ts'>
import {getCurrentInstance,reactive,ref} from 'vue'
import {getcityinfo} from '../../stores/counter'
import type {Message} from '../../stores/type'
const cityinfo=getcityinfo()
let cityvalues=ref<Message[]>([])

type city={
  name:string,
  value?:number[]
}
cityinfo.$subscribe((a,b)=>{
  cityvalues.value=b.cityvalue
})
const instance=getCurrentInstance() as any
const getcity=(a:city)=>{
  cityinfo.cityname=a.name
  cityinfo.getcity(a.name)
}
getcity({
  name:'重庆'
})
instance?.proxy?.$bus.on('setcity',getcity)
let cellstyle={
    color:'white',
    background:'black',
    'font-size':'10px'
}
</script>

<style  scoped>
.el-main{
  line-height:0;
}
</style>