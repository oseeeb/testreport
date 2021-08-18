<template>
    <div>
        <span>{{Todraw.length+' '+Name}}</span><br/>
        <div class="result-diag" :data-tooltip="result.text">
            <div class="flex" :style="'width:'+result.ok+'%;heigth:100%;background-color:#00FF00'"></div>
            <div class="flex" :style="'width:'+result.fail+'%;heigth:100%;background-color:red'"></div>
            <div class="flex" :style="'width:'+result.warn+'%;heigth:100%;background-color:yellow'"></div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    name:'metricsBar',
    props:{
        Testcase:{
            type:[Object,Array]
        }
    },
    data(){
        return{
            result:{
                text:'',
                fail:0,
                warn:0,
                ok:0,
            },
            metrics:{}
        }
    }
}
</script>
<style>
  .result-diag{
    display:flex;
    flex-direction: row;
    width:100%;
    height: 5px;
    background: rgb(44, 44, 44);
  }

  [data-tooltip] {
    position: relative;
    z-index: 9999;
    cursor: default;
  }
  [data-tooltip]:before,
  [data-tooltip]:after {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  }

          /* Position tooltip above the element */
  [data-tooltip]:before {
    position: absolute;
    bottom: 150%;
    left: 50%;
    margin-bottom: 5px;
    margin-left: -5px;
    padding: 7px;
    width: 150px;
    min-width:50px;
    -webkit-border-radius: 3px;
    -moz-border-radius:    3px;
    border-radius:         3px;
    background-color: #181818;
    color: rgb(255, 255, 255);
    content: attr(data-tooltip);
    text-align: left;
    white-space: normal;
    font-size: 10pt;
    line-height: 1.2;
  }
  [data-tooltip]:after {
    position: absolute;
    bottom: 150%;
    left: 50%;
    width: 0;
    border-top: 5px solid #ffffff;
    border-top: 5px solid rgba(255, 255, 255, 0.98);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  }

    /* Applies settings to the "after" content of an element that has class "riskTooltip" and that has an attribute with name "data-tooltip" */
    .riskTooltip[data-tooltip]:after {
    left: 0;
    }

    /* Show tooltip content on hover */
    [data-tooltip]:hover:before,
    [data-tooltip]:hover:after {
    visibility: visible;
    opacity: 1;
    }
</style>