<template>
    <div v-if="Type!=='coverage'">
        <span v-show="label">{{metrics.Tested===metrics.Total?metrics.Total:(metrics.Tested+'/'+metrics.Total)}} {{Name}}</span><br/>
        <div class="result-diag" data-toggle="tooltip" :title="result.text">
            <div class="flex" :style="'width:'+result.ok+'%;heigth:100%;background-color:#00FF00'"></div>
            <div class="flex" :style="'width:'+result.justified+'%;heigth:100%;background-color:green'"></div>
            <div class="flex" :style="'width:'+result.fail+'%;heigth:100%;background-color:red'"></div>
            <div class="flex" :style="'width:'+result.warn+'%;heigth:100%;background-color:yellow'"></div>
        </div>
    </div>
    <div v-else-if="Type==='coverage'&&Todraw.percentage!=='N/A'||!isNaN(Todraw.percentage)">
        <div :class="isNaN(parseInt(Todraw.percentage))?'result-diag':'result-diag-red'" data-toggle="tooltip" :title="result.text">
            <div class="flex" :style="'width:'+result.ok+'%;heigth:100%;background-color:#00FF00'"></div>
            <div class="flex" :style="'width:'+result.justified+'%;heigth:100%;background-color:green'"></div>
            <div class="flex" :style="'width:'+result.fail+'%;heigth:100%;background-color:red'"></div>
            <div class="flex" :style="'width:'+result.warn+'%;heigth:100%;background-color:yellow'"></div>
        </div>
    </div>
    <div v-else>
        <span>N/A</span>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    name:'metricsBar',
    props:{
        Todraw:{
            type:[Array,Object],
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
        },
        getTestrunByConfig(config){
            var testruns = []
            this.$store.state.testRuns.forEach(testrun=>{
                if(('config' in testrun._attributes)&&(testrun._attributes.config.includes(config))){
                    testruns.push(testrun)
                }
                else if(('parameter' in testrun._attributes)&&(testrun._attributes.parameter.includes(config))){
                    testruns.push(testrun)
                }
            })

            return testruns
        },
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
                return this.getTestCaseResult(testcase)==='WARN' && !this.testcaseIsJustified(testcase)
            }).length
            this.metrics.Warn_Justified = testcasesTested.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='WARN' && this.testcaseIsJustified(testcase)
            }).length

            this.metrics.Fail = testCases.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='FAIL' && !this.testcaseIsJustified(testcase)
            }).length

            this.metrics.Fail_Justified = testcasesTested.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='FAIL'&& this.testcaseIsJustified(testcase)
            }).length

            this.metrics.ProcessError = testCases.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='PROCESSERROR' && !this.testcaseIsJustified(testcase)
            }).length

            this.metrics.ProcessError_Justified = testCases.filter(testcase=>{
                return this.getTestCaseResult(testcase)==='PROCESSERROR' && this.testcaseIsJustified(testcase)
            }).length

            // this.metrics.NotPassed = this.metrics.Tested - this.metrics.Passed
            this.metrics.NotPassed = this.metrics.Fail+this.metrics.Warn+this.metrics.ProcessError
            this.metrics.NotPassed_Justified =this.metrics.Fail_Justified+this.metrics.Warn_Justified+this.metrics.ProcessError_Justified

            
            this.result.ok = this.metrics.Passed*100/this.metrics.Total

            this.result.fail = this.metrics.NotPassed*100/this.metrics.Total

            this.result.justified = this.metrics.NotPassed_Justified*100/this.metrics.Total

            this.result.text = (this.metrics.Tested===this.metrics.Total?this.metrics.Tested:(this.metrics.Tested+'/'+this.metrics.Total))+' tested\n'
            this.result.text += this.metrics.Passed+' passed'
            this.result.text +='\n'
            this.result.text += ' - '+this.metrics.Ok+'*ok '
            this.result.text += this.metrics.NA!==0?this.metrics.NA+'*N/A':''
            this.result.text +='\n'
            this.result.text += this.metrics.NotPassed!==0?(this.metrics.NotPassed+' Not Passed \n - '):''
            this.result.text += (this.metrics.Warn!==0?this.metrics.Warn+'*warn':'')+' '+(this.metrics.Fail!==0?this.metrics.Fail+'*fail':'')+' '+(this.metrics.ProcessError!==0?this.metrics.ProcessError+'*processError':'')
            this.result.text +='\n'
            this.result.text += (this.metrics.Warn_Justified!==0 || this.metrics.Fail_Justified!==0 || this.metrics.ProcessError_Justified!==0 )?((this.metrics.Warn_Justified+this.metrics.ProcessError_Justified+this.metrics.Fail_Justified)+' Not Passed + Justified\n - '):'' 
            this.result.text += (this.metrics.Warn_Justified!==0?this.metrics.Warn_Justified+'*warn':'')+' '+(this.metrics.ProcessError_Justified!==0?this.metrics.ProcessError_Justified+'*processError':'')+' '+(this.metrics.Fail_Justified!==0?this.metrics.Fail_Justified+'*fail':'')
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
                return this.getTestRunResult(testrun)==='WARN'&&!('justification' in testrun)
            }).length

            this.metrics.Fail = testRunsTested.filter(testrun=>{
                return this.getTestRunResult(testrun)==='FAIL'&&!('justification' in testrun)
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

            this.metrics.NotPassed = testRunsTested.filter(testrun=>{
                return !this.getTestRunResult(testrun).includes('OK')&&!('justification' in testrun)
            }).length
            this.metrics.NotPassed_Justified =this.metrics.Fail_Justified+this.metrics.Warn_Justified+this.metrics.ProcessError_Justified

            
            this.result.ok = this.metrics.Passed*100/this.metrics.Total

            this.result.fail = this.metrics.NotPassed*100/this.metrics.Total
            this.result.justified = this.metrics.NotPassed_Justified*100/this.metrics.Total

            this.result.text = (this.metrics.Tested===this.metrics.Total?this.metrics.Tested:(this.metrics.Tested+'/'+this.metrics.Total))+' tested\n'
            this.result.text += this.metrics.Passed+' passed'
            this.result.text +='\n'
            this.result.text += ' - '+this.metrics.Ok+'*ok '
            this.result.text += this.metrics.NA!==0?this.metrics.NA+'*N/A':''
            this.result.text +='\n'
            this.result.text += this.metrics.NotPassed!==0?(this.metrics.NotPassed+' Not Passed \n - '):''
            this.result.text += (this.metrics.Warn!==0?this.metrics.Warn+'*warn':'')+' '+(this.metrics.Fail!==0?this.metrics.Fail+'*fail':'')+' '+(this.metrics.ProcessError!==0?this.metrics.ProcessError+'*processError':'')
            this.result.text +='\n'
            this.result.text += (this.metrics.Warn_Justified!==0 || this.metrics.Fail_Justified!==0 || this.metrics.ProcessError_Justified!==0 )?((this.metrics.Warn_Justified+this.metrics.ProcessError_Justified+this.metrics.Fail_Justified)+' Not Passed + Justified\n - '):'' 
            this.result.text += (this.metrics.Warn_Justified!==0?this.metrics.Warn_Justified+'*warn':'')+' '+(this.metrics.ProcessError_Justified!==0?this.metrics.ProcessError_Justified+'*processError':'')+' '+(this.metrics.Fail_Justified!==0?this.metrics.Fail_Justified+'*fail':'')
        }
        else if(this.Type==='testconfig'){
            console.log('this.Todraw',this.Todraw)
            var Configs = this.Todraw
            var testconfigs = []
            
            Configs.forEach(config=>{
                var configuration = {}
                configuration.name = config
                configuration.testruns = this.getTestrunByConfig(config)
                testconfigs.push(configuration)
            })
            
            var testConfigTested = testconfigs.filter(config=>{return config.testruns.filter(testrun=>{return 'result' in testrun&&testrun.result._text!=='NT' }).length>0})
            
            var testConfigPassed = testconfigs.filter(config=>{return config.testruns.filter(testrun=>{return 'result' in testrun&&this.getTestRunResult(testrun).includes('OK')}).length===config.testruns.filter(testrun=>{return 'result' in testrun}).length})

            this.metrics.Total = testconfigs.length
            this.metrics.Tested = testConfigTested.length
            this.metrics.Passed = testConfigPassed.length

            this.metrics.Ok = testConfigPassed.filter(config=>{return config.testruns.filter(testrun=>{return'result' in testrun&& this.getTestRunResult(testrun)==='OK'}).length>0}).length

            this.metrics.NA = testConfigPassed.filter(config=>{return config.testruns.filter(testrun=>{return 'result' in testrun&&this.getTestRunResult(testrun).includes('N/A')}).length>0}).length

            this.metrics.Warn = testconfigs.filter(config=>{return config.testruns.filter(testrun=>{return 'result' in testrun&&this.getTestRunResult(testrun)==='WARN'&&!('justification' in testrun)}).length>0}).length
           
            this.metrics.Fail = testconfigs.filter(config=>{return config.testruns.filter(testrun=>{return 'result' in testrun&&this.getTestRunResult(testrun)==='FAIL'&&!('justification' in testrun)}).length>0}).length


            this.metrics.Warn_Justified = testConfigTested.filter(config=>{return config.testruns.filter(testrun=>{return 'result' in testrun&&this.getTestRunResult(testrun)==='WARN'&&('justification' in testrun)}).length>0}).length
            this.metrics.Fail_Justified = testConfigTested.filter(config=>{return config.testruns.filter(testrun=>{return 'result' in testrun&&this.getTestRunResult(testrun)==='FAIL'&&('justification' in testrun)}).length>0}).length


            this.metrics.ProcessError = testconfigs.filter(config=>{return config.testruns.filter(testrun=>{return 'result' in testrun&&this.getTestRunResult(testrun)==='PROCESSERROR'}).length>0}).length

           
            this.metrics.NotPassed = testConfigTested.filter(config=>{return config.testruns.filter(testrun=>{return 'result' in testrun&&this.getTestRunResult(testrun)!=='OK'&&!this.getTestRunResult(testrun).includes('N/A')&&!('justification' in testrun)}).length>0}).length
            this.metrics.NotPassed_Justified = testConfigTested.filter(config=>{return config.testruns.filter(testrun=>{return 'result' in testrun&&this.getTestRunResult(testrun)!=='OK'&&!this.getTestRunResult(testrun).includes('N/A')&&('justification' in testrun)}).length>0}).length

            
            this.result.ok = this.metrics.Passed*100/this.metrics.Total

            this.result.fail = this.metrics.NotPassed*100/this.metrics.Total

            this.result.justified = this.metrics.NotPassed_Justified *100/this.metrics.Total
            this.result.text = (this.metrics.Tested===this.metrics.Total?this.metrics.Tested:(this.metrics.Tested+'/'+this.metrics.Total))+' tested\n'
            this.result.text += this.metrics.Passed+' passed'
            this.result.text +='\n'
            this.result.text += ' - '+this.metrics.Ok+'*ok '
            this.result.text += this.metrics.NA!==0?this.metrics.NA+'*N/A':''
            this.result.text +='\n'
            this.result.text += (this.metrics.Warn_Justified!==0 || this.metrics.Fail_Justified!==0) ?(this.metrics.NotPassed_Justified +' Not Passed + Justified\n - '):'' 
            this.result.text += (this.metrics.Warn_Justified!==0?this.metrics.Warn_Justified+'*warn':'')+' '+' '+(this.metrics.Fail_Justified!==0?this.metrics.Fail_Justified+'*fail':'')
            this.result.text +='\n'
            this.result.text += this.metrics.NotPassed!==0?(this.metrics.NotPassed+' Not Passed + UnJustified \n - '):''
            this.result.text += (this.metrics.Warn!==0?this.metrics.Warn+'*warn':'')+' '+(this.metrics.Fail!==0?this.metrics.Fail+'*fail':'')+' '+(this.metrics.ProcessError!==0?this.metrics.ProcessError+'*processError':'')
        }
        else if(this.Type==='coverage'){
            var coverage = this.Todraw

            this.result.text = parseInt(coverage.accepted)+'/'+parseInt(coverage.count)+' covered ('+parseInt(coverage.percentageJustified)+'%)\n'
            this.result.text+= ' - '+parseInt(coverage.covered)+' measured ('+parseInt(coverage.percentage)+'%)\n'
            if((coverage.covered!==coverage.accepted)){
                this.result.text+= ' - '+(parseInt(coverage.accepted)-parseInt(coverage.covered))+' justified \n'
            }
            if((coverage.count!==coverage.accepted)){
                this.result.text+= ' - '+(parseInt(coverage.count)-parseInt(coverage.accepted))+' uncovered \n'
            }

            this.result.justified = (parseInt(coverage.accepted)-parseInt(coverage.covered))*100/coverage.count

            this.result.fail = (parseInt(coverage.count)-parseInt(coverage.accepted))*100/coverage.count

            this.result.ok = parseInt(coverage.covered)*100/coverage.count
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
  .result-diag-red{
    display:flex;
    flex-direction: row;
    width:100%;
    height: 5px;
    background: rgb(207, 0, 0);
  }

</style>