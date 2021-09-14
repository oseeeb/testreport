<template>
    <div>
        <span v-show="label">{{Todraw.length+' '+Name}}</span><br/>
        <div class="result-diag" data-toggle="tooltip" :title="result.text">
            <div class="flex" :style="'width:'+result.ok+'%;heigth:100%;background-color:#00FF00'"></div>
            <div class="flex" :style="'width:'+result.justified+'%;heigth:100%;background-color:green'"></div>
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
        },
        label:{
            type:Boolean,
            default:true
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
            else if(result.includes('processError')){
                return 'PROCESSERROR'
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
            else if(result.toLowerCase().includes('processerror')){
                return 'processError'
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
        },
        testcaseIsJustified(testcase){
            var testrunsJust = []
            if('testrun' in testcase){
                if(Array.isArray(testcase.testrun)){
                    testrunsJust = testcase.testrun.filter(testrun=>{
                        return 'justification' in testrun
                    })
                }
            }

            return testrunsJust.length===0?false:true
        }
    },
    mounted(){
        if(this.Type==='testcase'){
            var testCases = this.Todraw
            var testcasesTested = testCases.filter(testcase=>{
                if('testrun' in testcase){
                    if(Array.isArray(testcase.testrun)){
                        return testcase.testrun.filter(testrun=>{
                            if('result' in testrun){
                                if(Array.isArray(testrun.result)){
                                return testrun.result.filter(result=>{ return result._text!==''}).length>0
                                }else{
                                    return testrun.result._text!==''
                                }
                            }
                        }).length>0
                    }else{
                        if('result' in testcase.testrun){
                            if(Array.isArray(testcase.testrun.result)){
                                return testcase.testrun.result.filter(result=>{ return result._text!==''}).length>0
                            }else{
                                return testcase.testrun.result._text!==''
                            }
                        }
                    }
                }
            })
            
            var testcasesPassed = testcasesTested.filter(testcase=>{
                return this.getTestCaseResult(testcase).includes('OK')
            })

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
                return this.getTestCaseResult(testcase)==='WARN' && this.testcaseIsJustified(testcase)
            }).length

            this.metrics.Fail = testCases.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='FAIL'
            }).length

            this.metrics.Fail_Justified = testcasesTested.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='FAIL'&& this.testcaseIsJustified(testcase)
            }).length

            this.metrics.ProcessError = testCases.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='PROCESSERROR'
            }).length

            this.metrics.ProcessError_Justified = testCases.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='PROCESSERROR' && this.testcaseIsJustified(testcase)
            }).length

            // this.metrics.NotPassed = this.metrics.Tested - this.metrics.Passed
            this.metrics.NotPassed = this.metrics.Fail+this.metrics.Warn+this.metrics.ProcessError
            this.metrics.NotPassed_Justified =this.metrics.Fail_Justified+this.metrics.Warn_Justified+this.metrics.ProcessError_Justified

            
            this.result.ok = this.metrics.Passed*100/this.metrics.Total

            this.result.fail = (this.metrics.NotPassed-this.metrics.NotPassed_Justified)*100/this.metrics.Total

            this.result.justified = this.metrics.NotPassed_Justified*100/this.metrics.Total

            this.result.text = this.metrics.Tested+'/'+this.metrics.Total+' tested\n'
            this.result.text += this.metrics.Passed+' passed\n'
            this.result.text += this.metrics.Ok+'*ok '
            this.result.text += this.metrics.NA!==0?this.metrics.NA+'*N/A \n':''
            this.result.text += this.metrics.NotPassed+' Not Passed \n'
            this.result.text += (this.metrics.Warn!==0?this.metrics.Warn+'*warn':'')+' '+(this.metrics.Fail!==0?this.metrics.Fail+'*fail \n':'')+' '+(this.metrics.ProcessError!==0?this.metrics.ProcessError+'*processError \n':'')
            
            this.result.text += (this.metrics.Warn_Justified!==0 || this.metrics.Fail_Justified!==0 || this.metrics.ProcessError_Justified!==0 )?((this.metrics.Warn_Justified+this.metrics.ProcessError_Justified+this.metrics.Fail_Justified)+' Not Passed Justified\n'):'' 
            this.result.text += (this.metrics.Warn_Justified!==0?this.metrics.Warn_Justified+'*warn':'')+' '+(this.metrics.ProcessError_Justified!==0?this.metrics.ProcessError_Justified+'*processError':'')+' '+(this.metrics.Fail_Justified!==0?this.metrics.Fail_Justified+'*fail \n':'')
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

            this.metrics.Fail = testRunsTested.filter(testrun=>{
                return this.getTestRunResult(testrun)==='FAIL'
            }).length

            this.metrics.Warn_Justified = testRunsTested.filter(testrun=>{
                return this.getTestRunResult(testrun)==='WARN'&&'justification' in testrun
            }).length

           
            this.metrics.Fail_Justified = testRunsTested.filter(testrun=>{
                 return this.getTestRunResult(testrun)==='FAIL'&&'justification' in testrun
            }).length

            this.metrics.ProcessError = testRunsTested.filter(testrun=>{
                 return this.getTestRunResult(testrun)==='PROCESSERROR'
            }).length

            this.metrics.ProcessError_Justified = testRunsTested.filter(testrun=>{
                 return this.getTestRunResult(testrun)==='PROCESSERROR'&&'justification' in testrun
            }).length

            this.metrics.NotPassed = this.metrics.Fail+this.metrics.Warn+this.metrics.ProcessError
            this.metrics.NotPassed_Justified =this.metrics.Fail_Justified+this.metrics.Warn_Justified+this.metrics.ProcessError_Justified

            
            this.result.ok = this.metrics.Passed*100/this.metrics.Total

            this.result.fail = this.metrics.NotPassed*100/this.metrics.Total

            this.result.justified = this.metrics.NotPassed_Justified*100/this.metrics.Total

            this.result.text = this.metrics.Tested+'/'+this.metrics.Total+' tested\n'
            this.result.text += this.metrics.Passed+' passed\n'
            this.result.text += this.metrics.Ok+'*ok \n'
            this.result.text += this.metrics.NA!==0?this.metrics.NA+'*N/A \n':''
            this.result.text += this.metrics.Warn!==0?this.metrics.Warn+'*warn \n':''
            this.result.text += this.metrics.Warn_Justified!==0?this.metrics.Warn_Justified+'*warn Justified\n':''
            this.result.text += this.metrics.Fail!==0?this.metrics.Fail+'*fail \n':''
            this.result.text += this.metrics.Fail_Justified!==0?this.metrics.Fail_Justified+'*fail Justified \n':''
            this.result.text += this.metrics.ProcessError!==0?this.metrics.ProcessError+'*processError \n':''
            this.result.text += this.metrics.ProcessError_Justified!==0?this.metrics.ProcessError_Justified+'*ProcessError Justified \n':''
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
    background: rgb(168, 166, 166);
  }

</style>