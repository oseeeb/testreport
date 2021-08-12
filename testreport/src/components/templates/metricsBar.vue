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
        Todraw:{
            type:Array,
            default:new Array()
        },
        Name:{
            type:String,
            default:''
        },
        Type:{
            type:String,
            default:''
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
    },
    mounted(){
        if(this.Type==='testcase'){
            var testCases = this.Todraw
            var testcasesTested = testCases.filter(elt=>{
                if(elt.testrun.length){
                    return elt.testrun.filter(elt=>{return elt.result._text===''}).length===0
                }else{
                    return elt.testrun.result._text!==''
                }
            })
            
            var testcasesPassed = testcasesTested.filter(elt=>{
                if(elt.testrun.length){
                    return elt.testrun.filter(elt=>{
                        var test = !elt.result._text.includes('ok')
                        return test}).length===0
                }else{
                    return elt.testrun.result._text.includes('ok')
                }
            })
            console.log('testcasetest',testcasesPassed)
            this.metrics.Total = testCases.length
            this.metrics.Tested = testcasesTested.length
            this.metrics.Passed = testcasesPassed.length

            this.metrics.Ok = testcasesPassed.filter(elt=>{
                if(elt.testrun.length){
                    return elt.testrun.filter(elt=>{return elt.result._text!=='ok'}).length===0
                }else{
                    return elt.testrun.result._text==='ok'
                }}).length

            this.metrics.NA = testcasesTested.filter(elt=>{
                if(elt.testrun.length){
                    return elt.testrun.filter(elt=>{return elt.result._text!=='N/A'}).length===0
                }else{
                    return elt.testrun.result._text==='N/A'
                }}).length

            this.metrics.Warn = testCases.filter(elt=>{
                if(elt.testrun.length){
                    return elt.testrun.filter(elt=>{return elt.result._text==='warn'&&(elt.justification&&elt.justification.length===0)}).length!==0
                }else{
                    return elt.testrun.result._text==='warn'&&(elt.testrun.justification&&elt.testrun.justification.length===0)
                }
            }).length
            this.metrics.Warn_Justified = testcasesTested.filter(elt=>{
                if(elt.testrun.length){
                    return elt.testrun.filter(elt=>{elt.result._text==='warn'&&(elt.justification&&elt.justification.length!==0)}).length!==0
                }else{
                    return elt.testrun.result._text==='warn'&&(elt.testrun.justification&&elt.testrun.justification.length!==0)
                }
            }).length
            this.metrics.Fail = testCases.filter(elt=>{
                if(elt.testrun.length){
                    return elt.testrun.filter(elt=>{elt.result._text==='fail'&&(elt.justification&&elt.justification.length===0)}).length!==0
                }else{
                    return elt.testrun.result._text==='fail'&&(elt.testrun.justification&&elt.testrun.justification.length===0)
                }
            }).length
            this.metrics.Fail_Justified = testcasesTested.filter(elt=>{
                if(elt.testrun.length){
                    return elt.testrun.filter(elt=>{elt.result._text==='fail'&&(elt.justification&&elt.justification.length!==0)}).length!==0
                }else{
                    return elt.testrun.result._text==='fail'&&(elt.testrun.justification&&elt.testrun.justification.length!==0)
                }
            }).length
            this.metrics.ProcessError = testCases.filter(elt=>{
                if(elt.testrun.length){
                    return elt.testrun.filter(elt=>{elt.result._text==='processError'&&(elt.justification&&elt.justification.length===0)}).length!==0
                }else{
                    return elt.testrun.result._text==='processError'&&(elt.testrun.justification&&elt.testrun.justification.length===0)
                }
            }).length
            // this.metrics.NotPassed =
            // this.metrics.NotPassed_Justified =
            // this.metrics.Accepted =

            // var totalTestcases = testCases.length
            // testCases.map(elt=>{
            //     var obj = elt;
            //     if(elt.testrun.length){
            //         var totalTestRun = elt.testrun.length
            //         var result_ok = elt.testrun.filter(elt=>{return elt.result._text.includes('ok')})
                    
            //         obj.result = result_ok.length===totalTestRun?'passed':'fail'
            //     }else{
            //         obj.result = elt.testrun.result._text==='ok'||elt.testrun.result._text===''?'passed':'fail'
            //     }

            //     return obj
            // })
            // console.log('testcases from metrics',testCases)
            this.result.ok = this.metrics.Passed*100/this.metrics.Total

            this.result.fail = this.metrics.Fail*100/this.metrics.Total

            this.result.text = this.metrics.Tested+'/'+this.metrics.Total+' tested\n'
            this.result.text += this.metrics.Passed+' passed\n'
            this.result.text += this.metrics.Ok+'*ok \n'
            this.result.text += this.metrics.NA+'*N/A \n'
        }
        else if(this.Type==='testrun'){
            var testRuns = this.Todraw
            var testRunsTested = testRuns.filter(elt=>{
                return elt.result
            })

            var testRunsPassed = testRunsTested.filter(elt=>{
                return (elt.result._text.includes('ok')||elt.result._text.includes('N/A'))
            })

            this.metrics.Total = testRuns.length
            this.metrics.Tested = testRunsTested.length
            this.metrics.Passed = testRunsPassed.length

            this.metrics.Ok = testRunsPassed.filter(elt=>{
              return elt.result._text!=='ok'
            }).length

            this.metrics.NA = testRunsTested.filter(elt=>{
                return elt.result._text==='N/A'
                }).length

            this.metrics.Warn = testRunsTested.filter(elt=>{
                return elt.result._text==='warn'
            }).length

            // this.metrics.Warn_Justified = testcasesTested.filter(elt=>{
            //     if(elt.testrun.length){
            //         return elt.testrun.filter(elt=>{elt.result._text==='warn'&&(elt.justification&&elt.justification.length!==0)}).length!==0
            //     }else{
            //         return elt.testrun.result._text==='warn'&&(elt.testrun.justification&&elt.testrun.justification.length!==0)
            //     }
            // }).length
            // this.metrics.Fail = testCases.filter(elt=>{
            //     if(elt.testrun.length){
            //         return elt.testrun.filter(elt=>{elt.result._text==='fail'&&(elt.justification&&elt.justification.length===0)}).length!==0
            //     }else{
            //         return elt.testrun.result._text==='fail'&&(elt.testrun.justification&&elt.testrun.justification.length===0)
            //     }
            // }).length
            // this.metrics.Fail_Justified = testcasesTested.filter(elt=>{
            //     if(elt.testrun.length){
            //         return elt.testrun.filter(elt=>{elt.result._text==='fail'&&(elt.justification&&elt.justification.length!==0)}).length!==0
            //     }else{
            //         return elt.testrun.result._text==='fail'&&(elt.testrun.justification&&elt.testrun.justification.length!==0)
            //     }
            // }).length
            // this.metrics.ProcessError = testCases.filter(elt=>{
            //     if(elt.testrun.length){
            //         return elt.testrun.filter(elt=>{elt.result._text==='processError'&&(elt.justification&&elt.justification.length===0)}).length!==0
            //     }else{
            //         return elt.testrun.result._text==='processError'&&(elt.testrun.justification&&elt.testrun.justification.length===0)
            //     }
            // }).length
            // this.metrics.NotPassed =
            // this.metrics.NotPassed_Justified =
            // this.metrics.Accepted =

            
            this.result.ok = this.metrics.Passed*100/this.metrics.Total

            this.result.fail = this.metrics.Fail*100/this.metrics.Total

            this.result.text = this.metrics.Tested+'/'+this.metrics.Total+' tested\n'
            this.result.text += this.metrics.Passed+' passed\n'
            this.result.text += this.metrics.Ok+'*ok \n'
            this.result.text += this.metrics.NA+'*N/A \n'
        }
    }
}
</script>
<style scoped>
  .result-diag{
    display:flex;
    flex-direction: row;
    width:100%;
    height: 5px;
    background: rgb(44, 44, 44);
  }

  [data-tooltip] {
    position: relative;
    z-index: 2;
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
    z-index:100;
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