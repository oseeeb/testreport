<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-75 md-large-size-75 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
        <md-table v-model="infoReport" md-card>
          <md-table-toolbar>
            <h1 class="md-title">General Informations</h1>
          </md-table-toolbar>
          <md-table-row v-for="item in infoReport" :key="item.id">
            <md-table-cell style="width:25%;">{{ item.elemt }}</md-table-cell>
            <md-table-cell>{{ item.value }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>  
      <div class="md-layout-item md-xlarge-size-25  md-large-size-25 md-medium-size-25 md-small-size-50 md-xsmall-size-100">
        <md-card :class="Result_OverallResult?'md-primary':'md-accent'" :md-theme="Result_OverallResult?'sucess-card':''" md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">Test Result</div>
            </md-card-header>
            <md-card-content>
              <span style="">{{Result_OverallResult?'OK':'FAIL'}}</span>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>  
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">Test Plan</div>
          </md-card-header>
          <md-card-content>
              <metrics-bar :Todraw="plannedTestCase" :Type="'testcase'" :Name="'Testcase'"></metrics-bar>
              <metrics-bar :Todraw="plannedTestRun" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
              <metrics-bar :Todraw="unplannedTestCase" :Type="'testcase'" :Name="'Unplanned TestCase'"></metrics-bar>
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-header>
            <div class="md-title">Functional TestCases</div>
          </md-card-header>
          <md-card-content>
              <metrics-bar :Todraw="plannedTestCase" :Type="'testcase'" :Name="'Testcase'"></metrics-bar>
              <metrics-bar :Todraw="plannedTestRun" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">Test Cases</div>
          </md-card-header>

          <md-card-content>
              <metrics-bar :Todraw="$store.state.testCases" :Type="'testcase'" :Name="'TestCases'"></metrics-bar>
              <metrics-bar :Todraw="$store.state.testRuns" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">RunTime Coverage</div>
          </md-card-header>
          <md-card-content>
            <span class="symbol_ok"></span> <span>Runtime Coverage (Component Test)</span><br/>
            <span class="symbol_ok"></span> <span>Runtime Coverage (Unit Test)</span><br/>
            <md-table>
              <md-table-row >
                <md-table-head style="width:33%;">Name</md-table-head>
                <md-table-head style="width:33%;">Value</md-table-head>
                <md-table-head style="width:34%;">MeasuredValue</md-table-head>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:33%;">FC</md-table-cell>
                <md-table-cell style="width:33%;">{{GetMinMaxInfo(covInfoPercent,'fctCover')}}</md-table-cell>
                <md-table-cell style="width:34%;">{{GetMinMaxInfo(covInfoPercent,'fctCoverUnjust')}}</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:33%;">SC</md-table-cell>
                <md-table-cell style="width:33%;">{{GetMinMaxInfo(covInfoPercent,'stmtCover')}}</md-table-cell>
                <md-table-cell style="width:34%;">{{GetMinMaxInfo(covInfoPercent,'stmtCoverUnjust')}}</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:33%;">BC</md-table-cell>
                <md-table-cell style="width:33%;">{{GetMinMaxInfo(covInfoPercent,'branchCover')}}</md-table-cell>
                <md-table-cell style="width:34%;">{{GetMinMaxInfo(covInfoPercent,'branchCoverUnjust')}}</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:33%;">DC</md-table-cell>
                <md-table-cell style="width:33%;">{{GetMinMaxInfo(covInfoPercent,'decCover')}}</md-table-cell>
                <md-table-cell style="width:34%;">{{GetMinMaxInfo(covInfoPercent,'decCoverUnjust')}}</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:33%;">CC</md-table-cell>
                <md-table-cell style="width:33%;">{{GetMinMaxInfo(covInfoPercent,'callCover')}}</md-table-cell>
                <md-table-cell style="width:34%;">{{GetMinMaxInfo(covInfoPercent,'callCoverUnjust')}}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">Preprocessor Coverage</div>
          </md-card-header>
          <md-card-content>
            <metrics-bar :Todraw="TestRuns_PPCoverage" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">Test Configuration</div>
          </md-card-header>
          <md-card-content>
            <span>{{$store.state.testConfigs.length}} TestConfigs</span> 
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">MISRA</div>
          </md-card-header>
          <md-card-content>
            <OutputConfDevInfo :configCount="configurationCount"/>
            <metrics-bar :Todraw="TestRuns_QACSummary" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">Memory Resource</div>
          </md-card-header>

          <md-card-content>
            <metrics-bar :Todraw="TestRuns_MemoryResources" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">PCLint</div>
          </md-card-header>

          <md-card-content>
            <metrics-bar :Todraw="TestRuns_PCLint" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">BuildEmbenddedCompiler</div>
          </md-card-header>

          <md-card-content>
            <metrics-bar :Todraw="TestRuns_BuildEmbeddedCompiler" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">BuildVisuel</div>
          </md-card-header>

          <md-card-content>
            <metrics-bar :Todraw="TestRuns_BuildVisual" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">Test Level</div>
          </md-card-header>
          <md-card-content>
          </md-card-content>
        </md-card> 
        <md-card>
          <md-card-header>
            <div class="md-title">CodeMetric</div>
          </md-card-header>
          <md-card-content>
            <metrics-bar :Todraw="TestRuns_QACSummary" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
           <md-table>
              <md-table-row >
                <md-table-cell style="width:50%;">PTH</md-table-cell>
                <md-table-cell style="width:50%;">{{GetMinMaxInfo(fctMetrics,'PTH')}}</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:50%;">CYC</md-table-cell>
                <md-table-cell style="width:50%;">{{GetMinMaxInfo(fctMetrics,'CYC')}}</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:50%;">CAL</md-table-cell>
                <md-table-cell style="width:50%;">{{GetMinMaxInfo(fctMetrics,'CAL')}}</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:50%;">PAR</md-table-cell>
                <md-table-cell style="width:50%;">{{GetMinMaxInfo(fctMetrics,'PAR')}}</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:50%;">MIF</md-table-cell>
                <md-table-cell style="width:50%;">{{GetMinMaxInfo(fctMetrics,'MIF')}}</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:50%;">LOC</md-table-cell>
                <md-table-cell style="width:50%;">{{GetSumInfo(fileMetrics,'TPP')}}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>

      </div> 
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import MetricsBar from '../components/templates/metricsBar.vue';
import OutputConfDevInfo from '../components/templates/outputConfigDeviationInfo.vue'
export default {
  components:{
    OutputConfDevInfo,
    MetricsBar,
  },
  data() {
    return {
      infoReport:[],
      plannedTestCase:[],
      unplannedTestCase:[],
      plannedTestRun:[],
      unplannedTestRun:[],
      testConfigs:[...this.$store.state.testConfigs],
      TestRuns_QACSummary:[],
      TestRuns_MemoryResources:[],
      configurationCount:0,
      TestRuns_PCLint:[],
      TestRuns_BuildEmbeddedCompiler:[],
      TestRuns_BuildVisual:[],
      TestRuns_PPCoverage:[],
      TestCases_WithResult:[],
      TestCases_ThisCycle:[],
      TestCases_ThisCycle_Passed:[],
      TestCases_ThisCycle_NotPassed_Justified:[],
      NrOf_TestCases_Planned_ThisCycle:0,
      NrOf_TestCases_Planned_ThisCycle_Passed:0,
      NrOf_TestCases_Planned_ThisCycle_NotPassed_Justified:0,
      RuntimeCoverages01:[],
      RuntimeCoverages02:[],
      covInfoPercent:[],
      covInfoPercentOverall:[],
      covInfoPercentComponent:[],
      log_QACMetrics:[],
      log_BauhausMetrics:[],
      fileMetrics:[],
      fctMetrics:[],
      classMetrics:[],
    };
  },
  computed:{
    Result_OverallResult(){
      var Result_TestPlanStatus = this.plannedTestRun.lenght !== 0
      var Result_TestPlanCoverage = this.NrOf_TestCases_Planned_ThisCycle===this.plannedTestCase.length
      var Result_TestPlanTestResult = this.NrOf_TestCases_Planned_ThisCycle===(this.NrOf_TestCases_Planned_ThisCycle_Passed+this.NrOf_TestCases_Planned_ThisCycle_NotPassed_Justified)
      return Result_TestPlanStatus&&Result_TestPlanCoverage&&Result_TestPlanTestResult;
    }
  },
  methods:{
    findTestRun(elt,array){
      elt.forEach(element => {
        if(element['testrun']){
          var testrun = Object.values(element.testrun);
          array.push(...testrun)
        }else if(Array.isArray(element)){
          array.push(...element)
        }
      });  
    },
    retrieveCoverage(testruns){
      testruns.forEach(testrun=>{
        if('log_FunctionCoverage' in testrun){
          if(Array.isArray(testrun.log_FunctionCoverage)){
            
            this.RuntimeCoverages01.push(...testrun.log_FunctionCoverage.map(log=>{
              var obj = {}
              obj = log
              obj.parameter = testrun._attributes.parameter
              return obj
            }))
          }
          else{
            var obj = {}
              obj = testrun.log_FunctionCoverage
              obj.parameter = testrun._attributes.parameter
            this.RuntimeCoverages01.push(obj)
          }
        }
        if('log_QACMetrics' in testrun){
           if(Array.isArray(testrun.log_QACMetrics)){
            
            this.log_QACMetrics.push(...testrun.log_QACMetrics.map(log=>{
              var obj = {}
              obj = log
              obj.parameter = testrun._attributes.parameter
              return obj
            }))
          }
          else{
            var obj = {}
              obj = testrun.log_QACMetrics
              obj.parameter = testrun._attributes.parameter
            this.log_QACMetrics.push(obj)
          }
        }
        if('log_BauhausMetrics' in testrun){
           if(Array.isArray(testrun.log_BauhausMetrics)){
            
            this.log_BauhausMetrics.push(...testrun.log_BauhausMetrics.map(log=>{
              var obj = {}
              obj = log
              obj.parameter = testrun._attributes.parameter
              return obj
            }))
          }
          else{
            var obj = {}
              obj = testrun.log_BauhausMetrics
              obj.parameter = testrun._attributes.parameter
            this.log_BauhausMetrics.push(obj)
          }
        }

        if(this.log_QACMetrics.length!==0){
          this.log_QACMetrics.forEach(log=>{
            if('function' in log){
              if(Array.isArray(log.function)){
                this.fctMetrics.push(...log.function)
              }else{
                this.fctMetrics.push(log.function)
              }
            }
            if('file' in log){
              if(Array.isArray(log.file)){
                this.fileMetrics.push(...log.file)
              }else{
                this.fileMetrics.push(log.file)
              }
            }
          })
        }else{
          this.log_BauhausMetrics.forEach(log=>{
            if('file' in log){
              if(Array.isArray(log.file)){
                log.file.forEach(file=>{
                  if('class' in file ){
                    if(Array.isArray(file.class)){
                      this.classMetrics.push(...file.class)
                    }else{
                      this.classMetrics.push(file.class)
                    }
                  }
                })
              }else{
                if('class' in log.file ){
                    if(Array.isArray(log.file.class)){
                      this.classMetrics.push(...log.file.class)
                    }else{
                      this.classMetrics.push(log.file.class)
                    }
                  }
              }
            }
          })
        }
        
        if('log_RuntimeCoverage' in testrun){
                  if(Array.isArray(testrun.log_RuntimeCoverage)){
                    
                    this.RuntimeCoverages02.push(...testrun.log_RuntimeCoverage.map(log=>{
                      var obj = {}
                      obj = log
                      obj.parameter = testrun._attributes.parameter
                      return obj
                    }))
                  }
                  else{
                    var obj = {}
                      obj = testrun.log_RuntimeCoverage
                      obj.parameter = testrun._attributes.parameter
                    this.RuntimeCoverages02.push(obj)
                  }
          }


        if(this.RuntimeCoverages01.length!==0){
          this.RuntimeCoverages01.forEach(runtime=>{
            var convInfo = {}
            if(!('testlevel' in runtime._attributes)&&!(runtime.parameter.includes('OverallCoverage'))){
               convInfo.fctCover = Math.floor(parseInt(runtime.file.modFctCovered._text)*100/parseInt(runtime.file.modFctCnt._text))
               convInfo.fctCoverUnjust = Math.floor(parseInt(runtime.file.modFctCovered._text)*100/parseInt(runtime.file.modFctCnt._text))
               convInfo.decCover = Math.floor(parseInt(runtime.file.modDecCovered._text)*100/parseInt(runtime.file.modDecCnt._text))
               convInfo.decCoverUnjust = Math.floor(parseInt(runtime.file.modDecCovered._text)*100/parseInt(runtime.file.modDecCnt._text))
               
            }
            if(convInfo.fctCover){
              this.covInfoPercent.push(convInfo)
            }
          })
        }
        if(this.RuntimeCoverages02.length!==0){
          this.RuntimeCoverages02.forEach(runtime=>{
            var convInfo = {}
            if(!('testlevel' in runtime._attributes)&&!(runtime.parameter.includes('OverallCoverage'))){
               convInfo.fctCover = Math.floor(parseInt(runtime.summary.modFctCoveredJust._text)*100/parseInt(runtime.summary.modFctCnt._text))
               convInfo.fctCoverUnjust = Math.floor(parseInt(runtime.summary.modFctCovered._text)*100/parseInt(runtime.summary.modFctCnt._text))
               convInfo.decCover = Math.floor(parseInt(runtime.summary.modDecCoveredJust._text)*100/parseInt(runtime.summary.modDecCnt._text))
               convInfo.decCoverUnjust = Math.floor(parseInt(runtime.summary.modDecCovered._text)*100/parseInt(runtime.summary.modDecCnt._text))
               convInfo.stmtCover = Math.floor(parseInt(runtime.summary.stmtCoveredJust._text)*100/parseInt(runtime.summary.stmtCnt._text))
               convInfo.stmtCoverUnjust = Math.floor(parseInt(runtime.summary.stmtCovered._text)*100/parseInt(runtime.summary.stmtCnt._text))
               convInfo.branchCover = runtime.summary.decisionCoveredJust?Math.floor(parseInt(runtime.summary.decisionCoveredJust._text)*100/parseInt(runtime.summary.decisionCnt._text)):'NaN'
               convInfo.branchCoverUnjust = runtime.summary.decisionCovered?Math.floor(parseInt(runtime.summary.decisionCovered._text)*100/parseInt(runtime.summary.decisionCnt._text)):'NaN'
            }
            if(convInfo.fctCover){
              this.covInfoPercent.push(convInfo)
            }
          })
        }
        if(this.RuntimeCoverages01.length!==0){
          this.RuntimeCoverages01.forEach(runtime=>{
            var convInfo = {}
            if(runtime.parameter.includes('OverallCoverage')){
               convInfo.fctCover = Math.floor(parseInt(runtime.file.modFctCovered._text)*100/parseInt(runtime.file.modFctCnt._text))
               convInfo.fctCoverUnjust = Math.floor(parseInt(runtime.file.modFctCovered._text)*100/parseInt(runtime.file.modFctCnt._text))
               convInfo.decCover = Math.floor(parseInt(runtime.file.modDecCovered._text)*100/parseInt(runtime.file.modDecCnt._text))
               convInfo.decCoverUnjust = Math.floor(parseInt(runtime.file.modDecCovered._text)*100/parseInt(runtime.file.modDecCnt._text))
               
            }
            if(convInfo.fctCover){
              this.covInfoPercentOverall.push(convInfo)
            }
          })
        }
        if(this.RuntimeCoverages02.length!==0){
          this.RuntimeCoverages02.forEach(runtime=>{
            var convInfo = {}
            if(runtime.parameter.includes('OverallCoverage')){
               convInfo.fctCover = Math.floor(parseInt(runtime.summary.modFctCoveredJust._text)*100/parseInt(runtime.summary.modFctCnt._text))
               convInfo.fctCoverUnjust = Math.floor(parseInt(runtime.summary.modFctCovered._text)*100/parseInt(runtime.summary.modFctCnt._text))
               convInfo.decCover = Math.floor(parseInt(runtime.summary.modDecCoveredJust._text)*100/parseInt(runtime.summary.modDecCnt._text))
               convInfo.decCoverUnjust = Math.floor(parseInt(runtime.summary.modDecCovered._text)*100/parseInt(runtime.summary.modDecCnt._text))
               convInfo.stmtCover = Math.floor(parseInt(runtime.summary.stmtCoveredJust._text)*100/parseInt(runtime.summary.stmtCnt._text))
               convInfo.stmtCoverUnjust = Math.floor(parseInt(runtime.summary.stmtCovered._text)*100/parseInt(runtime.summary.stmtCnt._text))
               convInfo.branchCover = runtime.summary.decisionCoveredJust?Math.floor(parseInt(runtime.summary.decisionCoveredJust._text)*100/parseInt(runtime.summary.decisionCnt._text)):'NaN'
               convInfo.branchCoverUnjust = runtime.summary.decisionCovered?Math.floor(parseInt(runtime.summary.decisionCovered._text)*100/parseInt(runtime.summary.decisionCnt._text)):'NaN'
            }
            if(convInfo.fctCover){
              this.covInfoPercentOverall.push(convInfo)
            }
          })
        }
        if(this.RuntimeCoverages01.length!==0){
          this.RuntimeCoverages01.forEach(runtime=>{
            var convInfo = {}
            if(('testlevel' in runtime._attributes&&runtime._attributes.testlevel==='component')&&!(runtime.parameter.includes('OverallCoverage'))){
               convInfo.fctCover = Math.floor(parseInt(runtime.file.modFctCovered._text)*100/parseInt(runtime.file.modFctCnt._text))
               convInfo.decCover = Math.floor(parseInt(runtime.file.modDecCovered._text)*100/parseInt(runtime.file.modDecCnt._text))
               
            }
            if(convInfo.fctCover){
              this.covInfoPercent.push(convInfo)
            }
          })
        }
        if(this.RuntimeCoverages02.length!==0){
          this.RuntimeCoverages02.forEach(runtime=>{
            var convInfo = {}
            if(('testlevel' in runtime._attributes&&runtime._attributes.testlevel==='component')&&!(runtime.parameter.includes('OverallCoverage'))){
               convInfo.fctCover = Math.floor(parseInt(runtime.summary.modFctCoveredJust._text)*100/parseInt(runtime.summary.modFctCnt._text))
               convInfo.fctCoverUnjust = Math.floor(parseInt(runtime.summary.modFctCovered._text)*100/parseInt(runtime.summary.modFctCnt._text))
               convInfo.callCover = Math.floor(parseInt(runtime.summary.callsCoveredJust._text)*100/parseInt(runtime.summary.callsCnt._text))
               convInfo.callCoverUnjust = Math.floor(parseInt(runtime.summary.callsCovered._text)*100/parseInt(runtime.summary.callsCnt._text)) 
             }
            if(convInfo.fctCover){
              this.covInfoPercentComponent.push(convInfo)
            }
          })
        }

      })
    },
    filters(bigdata,criteria){
          var datas = []
          if(Array.isArray(bigdata)){
            bigdata.forEach(elt=>{
                if((criteria in elt)&&elt[criteria]!=='NaN'){
                    if(typeof elt[criteria]==='object'&&'_text' in elt[criteria]){
                      datas.push(elt[criteria]._text)
                    }
                    else{
                      datas.push(elt[criteria])
                    }
                }
            })
          }
          
      
          return datas
    },
    GetMinMaxInfo(datas,criteria){
      var path = this.filters(datas,criteria)
      var result = {
          min:0,
          max:0,
      }
      path.map(elt=>{
          return parseFloat(elt)
      })

      path.sort((a,b)=>{return a-b})

      result.min = path[0]
      result.max = path[path.length-1]
      var display = ''
      if(result.min+''==='NaN'||result.min===undefined){
        display='NaN'
      }
      else if(result.min===result.max){
        display = result.min+''
      }else{
        display = result.min+'...'+result.max
      }
      return display
      
    },
    GetSumInfo(datas,criteria){
      var path = this.filters(datas,criteria)
      
      console.log('criteria',path)
      return path.reduce((acc,curr)=>{
        return parseInt(acc)+parseInt(curr)
      })
    }
  },
  beforeMount(){
  var testrunwithInfo = []
  this.$store.state.testRuns.forEach(element => {
    if(element._attributes&&element._attributes.executor){
      testrunwithInfo.push(element);
    }
  })
  this.infoReport=[
    {
      id:0,
      elemt:'Scope',
      value:this.$store.state.testdata.testplan._attributes.name
    },
    {
      id:1,
      elemt:'Test Person',
      value:testrunwithInfo[1]._attributes.executor
    },
    {
      id:2,
      elemt:'Test Date',
      value:testrunwithInfo[1]._attributes.date
    },
    {
      id:3,
      elemt:'Rationale',
      value:'This is a customer overview documentation.'
    },
    {
      id:4,
      elemt:'Links',
      value:''
    },
  ]

  
  this.retrieveCoverage(this.$store.state.testRuns)
  console.log('log_BauhausMetrics',this.log_BauhausMetrics)
    console.log('log_QACMetrics',this.log_QACMetrics)

  this.$store.state.testCases.forEach(element=>{
    if(element._attributes&&element._attributes.ExecPlan==='x'){
      this.plannedTestCase.push(element)
    }else{
      this.unplannedTestCase.push(element)
    }
  })

  this.findTestRun(this.plannedTestCase,this.plannedTestRun)
  this.findTestRun(this.unplannedTestCase,this.unplannedTestRun)
  
  this.$store.state.testRuns.forEach(element => {
    if(element['log_QACSummary']){
      this.TestRuns_QACSummary.push(element);
    }
  })
  
  this.$store.state.testRuns.forEach(element => {
    if(element['log_MemoryResources']){
      this.TestRuns_MemoryResources.push(element);
    }
  })

  this.$store.state.testRuns.forEach(element => {
    if(element['varCoverage']){
      this.TestRuns_PPCoverage.push(element);
    }
  })

  this.$store.state.testCases.forEach(elemt=>{
    var testruns = []
    if(elemt['testrun']){
      testruns.push(...Object.values(elemt.testrun))
      testruns=testruns.filter(elt=>{
        return elt.result!==undefined
      })
      if(testruns.lenght!==0){
        this.TestCases_WithResult.push(elemt)
      }
    }
  })

  
  this.TestCases_WithResult.forEach(elemt=>{
    var testruns = []
    if(Array.isArray(elemt['testrun'])){
      testruns.push(...elemt.testrun)
      testruns=testruns.filter(elt=>{
        return elt._attributes.execCnt!==0
      })
      if(testruns.lenght!==0){
        this.TestCases_ThisCycle.push(elemt)
      }
    }
  })

   this.TestCases_ThisCycle.forEach(elemt=>{
    var testruns = []
    if(elemt['testrun']){
      testruns.push(...Object.values(elemt.testrun))
      testruns=testruns.filter(elt=>{
        if('result' in elt){
          return elt.result._text!=='ok'&&elt.result._text!=='N/A'
        }
      })
      if(testruns.lenght===0){
        this.TestCases_ThisCycle_Passed.push(elemt)
      }
    }
  })

  this.TestCases_ThisCycle.forEach(elemnt=>{
    var testruns = []
    if(elemnt['testrun']){
      testruns.push(...Object.values(elemnt.testrun))
      testruns=testruns.filter(elt=>{
        if('result' in elt){
          return (elt.result._text!=='ok'&&elt.result._text!=='N/A')&&(elt.justification&&elt.justification.length!==0)
        }
      })
      if(testruns.lenght!==0){
        this.TestCases_ThisCycle_NotPassed_Justified.push(elemnt)
      }
    }
  })

  this.NrOf_TestCases_Planned_ThisCycle =  this.TestCases_ThisCycle.filter(elemt=>{
    return elemt._attributes.ExecPlan==='x'
  }).length

  this.NrOf_TestCases_Planned_ThisCycle_Passed =  this.TestCases_ThisCycle_Passed.filter(elemt=>{
    return elemt._attributes.ExecPlan==='x'
  }).length

  this.NrOf_TestCases_Planned_ThisCycle_NotPassed_Justified = this.TestCases_ThisCycle_NotPassed_Justified.filter(elemt=>{
    return elemt._attributes.ExecPlan==='x'
  }).length

  // console.log('This cycle tes',this.TestRuns_QACSummary)
  var test = []
  this.TestRuns_QACSummary.forEach(elt=>{
    if(elt.log_build.message&&Array.isArray(elt.log_build.message)){
      var msg = elt.log_build.message.filter(elt=>{
        if('result' in elt){
          return elt.result._text!=='info'
        }
      })
      if(msg.length!==0){
        test.push(elt)
      }
    }
  })

  this.configurationCount = test.length

  this.$store.state.testRuns.forEach(element => {
    if(element['log_build']&&element['log_build']._type==='CheckPClint'){
      this.TestRuns_PCLint.push(element);
    }
  })
  
  this.$store.state.testRuns.forEach(element => {
    if(element['log_build']&&element['log_build']._type==='EmbeddedCompiler'&&element['testcase_attr'].name==='Build VC8'&&element['testcase_attr'].name==='Build VC'){
      this.TestRuns_BuildEmbeddedCompiler.push(element);
    }
  })

  this.$store.state.testRuns.forEach(element => {
    if(element['log_build']&&element['log_build']._type==='Visual'&&element['testcase_attr'].name==='Build VC8'&&element['testcase_attr'].name==='Build VC'){
      this.TestRuns_BuildVisual.push(element);
    }
  })

  }
};
</script>
<style scoped>
  .content{
    padding: 0 15px !important;
  }
  .md-table-cell {
    height: 25px !important;
    line-height: 5px !important;
  }
  .md-card-header{
    padding: 5px !important;
  }
  .md-title{
    font-size: 0.9em !important;
  }
</style>
