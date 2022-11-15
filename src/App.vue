<template>
    <div class="allcontent">
        <div class="left">
            <diquview></diquview>
            <errerea></errerea>
        </div>
        <div class="center">
            <times></times>
            <mapview></mapview>
        </div>
        <div class="right">
            <screenview></screenview>
        </div>
    </div>
</template>

<script setup lang='ts'>
import mapview from './components/mapview/index.vue'
import times from './components/time/index.vue'
import screenview from './components/screenview/index.vue'
import diquview from './components/diquview/index.vue'
import errerea from './components/errarea/index.vue'
</script>
<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.allcontent{
    display: flex;
}
.left{
    flex: 1;
}
.right{
    flex:1;
}
</style>