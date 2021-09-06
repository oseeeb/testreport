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
                <md-table-cell style="width:33%;">FC</md-table-cell>
                <md-table-cell style="width:33%;">PTH</md-table-cell>
                <md-table-cell style="width:34%;">PTH</md-table-cell>
              </md-table-row><md-table-row >
                <md-table-cell style="width:33%;">SC</md-table-cell>
                <md-table-cell style="width:33%;">PTH</md-table-cell>
                <md-table-cell style="width:34%;">PTH</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:33%;">BC</md-table-cell>
                <md-table-cell style="width:33%;">PTH</md-table-cell>
                <md-table-cell style="width:34%;">PTH</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:33%;">DC</md-table-cell>
                <md-table-cell style="width:33%;">PTH</md-table-cell>
                <md-table-cell style="width:34%;">PTH</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:33%;">CC</md-table-cell>
                <md-table-cell style="width:33%;">PTH</md-table-cell>
                <md-table-cell style="width:34%;">PTH</md-table-cell>
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
                <md-table-cell style="width:50%;">PTH</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:50%;">CYC</md-table-cell>
                <md-table-cell style="width:50%;">PTH</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:50%;">CAL</md-table-cell>
                <md-table-cell style="width:50%;">PTH</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:50%;">PAR</md-table-cell>
                <md-table-cell style="width:50%;">PTH</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:50%;">MIF</md-table-cell>
                <md-table-cell style="width:50%;">PTH</md-table-cell>
              </md-table-row>
              <md-table-row >
                <md-table-cell style="width:50%;">LOC</md-table-cell>
                <md-table-cell style="width:50%;">PTH</md-table-cell>
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
      NrOf_TestCases_Planned_ThisCycle_NotPassed_Justified:0
    };
  },
  computed:{
    Result_OverallResult(){
      var Result_TestPlanStatus = this.plannedTestRun.lenght !== 0
      var Result_TestPlanCoverage = this.NrOf_TestCases_Planned_ThisCycle===this.plannedTestCase.length
      var Result_TestPlanTestResult = this.NrOf_TestCases_Planned_ThisCycle===(this.NrOf_TestCases_Planned_ThisCycle_Passed+this.NrOf_TestCases_Planned_ThisCycle_NotPassed_Justified)
      
      console.log('NrOf_TestCases_Planned_ThisCycle',this.NrOf_TestCases_Planned_ThisCycle)
      console.log('plannedTestCase',this.plannedTestCase.length)
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

  console.log('test with result',this.TestCases_WithResult)

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

  console.log('testRuns_QACSummary', this.TestRuns_QACSummary)
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
