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
    methods:{
        getsimpleResult(result){
            if(result.includes('FAIL')){
                return 'FAIL'
            }
            else if(result.includes('WARN')){
                return 'WARN'
            }
            else if(result.includes('OK.N/A')){
                return 'OK.N/A'
            }
            else if(result.includes('OK')){
                return 'OK'
            }
        },
        getResult(result){
            if(result.includes('fail')){
                return 'FAIL'
            }
            else if(result.includes('warn')){
                return 'WARN'
            }
            else if(result.includes('N/A')){
                return 'OK.N/A'
            }
            else{
                return 'OK'
            }
        },
        getTestRunResult(testrun){
            if(testrun.result){
                if('_text' in testrun.result){
                        return this.getResult(testrun.result._text)
                }
                else{
                    var result = []
                    testrun.result.forEach(elt=>{
                    result.push(this.getResult(elt._text))
                    })
                    return this.getsimpleResult(result)
                }
            }
        },
        getTestCaseResult(testcase){
            if(testcase.testrun){
                if('result' in testcase.testrun){
                    return this.getTestRunResult(testcase.testrun)
                }else{
                    var result = []
                    testcase.testrun.forEach(testrun=>{
                        result.push(this.getTestRunResult(testrun))
                    })

                    return this.getsimpleResult(result)
                }
            }
        }
    },
    mounted(){
        if(this.Type==='testcase'){
            console.log('name',this.name)
            console.log('testcases',this.Todraw)
            var testCases = this.Todraw
            var testcasesTested = testCases.filter(testcase=>{
                if(Array.isArray(testcase.testrun)){
                    return testcase.testrun.filter(testrun=>{
                        if(Array.isArray(testrun.result)){
                            return testrun.result.filter(result=>{ return result._text!==''}).length>0
                        }else{
                            return testrun.result._text!==''
                        }
                    }).length>0
                }else{
                    if(Array.isArray(testcase.testrun.result)){
                            return testcase.testrun.result.filter(result=>{ return result._text!==''}).length>0
                        }else{
                            return testcase.testrun.result._text!==''
                        }
                }
            })
            
            var testcasesPassed = testcasesTested.filter(testcase=>{
                return this.getTestCaseResult(testcase).includes('OK')
            })

            console.log('testcasetest',testcasesPassed)
            this.metrics.Total = testCases.length
            this.metrics.Tested = testcasesTested.length
            this.metrics.Passed = testcasesPassed.length

            this.metrics.Ok = testcasesPassed.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='OK'}).length

            this.metrics.NA = testcasesTested.filter(testcase=>{
                return this.getTestCaseResult(testcase).includes('N/A')}).length

            this.metrics.Warn = testCases.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='WARN'
            }).length
            this.metrics.Warn_Justified = testcasesTested.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='WARN'
            }).length

            // this.metrics.Fail = testCases.filter(elt=>{
            //     if(elt.testrun.length){
            //         return elt.testrun.filter(elt=>{elt.result._text==='fail'&&(elt.justification&&elt.justification.length===0)}).length!==0
            //     }else{
            //         return elt.testrun.result._text==='fail'&&(elt.testrun.justification&&elt.testrun.justification.length===0)
            //     }
            // }).length

            this.metrics.Fail = testCases.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='FAIL'
            }).length

            this.metrics.Fail_Justified = testcasesTested.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='FAIL'
            }).length

            this.metrics.ProcessError = testCases.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='FAIL'
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
            var testRunsTested = testRuns.filter(testrun=>{
                return 'result' in testrun
            })

            var testRunsPassed = testRunsTested.filter(testrun=>{
                return this.getTestRunResult(testrun).includes('OK')
            })

            this.metrics.Total = testRuns.length
            this.metrics.Tested = testRunsTested.length
            this.metrics.Passed = testRunsPassed.length

            this.metrics.Ok = testRunsPassed.filter(testrun=>{
              return this.getTestRunResult(testrun)==='OK'
            }).length

            this.metrics.NA = testRunsTested.filter(testrun=>{
                return this.getTestRunResult(testrun).includes('N/A')
                }).length

            this.metrics.Warn = testRunsTested.filter(testrun=>{
                return this.getTestRunResult(testrun)==='WARN'
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