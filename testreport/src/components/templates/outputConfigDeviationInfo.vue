<template>
    <div>
        <span>{{configCount+' configuration'+(configCount>1?'s have':' has')+' open deviations'}}</span>
    </div>
</template>
<script>
export default {
    name:'OutputConfDevInfo',
    props:{
        configCount:{
            type:Number,
            default:0
        }
    }
}
</script>