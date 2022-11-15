import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'element-plus/dist/index.css'
import {ElTable,ElRadioGroup,ElDescriptions} from 'element-plus'
import mitt from 'mitt'
const Mitt=mitt()
declare module '@vue/runtime-core'{
    export interface ComponentCustomProperties{
        $bus:typeof Mitt
    }
}
const app = createApp(App)
app.config.globalProperties.$bus=Mitt
app.component('ElTable',ElTable)
app.component('ElRadioGroup',ElRadioGroup)
app.component('ElDescriptions',ElDescriptions)
app.use(createPinia())

app.mount('#app')
