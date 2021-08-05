<template>
    <div class="preloader">      
        <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
        {{message}}
    </div>
</template>

<script>
export default {
    name:'preloader',
    props:{
        message:{
            type:String,
            default:''
        }
    }
}
</script>

<style scoped>
.preloader{
    color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 99999;
}
</style>