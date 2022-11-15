<template>
    <div id="china">
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts'
import { onMounted,watch,ref,getCurrentInstance} from 'vue';
import '../../assets/china.js'
import {geoCoordMap} from './indext'
import {useMapcurconfirm} from '../../stores/counter'
const curconfirm=useMapcurconfirm()
const instance=getCurrentInstance()
curconfirm.getcurconfirm()
type city={
  name:string,
  value:number[]
}
let mychart:any
curconfirm.$subscribe((args,state)=>{
    let data=state.curconsfirm.map((value,item)=>{
    if(geoCoordMap[value.area]){
        if(value.area=='重庆'){
          return{
            name:value.area,
            value:geoCoordMap[value.area].concat(value.curConfirm),
            selected:true
          }
        }
        return {
            name:value.area,
            value:geoCoordMap[value.area].concat(value.curConfirm),
        }
    }
    })
    mychart?.dispose()
    mychart=echarts.init(document.getElementById('china') as HTMLElement)
    mychart.setOption({
        geo: {
          map: "china",
          aspectScale: 0.8,
          layoutCenter: ["50%", "50%"],
          layoutSize: "140%",
          itemStyle: {
              areaColor: {
                type: "linear-gradient",
                x: 0,
                y: 1200,
                x2: 1000,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#152E6E", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#0673AD", // 50% 处的颜色
                  },
                ],
              global: true, // 缺省为 false
              shadowColor: "#0f5d9d",
              shadowOffsetX: 0,
              shadowOffsetY: 15,
              opacity: 0.5,
            },
          },
          emphasis: {
              areaColor: "#0f5d9d",
            },
          regions: [
            {
              name: "南海诸岛",
              itemStyle: {
                areaColor: "rgba(0, 10, 52, 1)",
                borderColor: "rgba(0, 10, 52, 1)",
                  opacity: 0,
                  label: {
                    show: true,
                    color: "#009cc9",
                  },
              },
              label: {
                show: false,
                color: "#FFFFFF",
                fontSize: 12,
              },
            },
          ],
        },
        series: [
          {
            type: "map",
            selectedMode: "single",
            map: "china",
            aspectScale: 0.8,
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: "140%",
            zoom: 1, //当前视角的缩放比例
            // roam: true, //是否开启平游或缩放
            scaleLimit: {
              //滚轮缩放的极限控制
              min: 1,
              max: 2,
            },
            label: {
              show: true,
              color: "#FFFFFF",
              fontSize: 16,
            },
            itemStyle: {
                areaColor: "#0c3653",
                borderColor: "#1cccff",
                borderWidth: 1.8,
            },
            emphasis: {
                areaColor: "#56b1da",
                label: {
                  show: true,
                  color: "#fff",
                },
            },
            data: data,
          },
          {
              name: 'Top 5',
              type: 'scatter',
              coordinateSystem: 'geo',
            //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
            //   symbolSize: [30,120],
            //   symbolOffset:[0, '-40%'] ,
             symbol:'pin',
             symbolSize: [45,45],
              label: {
                      show: true,
                      formatter:(value:any)=>{
                        return value.data.value[2]
                      }

              },
              itemStyle: {
                      color: '#D8BC37', //标志颜色
              },
              data: data,
          },
        ],
      })
    mychart.on('click',(a:any)=>{
      instance?.proxy?.$bus.emit('setcity',a.data as city)
      instance?.proxy?.$bus.emit('setarea',a.data as city)
      instance?.proxy?.$bus.emit('setdanger',a.data as city)
    })
})
onMounted(()=>{
  mychart=echarts.init(document.getElementById('china') as HTMLElement)
  mychart.setOption({
        geo: {
          map: "china",
          aspectScale: 0.8,
          layoutCenter: ["50%", "50%"],
          layoutSize: "140%",
          itemStyle: {
              areaColor: {
                type: "linear-gradient",
                x: 0,
                y: 1200,
                x2: 1000,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#152E6E", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#0673AD", // 50% 处的颜色
                  },
                ],
              global: true, // 缺省为 false
              shadowColor: "#0f5d9d",
              shadowOffsetX: 0,
              shadowOffsetY: 15,
              opacity: 0.5,
            },
          },
          emphasis: {
              areaColor: "#0f5d9d",
            },
          regions: [
            {
              name: "南海诸岛",
              itemStyle: {
                areaColor: "rgba(0, 10, 52, 1)",
                borderColor: "rgba(0, 10, 52, 1)",
                  opacity: 0,
                  label: {
                    show: true,
                    color: "#009cc9",
                  },
              },
              label: {
                show: false,
                color: "#FFFFFF",
                fontSize: 12,
              },
            },
          ],
        },
        series: [
          {
            type: "map",
            selectedMode: "single",
            map: "china",
            aspectScale: 0.8,
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: "140%",
            zoom: 1, //当前视角的缩放比例
            // roam: true, //是否开启平游或缩放
            scaleLimit: {
              //滚轮缩放的极限控制
              min: 1,
              max: 2,
            },
            label: {
              show: true,
              color: "#FFFFFF",
              fontSize: 16,
            },
            itemStyle: {
                areaColor: "#0c3653",
                borderColor: "#1cccff",
                borderWidth: 1.8,
            },
            emphasis: {
                areaColor: "#56b1da",
                label: {
                  show: true,
                  color: "#fff",
                },
            },
            data:[
            {name:'重庆', selected:true}
            ],
          },
          {
              name: 'Top 5',
              type: 'scatter',
              coordinateSystem: 'geo',
            //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
            //   symbolSize: [30,120],
            //   symbolOffset:[0, '-40%'] ,
             symbol:'pin',
             symbolSize: [45,45],
              label: {
                      show: true,
                      formatter:(value:any)=>{
                        return value.data.value[2]
                      }

              },
              itemStyle: {
                      color: '#D8BC37', //标志颜色
              },
              data:[],
          },
        ],
      })
})

</script>

<style  scoped>
    #china {
    width: 800px;
    height: 500px;
    transform: translateY(10%);
}
</style>