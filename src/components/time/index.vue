<template>
    <div class="maxtime">
        {{curtimer.year}}---{{curtimer.month}}---{{curtimer.day}} <br>
        {{curtimer.houers}}:{{curtimer.mini}}
    </div>
</template>

<script setup lang='ts'>
import {usetime} from '../../stores/counter'
import {onMounted,ref,reactive} from 'vue'
type timetype={
    year:string,
    month:string,
    day:string,
    houers:string,
    mini:string
}
let timers=usetime()
let curtime=ref<string>()
let curtimer=reactive<timetype>({
    year:"XXXX",
    month:"XX",
    day:"XX",
    houers:"XX",
    mini:"XX"

})

timers.getTime()
timers.$subscribe((a,b)=>{
    console.log(b.time)
    curtimer.year=b.time.split(' ')[0].split('.')[0]
    curtimer.month=b.time.split(' ')[0].split('.')[1]
    curtimer.day=b.time.split(' ')[0].split('.')[2]
    curtimer.houers=b.time.split(' ')[1].split(':')[0]
    curtimer.mini=b.time.split(' ')[1].split(':')[1]
})
</script>

<style  scoped>
.maxtime{
    font-size: 38px;
    text-align: center;
    color: white;
    margin-top: 5px;
    background-color: black;
    height: 100px;
}
</style>