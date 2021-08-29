<template>
<div class="MetricBarBase" :data-tooltip="tooltip">
    <div :class="percentageBarClass" style="position: relative;z-index: 0;">
        <div :class="subBar1Class" :style="'position: absolute;z-index: 1;width: '+subBar1Value+'%'"></div>
        <div :class="subBar2Class" :style="'position: absolute;z-index: 2;width: '+subBar2Value+'%'"></div>
    </div>
</div>
</template>
<script>
  export default {
      props:{
          percentageBarClass:{
              type:String,
              default:'MetricBarRed'
          },
          subBar1Class:{
              type:String,
              default:'MetricBarGreen'
          },
          subBar2Class:{
              type:String,
              default:'MetricBarLime'
          },
          subBar1Value:{
              type:Number,
              default:100
          },
          subBar2Value:{
              type:Number,
              default:100
          },
          tooltip:{
              type:String,
              default:''
          }
      }
  }
</script>
<style scoped>
div.MetricBarBase
{
    height: 6px;
    background-color: #a5a5a5;
    border-style: none;
    border-width: 0;
}

div.MetricBarRed
{
    height: 6px;
    background-color: #FF0000;
    border-style: none;
    border-width: 0;
}

div.MetricBarGreen
{
    height: 6px;
    background-color: #00A000;
    border-style: none;
    border-width: 0;
}

div.MetricBarLime
{
    height: 6px;
    background-color: #00FF00;
    border-style: none;
    border-width: 0;
}
</style>
  