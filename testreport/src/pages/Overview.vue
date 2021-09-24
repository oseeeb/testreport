<template>
  <preloader v-if="loading" :message="msg"/>
  <div class="content" v-else>
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
        <md-card :style="'text-align:center;background-color:'+(Result_OverallResult?'#00FF00':'red')" md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">Test Result</div>
            </md-card-header>
            <md-card-content>
              <span style="font-weight:bold;text-color:white;font-size:1.5em;">{{Result_OverallResult?'OK':'FAIL'}}</span>
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
              <p><span style="height:15px" :class="plannedTestCase.length>0?'symbol_ok':'symbol_fail'"> </span> <span>Tests are planned</span></p>
              <p><span style="height:15px" :class="plannedTestCase.length===NrOf_TestCases_Planned_ThisCycle?'symbol_ok':'symbol_fail'"> </span> <span>all planned testcases executed</span></p>
              <p><span style="height:15px" :class="NrOf_TestCases_Planned_ThisCycle===NrOf_TestCases_Planned_ThisCycle_Accepted?'symbol_ok':'symbol_fail'"> </span> <span>all planned and executed testcases accepted</span></p>
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
              <metrics-bar :Todraw="functionalTestCases" :Type="'testcase'" :Name="'Testcase'"></metrics-bar>
              <metrics-bar :Todraw="functionalTestRuns" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title"><router-link to="TestCases"> Test Cases</router-link></div>
          </md-card-header>

          <md-card-content>
              <p><span style="height:15px" :class="$store.state.testCases.length===TestCases_WithResult.length?'symbol_ok':'symbol_fail'"> </span> <span>all testcases executed</span></p>
              <p><span style="height:15px" :class="TestCases_Accepted.length===TestCases_WithResult.length?'symbol_ok':'symbol_fail'"> </span> <span>all executed testcases accepted</span></p>
              <metrics-bar :Todraw="$store.state.testCases" :Type="'testcase'" :Name="'TestCases'"></metrics-bar>
              <metrics-bar :Todraw="$store.state.testRuns" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title"><router-link to="runtime_coverage"> Runtime Coverage</router-link></div>
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
            <div class="md-title"><router-link to="TestConfigurations">Test Configuration</router-link></div>
          </md-card-header>
          <md-card-content> 
            <metrics-bar :Todraw="$store.state.testConfigs" :Type="'testconfig'" :Name="'TestConfigs'"></metrics-bar>
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title"><router-link to="MISRA">MISRA</router-link></div>
          </md-card-header>
          <md-card-content>
            <OutputConfDevInfo :configCount="configurationCount"/>
            <metrics-bar :Todraw="TestRuns_QACSummary" :Type="'testrun'" :Name="'TestRuns'"></metrics-bar>
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title"><router-link to="memory_resources">Memory Resource</router-link></div>
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
            <div class="md-title"><router-link to="code_metrics">CodeMetric</router-link></div>
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
import preloader from '../components/preloader.vue'
export default {
  components:{
    OutputConfDevInfo,
    MetricsBar,
    preloader
  },
  data() {
    return {
      loading:true,
      msg:'loading vue',
      infoReport:[],
      plannedTestCase:[],
      unplannedTestCase:[],
      functionalTestCases:[],
      functionalTestRuns:[],
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
      TestCases_Accepted:[],
      TestCases_ThisCycle:[],
      TestCases_ThisCycle_Passed:[],
      TestCases_ThisCycle_NotPassed_Justified:[],
      NrOf_TestCases_Planned_ThisCycle:0,
      NrOf_TestCases_Accepted:0,
      NrOf_TestCases_Planned_ThisCycle_Accepted:0,
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
      var Result_TestPlanStatus = this.plannedTestCase.length>0?true:false
      var Result_TestPlanCoverage = this.NrOf_TestCases_Planned_ThisCycle===this.plannedTestCase.length?true:false
       var Result_TestPlanTestResult = this.NrOf_TestCases_Planned_ThisCycle===(this.NrOf_TestCases_Planned_ThisCycle_Passed+this.NrOf_TestCases_Planned_ThisCycle_NotPassed_Justified)?true:false
      var Result_ExecutedTestCasesTestResult = this.TestCases_WithResult.length===this.TestCases_Accepted.length?true:false
      return Result_TestPlanStatus&&Result_TestPlanCoverage&&Result_TestPlanTestResult&&Result_ExecutedTestCasesTestResult;
    }
  },
  methods:{
    findTestRun(elt,array){
      elt.forEach(element => {
        if('testrun' in element){
          if(Array.isArray(element.testrun)){
            array.push(...element.testrun)
          }else{
            array.push(element.testrun)
          }
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
      })

      if(this.log_QACMetrics.length!==0){
        this.log_QACMetrics.forEach(log=>{
          if('function' in log){
            if(Array.isArray(log.function)){
              this.fctMetrics.push(...log.function)
            }else{
              this.fctMetrics.push(log.function)
            }
          }
        })
        if('file' in this.log_QACMetrics[0]){
            if(Array.isArray(this.log_QACMetrics[0].file)){
              this.fileMetrics.push(...this.log_QACMetrics[0].file)
            }else{
              this.fileMetrics.push(this.log_QACMetrics[0].file)
            }
          }
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

      if(this.RuntimeCoverages01.length!==0){
        this.RuntimeCoverages01.forEach(runtime=>{
          
          
          if(!('_attributes' in runtime && 'testlevel' in runtime._attributes)&&!(runtime.parameter.includes('OverallCoverage'))){
            if(Array.isArray(runtime.file)){
              runtime.file.forEach(file=>{
                var convInfo = {}
                convInfo.fctCover = file.modFctCovered&&file.modFctCnt?Math.floor(parseInt(file.modFctCovered._text)*100/parseInt(file.modFctCnt._text)):'NaN'
                convInfo.fctCoverUnjust = file.modFctCovered&&file.modFctCnt?Math.floor(parseInt(file.modFctCovered._text)*100/parseInt(file.modFctCnt._text)):'NaN'
                convInfo.decCover = file.modDecCovered&&file.modDecCnt?Math.floor(parseInt(file.modDecCovered._text)*100/parseInt(file.modDecCnt._text)):'NaN'
                convInfo.decCoverUnjust = file.modDecCovered&&file.modDecCnt?Math.floor(parseInt(file.modDecCovered._text)*100/parseInt(file.modDecCnt._text)):'NaN'

                if(convInfo.fctCover){
                  this.covInfoPercent.push(convInfo)
                }
              })
            }else{
              var convInfo = {}
              convInfo.fctCover = runtime.file.modFctCovered&&runtime.file.modFctCnt?Math.floor(parseInt(runtime.file.modFctCovered._text)*100/parseInt(runtime.file.modFctCnt._text)):'NaN'
              convInfo.fctCoverUnjust = runtime.file.modFctCovered&&runtime.file.modFctCnt?Math.floor(parseInt(runtime.file.modFctCovered._text)*100/parseInt(runtime.file.modFctCnt._text)):'NaN'
              convInfo.decCover = runtime.file.modDecCovered&&runtime.file.modDecCnt?Math.floor(parseInt(runtime.file.modDecCovered._text)*100/parseInt(runtime.file.modDecCnt._text)):'NaN'
              convInfo.decCoverUnjust = runtime.file.modDecCovered&&runtime.file.modDecCnt?Math.floor(parseInt(runtime.file.modDecCovered._text)*100/parseInt(runtime.file.modDecCnt._text)):'NaN'

              
              if(convInfo.fctCover){
                this.covInfoPercent.push(convInfo)
              }
            }
              
          }
        })
      }
      if(this.RuntimeCoverages02.length!==0){
        this.RuntimeCoverages02.forEach(runtime=>{
          var convInfo = {}
          if(!('_attributes' in runtime && 'testlevel' in runtime._attributes)&&!(runtime.parameter.includes('OverallCoverage'))){
              convInfo.fctCover = runtime.summary.modFctCoveredJust&&runtime.summary.modFctCnt?Math.floor(parseInt(runtime.summary.modFctCoveredJust._text)*100/parseInt(runtime.summary.modFctCnt._text)):'NaN'
              convInfo.fctCoverUnjust = runtime.summary.modFctCovered&&runtime.summary.modFctCnt?Math.floor(parseInt(runtime.summary.modFctCovered._text)*100/parseInt(runtime.summary.modFctCnt._text)):'NaN'
              convInfo.decCover = runtime.summary.modDecCoveredJust&&runtime.summary.modDecCnt?Math.floor(parseInt(runtime.summary.modDecCoveredJust._text)*100/parseInt(runtime.summary.modDecCnt._text)):'NaN'
              convInfo.decCoverUnjust = runtime.summary.modDecCovered&&runtime.summary.modDecCnt?Math.floor(parseInt(runtime.summary.modDecCovered._text)*100/parseInt(runtime.summary.modDecCnt._text)):'NaN'
              convInfo.stmtCover = runtime.summary.stmtCoveredJust&&runtime.summary.stmtCnt?Math.floor(parseInt(runtime.summary.stmtCoveredJust._text)*100/parseInt(runtime.summary.stmtCnt._text)):'NaN'
              convInfo.stmtCoverUnjust = runtime.summary.stmtCovered&&runtime.summary.stmtCnt?Math.floor(parseInt(runtime.summary.stmtCovered._text)*100/parseInt(runtime.summary.stmtCnt._text)):'NaN'
              convInfo.branchCover = runtime.summary.decisionCoveredJust?Math.floor(parseInt(runtime.summary.decisionCoveredJust._text)*100/parseInt(runtime.summary.decisionCnt._text)):'NaN'
              convInfo.branchCoverUnjust = runtime.summary.decisionCovered?Math.floor(parseInt(runtime.summary.decisionCovered._text)*100/parseInt(runtime.summary.decisionCnt._text)):'NaN'
          }
          if(convInfo.fctCover){
            this.covInfoPercent.push(convInfo)
          }
        })
      }
      // if(this.RuntimeCoverages01.length!==0){
      //   this.RuntimeCoverages01.forEach(runtime=>{
      //     var convInfo = {}
      //     if(runtime.parameter.includes('OverallCoverage')){
      //         convInfo.fctCover = runtime.file.modFctCovered&&runtime.file.modFctCnt?Math.floor(parseInt(runtime.file.modFctCovered._text)*100/parseInt(runtime.file.modFctCnt._text)):'NaN'
      //         convInfo.fctCoverUnjust = runtime.file.modFctCovered&&runtime.file.modFctCnt?Math.floor(parseInt(runtime.file.modFctCovered._text)*100/parseInt(runtime.file.modFctCnt._text)):'NaN'
      //         convInfo.decCover = runtime.file.modDecCovered&&runtime.file.modDecCnt?Math.floor(parseInt(runtime.file.modDecCovered._text)*100/parseInt(runtime.file.modDecCnt._text)):'NaN'
      //         convInfo.decCoverUnjust = runtime.file.modDecCovered&&runtime.file.modDecCnt?Math.floor(parseInt(runtime.file.modDecCovered._text)*100/parseInt(runtime.file.modDecCnt._text)):'NaN'
              
      //     }
      //     if(convInfo.fctCover){
      //       this.covInfoPercentOverall.push(convInfo)
      //     }
      //   })
      // }
      // if(this.RuntimeCoverages02.length!==0){
      //   this.RuntimeCoverages02.forEach(runtime=>{
      //     var convInfo = {}
      //     if(runtime.parameter.includes('OverallCoverage')){
      //         convInfo.fctCover = runtime.summary.modFctCoveredJust&&runtime.summary.modFctCnt?Math.floor(parseInt(runtime.summary.modFctCoveredJust._text)*100/parseInt(runtime.summary.modFctCnt._text)):'NaN'
      //         convInfo.fctCoverUnjust = runtime.summary.modFctCovered&&runtime.summary.modFctCnt?Math.floor(parseInt(runtime.summary.modFctCovered._text)*100/parseInt(runtime.summary.modFctCnt._text)):'NaN'
      //         convInfo.decCover = runtime.summary.modDecCoveredJust&&runtime.summary.modDecCnt?Math.floor(parseInt(runtime.summary.modDecCoveredJust._text)*100/parseInt(runtime.summary.modDecCnt._text)):'NaN'
      //         convInfo.decCoverUnjust = runtime.summary.modDecCovered&&runtime.summary.modDecCnt?Math.floor(parseInt(runtime.summary.modDecCovered._text)*100/parseInt(runtime.summary.modDecCnt._text)):'NaN'
      //         convInfo.stmtCover = runtime.summary.stmtCoveredJust&&runtime.summary.stmtCnt?Math.floor(parseInt(runtime.summary.stmtCoveredJust._text)*100/parseInt(runtime.summary.stmtCnt._text)):'NaN'
      //         convInfo.stmtCoverUnjust = runtime.summary.stmtCovered&&runtime.summary.stmtCnt?Math.floor(parseInt(runtime.summary.stmtCovered._text)*100/parseInt(runtime.summary.stmtCnt._text)):'NaN'
      //         convInfo.branchCover =runtime.summary.decisionCoveredJust?Math.floor(parseInt(runtime.summary.decisionCoveredJust._text)*100/parseInt(runtime.summary.decisionCnt._text)):'NaN'
      //         convInfo.branchCoverUnjust = runtime.summary.decisionCovered?Math.floor(parseInt(runtime.summary.decisionCovered._text)*100/parseInt(runtime.summary.decisionCnt._text)):'NaN'
      //     }
      //     if(convInfo.fctCover){
      //       this.covInfoPercentOverall.push(convInfo)
      //     }
      //   })
      // }
      // if(this.RuntimeCoverages01.length!==0){
      //   this.RuntimeCoverages01.forEach(runtime=>{
      //     var convInfo = {}
      //     if(('_attributes' in runtime && 'testlevel' in runtime._attributes&&runtime._attributes.testlevel==='component')&&!(runtime.parameter.includes('OverallCoverage'))){
      //         convInfo.fctCover =  runtime.file.modFctCovered&&runtime.file.modFctCnt?Math.floor(parseInt(runtime.file.modFctCovered._text)*100/parseInt(runtime.file.modFctCnt._text)):'NaN'
      //         convInfo.decCover =  runtime.file.modDecCovered&&runtime.file.modDecCnt?Math.floor(parseInt(runtime.file.modDecCovered._text)*100/parseInt(runtime.file.modDecCnt._text)):'NaN'
              
      //     }
      //     if(convInfo.fctCover){
      //       this.covInfoPercent.push(convInfo)
      //     }
      //   })
      // }
      // if(this.RuntimeCoverages02.length!==0){
      //   this.RuntimeCoverages02.forEach(runtime=>{
      //     var convInfo = {}
      //     if(('_attributes' in runtime && 'testlevel' in runtime._attributes&&runtime._attributes.testlevel==='component')&&!(runtime.parameter.includes('OverallCoverage'))){
      //         convInfo.fctCover = runtime.summary.modFctCoveredJust&&runtime.summary.modFctCnt?Math.floor(parseInt(runtime.summary.modFctCoveredJust._text)*100/parseInt(runtime.summary.modFctCnt._text)):'NaN'
      //         convInfo.fctCoverUnjust = runtime.summary.modFctCovered&&runtime.summary.modFctCnt?Math.floor(parseInt(runtime.summary.modFctCovered._text)*100/parseInt(runtime.summary.modFctCnt._text)):'NaN'
      //         convInfo.callCover = runtime.summary.callsCoveredJust&&runtime.summary.callsCnt?Math.floor(parseInt(runtime.summary.callsCoveredJust._text)*100/parseInt(runtime.summary.callsCnt._text)):'NaN'
      //         convInfo.callCoverUnjust = runtime.summary.callsCovered&&runtime.summary.callsCnt?Math.floor(parseInt(runtime.summary.callsCovered._text)*100/parseInt(runtime.summary.callsCnt._text)):'NaN'
      //       }
      //     if(convInfo.fctCover){
      //       this.covInfoPercentComponent.push(convInfo)
      //     }
      //   })
      // }
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
      

      return path.reduce((acc,curr)=>{
        return parseInt(acc)+parseInt(curr)
      })
    },
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
                testcase.testrun.forEach(elt=>{
                    result.push(this.getTestRunResult(elt))
                })

                return this.getsimpleResult(result)
            }
        }
    },
    testcaseIsJustified(testcase){
        var testrunsJust = []
        if('testrun' in testcase){
            if(Array.isArray(testcase.testrun)){
                testrunsJust.push(...testcase.testrun.filter(testrun=>{
                    return 'justification' in testrun
                }))
            }else{
                if('justification' in testcase.testrun){
                    testrunsJust.push(testcase.testrun)
                }
            }
        }

        return testrunsJust.length===0?false:true
    }
  },
  mounted(){
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

  this.$store.state.testCases.forEach(element=>{
    if(element._attributes&&element._attributes.ExecPlan==='x'){
      this.plannedTestCase.push(element)
    }else{
      this.unplannedTestCase.push(element)
    }
  })
  
   this.$store.state.testCases.forEach(testcase=>{
     if('testrun' in testcase){
       if(Array.isArray(testcase.testrun)){
         var testrunWithLog = testcase.testrun.filter(testrun=>{
           return 'log' in testrun
         })
          if(testrunWithLog.length!==0){
            this.functionalTestCases.push(testcase)
            this.functionalTestRuns.push(...testrunWithLog)
          }
       }else{
         if('log' in testcase.testrun){
          this.functionalTestCases.push(testcase)
          this.functionalTestRuns.push(testcase.testrun)
         }
       }
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

  this.$store.state.testCases.forEach(testcase=>{
    if('testrun' in testcase){
      if(Array.isArray(testcase.testrun)){
        var testrunWithResult = testcase.testrun.filter(testrun=>{
          if(Array.isArray(testrun.result)){
            return testrun.result.filter(result=>{return '_text' in result && result._text!==''}).length>0
          }else{
            return 'result' in testrun && '_text' in testrun.result
          } 
        }).length

        if(testrunWithResult>0){
          this.TestCases_WithResult.push(testcase)
        }
      }else{
        if(Array.isArray(testcase.testrun.result)){
           if(testcase.testrun.result.filter(result=>{return '_text' in result && result._text!==''}).length>0){
             this.TestCases_WithResult.push(testcase)
           }
          }else{
            if('result' in testcase.testrun && '_text' in testcase.testrun.result){
            this.TestCases_WithResult.push(testcase)
          }
        }
      }
    }
  })

  
  this.TestCases_Accepted = this.TestCases_WithResult.filter(testcase=>{return this.getTestCaseResult(testcase).includes('OK')||this.getTestCaseResult(testcase)==='FAIL*'||this.getTestCaseResult(testcase)==='WARN*'||this.getTestCaseResult(testcase)==='PROCESSERROR*'})
  console.log('this.TestCases_Accepted',this.TestCases_Accepted)

  var test = []
  this.TestCases_WithResult.forEach(testcase=>{
    var testruns = []
    if('testrun' in testcase){
      if(Array.isArray(testcase.testrun)){
        testruns.push(...testcase.testrun.filter(testrun=>{return '_attributes' in testrun && 'execCnt' in testrun._attributes && parseInt(testrun._attributes.execCnt)!==0}))
      }else{
        if('_attributes' in testcase.testrun && 'execCnt' in testcase.testrun._attributes && parseInt(testcase.testrun._attributes.execCnt)!==0){
           testruns.push(testcase.testrun)
        }
      }
    }
    if(testruns.length!==0){
        this.TestCases_ThisCycle.push(testcase)
    }
  })

  this.TestCases_ThisCycle_Passed.push(...this.TestCases_ThisCycle.filter(testcase=>{
    return this.getTestCaseResult(testcase)==='OK'
  }))

  this.TestCases_ThisCycle_NotPassed_Justified.push(...this.TestCases_ThisCycle.filter(testcase=>{
    return !this.getTestCaseResult(testcase).includes('OK')&&this.testcaseIsJustified(testcase)
  }))
  
  this.NrOf_TestCases_Planned_ThisCycle =  this.TestCases_ThisCycle.filter(elemt=>{
    return elemt._attributes.ExecPlan==='x'
  }).length

  this.NrOf_TestCases_Planned_ThisCycle_Passed =  this.TestCases_ThisCycle_Passed.filter(elemt=>{
    return elemt._attributes.ExecPlan==='x'
  }).length

  this.NrOf_TestCases_Planned_ThisCycle_NotPassed_Justified = this.TestCases_ThisCycle_NotPassed_Justified.filter(elemt=>{
    return elemt._attributes.ExecPlan==='x'
  }).length
  
  
  this.NrOf_TestCases_Planned_ThisCycle_Accepted = this.NrOf_TestCases_Planned_ThisCycle_Passed + this.NrOf_TestCases_Planned_ThisCycle_NotPassed_Justified
  console.log('this.NrOf_TestCases_Planned_ThisCycle_NotPassed_Justified',this.NrOf_TestCases_Planned_ThisCycle_NotPassed_Justified)
  console.log('this.NrOf_TestCases_Planned_ThisCycle_Passed',this.NrOf_TestCases_Planned_ThisCycle_Passed)
  console.log('this.NrOf_TestCases_Planned_ThisCycle_Accepted',this.NrOf_TestCases_Planned_ThisCycle_Accepted)
  console.log('this.TestCases_ThisCycle',this.TestCases_ThisCycle.length)
  
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
  console.log('$store.state.testRuns', this.$store.state.testRuns)
  this.$store.state.testRuns.forEach(testrun => {
     if('log_build' in testrun ){
        if('_attributes' in testrun.log_build && 'type' in testrun.log_build._attributes && testrun.log_build._attributes.type==='CheckPClint' ){
          this.TestRuns_PCLint.push(testrun)
        }
        if('_attributes' in testrun.log_build && 'type' in testrun.log_build._attributes && testrun.log_build._attributes.type==='EmbeddedCompiler' && (testrun.testcase_attr.name!=='Build VC8'&&testrun.testcase_attr.name!=='Build VC') ){
          this.TestRuns_BuildEmbeddedCompiler.push(testrun)
        }
        if(('_attributes' in testrun.log_build && 'type' in testrun.log_build._attributes && testrun.log_build._attributes.type==='Visual') || testrun.testcase_attr.name==='Build VC8'|| testrun.testcase_attr.name==='Build VC' ){
          this.TestRuns_BuildVisual.push(testrun)
        }
    }
  })
  
  this.loading = false
  },
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
