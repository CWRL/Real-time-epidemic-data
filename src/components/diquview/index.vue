<template>
   <el-table :data="areavalue" border style="width:350px;background-color:black" :header-cell-style="{color:'white','background':'black'}" 
   :cell-style="{color:'white','background':'black'}" :row-style="{'background':'black'}">
    <el-table-column prop="curConfirm" label="现有确诊" width="87.5" />
    <el-table-column prop="confirmedRelative" label="新增确诊" width="87.5" />
    <el-table-column prop="nativeRelative" label="新增本土" width="87.5"/>
    <el-table-column prop="confirmed" label="累计确诊" width="87.5"/>
  </el-table>
  <el-table :data="areavalue" border style="width:350px;background-color:black" :header-cell-style="{color:'white','background':'black'}"
  :cell-style="{color:'white','background':'black'}" :row-style="{'background':'black'}">
    <el-table-column prop="asymptomaticLocalRelative" label="新增本土无疫情" width="87.5" />
    <el-table-column prop="asymptomatic" label="累计无症状" width="87.5" />
    <el-table-column prop="crued" label="累计治愈"  width="87.5"/>
    <el-table-column prop="died" label="累计死亡"  width="87.5"/>
  </el-table>
</template>

<script setup lang='ts'>
import {usegetareavalue} from '../../stores/counter'
import {getCurrentInstance,ref} from 'vue'
type city={
  name:string,
  value?:number[]
}
let areavalue=ref([])
const areainfo=usegetareavalue()
const instance=getCurrentInstance() as any
const getareainfo=async(area:city)=>{
   await areainfo.getarea(area.name)
   areavalue.value=areainfo.areainfo

}
getareainfo({
  name:'重庆'
})
instance?.proxy?.$bus.on('setarea',getareainfo)


</script>

<style  scoped>

</style>