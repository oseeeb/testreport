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
                <md-table-cell data-toggle="tooltip" :title="getmetricsTestrun(item)" :style="'text-align:center;background-color:'+(item.result==='OK'?'#00FF00;':(item.result==='WARN'?'yellow;':(item.result==='FAIL'?'red':'')))">{{item.result}}</md-table-cell>
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
        },
    getmetricsTestrun(testcase){
      if(Array.isArray(testcase.testrun)){
         var result = {
            text:'',
            fail:0,
            warn:0,
            ok:0,
          }
          var metrics={}
          var testRuns = testcase.testrun
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
              return this.getTestRunResult(testrun)==='WARN'
          }).length

          metrics.Fail = testRunsTested.filter(testrun=>{
              return this.getTestRunResult(testrun)==='FAIL'
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

          
          result.ok = metrics.Passed*100/metrics.Total

          result.fail = metrics.Fail*100/metrics.Total

          result.text = metrics.Tested+'/'+metrics.Total+' tested\n'
          result.text += metrics.Passed+' passed\n'
          result.text += metrics.Ok+'*ok \n'
          result.text += metrics.NA!==0?metrics.NA+'*N/A \n':''
          result.text += metrics.Warn!==0?metrics.Warn+'*warn \n':''
          result.text += metrics.Fail!==0?metrics.Fail+'*fail \n':''
          return result.text
      }else{
        return ''
      }
    }
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
          console.log(this.getTestCaseResult(testCase))
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
  
    console.log(this.testCasesWithJustification)
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
