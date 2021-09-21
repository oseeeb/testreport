/* eslint-disable */
<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
        <md-table md-card>
            <md-table-toolbar>
                <h1 class="md-title">TestCases with Justification</h1>
                <h2 class="md-subhead">Total Test Cases with Justification : {{testCasesWithJustification.length}}</h2>
            </md-table-toolbar>
            <md-table-row>
                <md-table-head style="width:20%;">TestCase ID</md-table-head>
                <md-table-head style="width:20%;">Result</md-table-head>
                <md-table-head style="width:20%;">Justification</md-table-head>
            </md-table-row>
            <md-table-row v-for="(item,key) in testCasesWithJustification" :key="key">
                <md-table-cell>{{item.id}}</md-table-cell>
                <md-table-cell data-toggle="tooltip" :title="getTestRunMetrics(item.testrun)" :style="'text-align:center;background-color:green'">{{item.result}}</md-table-cell>
                <md-table-cell><span>{{item.justification}}</span></md-table-cell>
            </md-table-row>
        </md-table>
      </div> 
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      testCasesWithJustification:[],
    }
  },
  methods:{
    getsimpleResult(result){
      if(result.includes('processError')){
          return 'PROCESSERROR'
      }
      else if(result.includes('FAIL')){
          return 'FAIL'
      }
      else if(result.includes('WARN')){
          return 'WARN'
      }
      else if(result.includes('processError*')){
          return 'PROCESSERROR*'
      }
      else if(result.includes('FAIL*')){
          return 'FAIL*'
      }
      else if(result.includes('WARN*')){
          return 'WARN*'
      }
      else if(result.includes('OK.N/A')){
          return 'OK'
      }
      else if(result.includes('OK')){
          return 'OK'
      }
    },
    getResult(result,isJustified){
        if(result.toLowerCase().includes('processerror')){
            if(isJustified){
                return 'processError*'
            }else{
                return 'processError'
            }
        }
        else if(result.includes('fail')){
            if(isJustified){
                return 'FAIL*'
            }else{
                return 'FAIL'
            }
        }
        else if(result.includes('warn')){
            if(isJustified){
                return 'WARN*'
            }else{
                return 'WARN'
            }
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
            var isJustified = 'justification' in testrun
            if('_text' in testrun.result){
                    return this.getResult(testrun.result._text,isJustified)
            }
            else{
                var result = []
                testrun.result.forEach(elt=>{
                result.push(this.getResult(elt._text,isJustified))
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
    getTestRunMetrics(testruns){
        var testRuns = testruns
        
        var metrics = {}
        var result= {
                        text:'',
                        fail:0,
                        warn:0,
                        ok:0,
                    }
        if(Array.isArray(testRuns)){
          var testRunsTested = testRuns.filter(testrun=>{
              return 'result' in testrun
          })

          var testRunsPassed = testRunsTested.filter(testrun=>{
              return this.getTestRunResult(testrun).includes('OK')
          })

          metrics.Total = testRuns.length
          metrics.Tested = testRunsTested.length
          metrics.Passed = testRunsPassed.length

          metrics.Ok = testRunsPassed.filter(testrun=>{
            return this.getTestRunResult(testrun)==='OK'
          }).length

          metrics.NA = testRunsTested.filter(testrun=>{
              return this.getTestRunResult(testrun).includes('N/A')
              }).length

          metrics.Warn = testRunsTested.filter(testrun=>{
              return this.getTestRunResult(testrun)==='WARN'&&!('justification' in testrun)
          }).length

          metrics.Fail = testRunsTested.filter(testrun=>{
              return this.getTestRunResult(testrun)==='FAIL'&&!('justification' in testrun)
          }).length

          metrics.Warn_Justified = testRunsTested.filter(testrun=>{
              return this.getTestRunResult(testrun)==='WARN'&&'justification' in testrun
          }).length

          
          metrics.Fail_Justified = testRunsTested.filter(testrun=>{
                return this.getTestRunResult(testrun)==='FAIL'&&'justification' in testrun
          }).length

          metrics.ProcessError = testRunsTested.filter(testrun=>{
                return this.getTestRunResult(testrun)==='PROCESSERROR'
          }).length

          metrics.ProcessError_Justified = testRunsTested.filter(testrun=>{
                return this.getTestRunResult(testrun)==='PROCESSERROR'&&'justification' in testrun
          }).length

          metrics.NotPassed = testRunsTested.filter(testrun=>{
              return !this.getTestRunResult(testrun).includes('OK')&&!('justification' in testrun)
          }).length

        }
        else{
          metrics.Total = 1
          metrics.Tested = 'result' in testRuns?1:0
          metrics.Passed = 'result' in testRuns&&this.getTestRunResult(testRuns).includes('OK')?1:0
          
          metrics.Ok = 'result' in testRuns&&this.getTestRunResult(testRuns)==='OK'?1:0

          metrics.NA = 'result' in testRuns&&this.getTestRunResult(testRuns).includes('N/A')?1:0

          metrics.Warn = 'result' in testRuns&&this.getTestRunResult(testRuns)==='WARN'&&!('justification' in testRuns)?1:0

          metrics.Fail = 'result' in testRuns&&this.getTestRunResult(testRuns)==='FAIL'&&!('justification' in testRuns)?1:0

          metrics.Warn_Justified = 'result' in testRuns&&this.getTestRunResult(testRuns)==='WARN'&&('justification' in testRuns)?1:0

          
          metrics.Fail_Justified = 'result' in testRuns&&this.getTestRunResult(testRuns)==='FAIL'&&('justification' in testRuns)?1:0

          metrics.ProcessError =  'result' in testRuns&&this.getTestRunResult(testRuns)==='PROCESSERROR'&&!('justification' in testRuns)?1:0

          metrics.ProcessError_Justified = 'result' in testRuns&&this.getTestRunResult(testRuns)==='PROCESSERROR'&&('justification' in testRuns)?1:0

          metrics.NotPassed = 'result' in testRuns&&!this.getTestRunResult(testRuns).includes('OK')&&!('justification' in testRuns)?1:0

        }
        
        metrics.NotPassed_Justified =metrics.Fail_Justified+metrics.Warn_Justified+metrics.ProcessError_Justified

        
        result.ok = metrics.Passed*100/metrics.Total

        result.fail = metrics.NotPassed*100/metrics.Total
        result.justified = metrics.NotPassed_Justified*100/metrics.Total

        result.text = (metrics.Tested===metrics.Total?metrics.Tested:(metrics.Tested+'/'+metrics.Total))+' tested\n'
        result.text += metrics.Passed+' passed'
        result.text +='\n'
        result.text += ' - '+metrics.Ok+'*ok '
        result.text += metrics.NA!==0?metrics.NA+'*N/A':''
        result.text +='\n'
        result.text += metrics.NotPassed!==0?(metrics.NotPassed+' Not Passed \n - '):''
        result.text += (metrics.Warn!==0?metrics.Warn+'*warn':'')+' '+(metrics.Fail!==0?metrics.Fail+'*fail':'')+' '+(metrics.ProcessError!==0?metrics.ProcessError+'*processError':'')
        result.text +='\n'
        result.text += (metrics.Warn_Justified!==0 || metrics.Fail_Justified!==0 || metrics.ProcessError_Justified!==0 )?((metrics.Warn_Justified+metrics.ProcessError_Justified+metrics.Fail_Justified)+' Not Passed + Justified\n - '):'' 
        result.text += (metrics.Warn_Justified!==0?metrics.Warn_Justified+'*warn':'')+' '+(metrics.ProcessError_Justified!==0?metrics.ProcessError_Justified+'*processError':'')+' '+(metrics.Fail_Justified!==0?metrics.Fail_Justified+'*fail':'')
        
        return result.text 
    },
  },
  mounted(){
    let TestCaseJustification = new Set()
    for (const testCase of this.$store.state.testCases) {
        if ('testrun' in testCase) {
            if(Array.isArray(testCase.testrun)){
                for(const testrun of testCase.testrun){
                    if ('justification' in testrun) {
                        TestCaseJustification.add(testCase)
                    }
                }
            }else{
                if ('justification' in testCase.testrun) {
                        TestCaseJustification.add(testCase)
                    }
            }
        }
    }
    console.log(TestCaseJustification)
    TestCaseJustification.forEach(testCase=>{
        let testCasebuff = {}
        
        testCasebuff.id = testCase._attributes.id
        if('testrun' in testCase){
          testCasebuff.testrun = testCase.testrun
          testCasebuff.result = this.getTestCaseResult(testCase)
          if(Array.isArray(testCase.testrun)){
              testCase.testrun.forEach(elt=>{
                  if('justification' in elt){  
                      testCasebuff.justification=elt.justification.text._text
                  }
              })

          }else{
              testCasebuff.result = testCase.testrun.result._text
              testCasebuff.justification = testCase.testrun.justification.text._text
          }
        }
        
         this.testCasesWithJustification.push(testCasebuff)
    })
  }
};
</script>
<style scoped>
  .content{
    padding: 0 15px !important;
  }
  .md-table-cell {
    height: fit-content !important;
    padding: 10px 5px;
    line-height: 5px !important;
  }
  .md-card-header{
    padding: 5px !important;
  }
  .md-title{
    font-size: 0.9em !important;
  }
  
</style>
