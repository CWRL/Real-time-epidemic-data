import {request} from '../../api'
export const getcurconfirms=()=>request({method:'get',url:'/api/curconfirm'})
export const getTimes=()=>request({method:'get',url:'/api/getTime'})
export const getcityvalue=(city:string)=>request({method:'get',url:`/api/getcityinfo?city=${city}`})
export const getareainfo=(area:string)=>request({method:'get',url:`/api/getarea?area=${area}`})
export const getdangerinfo=(area:string)=>request({method:'get',url:`/api/getdanger?area=${area}`})