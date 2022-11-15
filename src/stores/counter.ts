import { defineStore } from 'pinia'
import { storeName } from './name'
import { getcurconfirms, getTimes, getcityvalue,getareainfo,getdangerinfo} from '../request/mapinfo'
import type { RootObject, Message, RootObject1,RootObject2,RootObject3} from './type'
export const useMapcurconfirm = defineStore(storeName.MAP, {
  state: () => {
    return {
      curconsfirm: <RootObject[]>[]
    }
  },
  actions: {
    async getcurconfirm() {
      try {
        let n = await getcurconfirms()
        if (n.status === 502) {
          await this.getcurconfirm()
        }
        else if (n.status !== 200) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          await this.getcurconfirm()
        }
        else {
          if (JSON.stringify(this.curconsfirm) !== JSON.stringify(n.data.message)) {
            this.curconsfirm = n.data.message
          }
          await new Promise(resolve => setTimeout(resolve, 60000));
          await this.getcurconfirm()
        }
      }
      catch (err) {
        console.log((err as any).message)
        this.curconsfirm = []
        await this.getcurconfirm()
      }
    }
  }
})
export const usetime = defineStore(storeName.TIME, {
  state: () => {
    return {
      time: ''
    }
  },
  actions: {
    async getTime() {
      try {
        let data = await getTimes()
        if (data.status === 504) {
          this.getTime()
        }
        else if (data.status !== 200) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          this.getTime
        }
        else {
          if (this.time !== data.data.message) {
            this.time = data.data.message
          }
          // await new Promise(resolve => setTimeout(resolve, 600000));
          await this.getTime()
        }
      } catch (error) {
        console.log(error)
        this.time = ''
        await getTimes()
      }
    }
  }
})
export const getcityinfo = defineStore(storeName.CITY, {
  state: () => {
    return {
      cityvalue: <Message[]>[],
      cityname:''
    }
  },
  actions: {
    async getcity(city: string) {
      if(city!==this.cityname){
        return
      }
      try {
        const n = await getcityvalue(city)
        if (n.status === 504) {
          await this.getcity(city)
        }
        else if (n.status !== 200) {
          await new Promise(resolve => setTimeout(resolve, 1000))
          await this.getcity(city)
        }
        else {
          if(JSON.stringify(this.cityvalue)!==JSON.stringify(n.data.message)){
            this.cityvalue = n.data.message
          }
          await this.getcity(city)
        }
      } catch (error:any) {
        console.log(error.message)
        // await new Promise(resolve => setTimeout(resolve, 600000));
        await this.getcity(city)
      }
    }
  }
})
export const usegetareavalue=defineStore(storeName.AREA,{
  state:()=>{
    return {
      areainfo:[]
    }
  },
  actions:{
    async getarea(area:string){
      const n=await getareainfo(area)
      this.areainfo=n.data.message
    }
  }
})
export const usedangervalue=defineStore(storeName.DANGER,{
  state:()=>{
    return {
      dangerinfo:[],
      onedangerinfo:<any[]>[]
    }
  },
  actions:{
   async getdangerinfo(area:string){
      this.dangerinfo=[]
      this.onedangerinfo=[]
      const n=await getdangerinfo(area)
      this.dangerinfo=n.data
    },
    getsetdata(value:string,dangerstate:string){
      console.log(value,dangerstate)
      this.dangerinfo.forEach((items:RootObject3)=>{
        if(items.city===value){
          if(dangerstate==='高风险'){
            this.onedangerinfo=items.danger.map((item)=>{
              return{
                value:1,
                name:item.area
              }
            })
          }
          if(dangerstate==='中风险'){
            this.onedangerinfo=items.modeldanger.map((item)=>{
              return{
                value:1,
                name:item.area
              }
            })
          }
        }
      })
    console.log(this.onedangerinfo)
    }
  }
})
