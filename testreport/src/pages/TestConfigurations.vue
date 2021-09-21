<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
       <md-table md-card>
           <md-table-toolbar>
               <h2>TestConfiguration </h2>
           </md-table-toolbar>
            <md-table-row class="tLegend">
                <md-table-head>TestConfig</md-table-head>
                <md-table-head>SafetyLevel</md-table-head>
                <md-table-head>Functional</md-table-head>
                <md-table-head>MISRA</md-table-head>
                <md-table-head>Coverage(C/DC)</md-table-head>
                <md-table-head>Result</md-table-head>
            </md-table-row>
            <template v-for="(path,key) in paths">
                <md-table-row colspan="7" :key="key">
                    {{path===''?'-':path}}
                </md-table-row>
                <md-table-row v-for="(config,kex) in filteredConfigs(path)" :key="(kex+testconfigs.length)">   
                  <md-table-cell>{{config.configName}}</md-table-cell> 
                  <md-table-cell>{{getquality(config.name)}}</md-table-cell>  
                  <md-table-cell>
                    <metrics-bar v-if="config.Functional.NrOfTestCases>0" :label="false" :Todraw="getlogbytestconfig(config.name).test_fonctional" :Type="'testrun'" :Name="'Testruns'"></metrics-bar>
                    <!-- <template v-if="config.Functional.NrOfTestCases>0">
                      <md-table>
                        <md-table-row>
                            <md-table-cell>
                              <span style="height:15px" :class="config.Functional.status==='OK'?'symbol_ok':'symbol_fail'"> </span>
                            </md-table-cell>
                            <md-table-cell>
                              <div style="height:15px;width:75px">
                                <metrics-bar :label="false" :Todraw="getlogbytestconfig(config.name).test_fonctional" :Type="'testrun'" :Name="'Testruns'"></metrics-bar>
                              </div>
                            </md-table-cell>
                        </md-table-row>
                      </md-table>
                    </template> -->
                  </md-table-cell> 
                  <md-table-cell>
                      <metrics-bar v-if="getlogbytestconfig(config.name).test_MISRA.length>0" :label="false" :Todraw="getlogbytestconfig(config.name).test_MISRA" :Type="'testrun'" :Name="'Testruns'"></metrics-bar>
                      <!-- <md-table>
                        <md-table-row>
                            <md-table-cell>
                              <span style="height:15px" :class="config.Misra.status==='OK'?'symbol_ok':'symbol_fail'"> </span>
                            </md-table-cell>
                            <md-table-cell>
                              {{config.Misra.NrOfDeviatedRules}}
                            </md-table-cell>
                        </md-table-row>
                      </md-table> -->
                  </md-table-cell> 
                  <md-table-cell>
                    <span v-if="getlogbytestconfig(config.name).test_Coverage.length===0">N/A</span>
                    <show-coverage-data v-else-if="getlogbytestconfig(config.name).test_Coverage.length===1" :coverage="getDataCoverage(config.name)[1]"></show-coverage-data>
                    <show-coverage-data v-else :coverage="getDataCoverage(config.name).DC"></show-coverage-data>
                  </md-table-cell>     
                  <md-table-cell data-toggle="tooltip" :title="getTestRunMetrics(config.testruns)" :style="'background-color:'+(getResultbytesruns(config.testruns)==='FAIL*'||getResultbytesruns(config.testruns)==='WARN*'||getResultbytesruns(config.testruns)==='PROCESSERROR*'?'green':(getResultbytesruns(config.testruns)==='FAIL'?'red;':(getResultbytesruns(config.testruns)==='WARN'?'yellow':'#00FF00;')))">{{getResultbytesruns(config.testruns)}}</md-table-cell>           
                </md-table-row>
            </template>

       </md-table>
      </div> 
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ShowCoverageData from '../components/templates/ShowCoverageData.vue'
import MetricsBar from '../components/templates/metricsBar.vue';
export default {
  components:{
    MetricsBar,
    ShowCoverageData
  },
  data() {
    return {
      testconfigs:[],
      paths:[],
    }
  },
  methods:{
    filteredConfigs(path){
      var filtered =  this.testconfigs.filter(config=>{
        if(path!==''){
          return config.name.includes(path)
        }else{
          return config.name.toLowerCase().includes('overall')
        }
      })

      console.log('configs path',path)

      return filtered
    },
    getquality(config){
      var testRunsRuntime = []
      this.$store.state.testRuns.forEach(testrun=>{
          if(('config' in testrun._attributes)&&(testrun._attributes.config.includes(config))){
            testRunsRuntime.push(testrun)
          }
          else if(('parameter' in testrun._attributes)&&(testrun._attributes.parameter.includes(config))){
            testRunsRuntime.push(testrun)
          }
      })

      if(testRunsRuntime.length!==0){
        if('parameter' in testRunsRuntime[0]._attributes){
          var quality = testRunsRuntime[0]._attributes.parameter.match(new RegExp("quality=(.*),"))
          if((quality==='')||(quality==='OverallCoverage')||(quality===null)){
            return 'QM'
          }
          else if(quality.toLowerCase()==='qm'){
            return 'QM'
          }
          else if(quality.toLowerCase()==='safe'){
            return 'SAFE'
          }
          else{
            return quality
          }

        }
        else{
          return 'no parameter in attributes'
        }
      }
      else{
        return 'no config corresponding'
      }
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
    getlogbytestconfig(config){
      var testRunslog = []
      var testRundlog_QAC = []
      var testRundlog_Runtime = []
      this.$store.state.testRuns.forEach(testrun=>{
          if(('config' in testrun._attributes)&&(testrun._attributes.config.includes(config))){
            if('log' in testrun){
              testRunslog.push(testrun)
            }
            if('log_QACSummary' in testrun){
              testRundlog_QAC.push(testrun)
            }
            if('log_RuntimeCoverage' in testrun){
              testRundlog_Runtime.push(testrun)
            }
          }
          else if(('parameter' in testrun._attributes)&&(testrun._attributes.parameter.includes(config))){
            if('log' in testrun){
              testRunslog.push(testrun)
            }
            if('log_QACSummary' in testrun){
              testRundlog_QAC.push(testrun)
            }
            if('log_RuntimeCoverage' in testrun){
              testRundlog_Runtime.push(testrun)
            }
          }
      })
      return {
        test_fonctional:testRunslog,
        test_MISRA:testRundlog_QAC,
        test_Coverage:testRundlog_Runtime
      }
    },
    getsimpleResult(result){
      if(result.includes('FAIL*')){
          return 'FAIL*'
      }
      else if(result.includes('FAIL')){
          return 'FAIL'
      }
      else if(result.includes('WARN*')){
          return 'WARN*'
      }
      else if(result.includes('WARN')){
          return 'WARN'
      }
      else if(result.includes('processError')){
          return 'PROCESSERROR'
      }
      else if(result.includes('OK.N/A')){
          return 'OK'
      }
      else if(result.includes('OK')){
          return 'OK'
      }
    },
    getResult(result,isJustified){
        if(result.includes('fail')){
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
    getResultbytesruns(testruns){
      if(testruns.length>0){
         var result = []
          testruns.forEach(testrun=>{
          result.push(this.getTestRunResult(testrun))
          })
          return this.getsimpleResult(result)
      }else{
        return ''
      }
    },
    getResultConfig(testcase,config){
      if('testrun' in testcase){
        if(Array.isArray(testcase.testrun)){
          
          var testruns = testcase.testrun.filter(elt=>{
            if('config' in elt._attributes){
              return elt._attributes.config.includes(config.name)
            }
            else if('parameter' in elt._attributes){
              return elt._attributes.parameter.includes(config.name)
            }})
          if(testruns.length>0){
            return this.getResultbytesruns(testruns)
          }
        }
        else {
           if(('config' in testcase.testrun._attributes && testcase.testrun._attributes.config.includes(config.name))||('parameter' in testcase.testrun._attributes && testcase.testrun._attributes.parameter.includes(config.name))){
              return this.getTestRunResult(testcase.testrun)
            }
        }
      }
    },
    getDataCoverage(config){
      var testruns = this.getlogbytestconfig(config).test_Coverage

      if(testruns.length===0){
        return 'N/A'
      }
      else if(testruns.length===1){
        return this.getCoverage(testruns[0].log_RuntimeCoverage.summary)
      }else{
        var DataListCoverage = []
        var DataCoverage = {
          FC:[],
          DC:[],
          SC:[],
          CC:[],
          BC:[]
        }
        testruns.forEach(testrun=>{
          if('summary' in testrun.log_RuntimeCoverage){
            DataListCoverage.push(this.getCoverage(testrun.log_RuntimeCoverage.summary))
          }
        })
        DataListCoverage.forEach(data=>{
          DataCoverage.FC.push(data[0])
          DataCoverage.DC.push(data[1])
          DataCoverage.SC.push(data[2])
          DataCoverage.CC.push(data[3])
          DataCoverage.BC.push(data[4])
        })
        return DataCoverage
      }
    },
    getCoverage(summary){
        var coverages =[
            {
                type : 'FC',
                count : summary.modFctCnt?summary.modFctCnt._text:'N/A',
                covered : summary.modFctCovered?summary.modFctCovered._text:'N/A',
                accepted : summary.modFctCoveredJust?summary.modFctCoveredJust._text:'N/A',
                percentage : summary.cov_fct?summary.cov_fct._text:'N/A',
                percentageJustified : summary.covJust_fct?summary.covJust_fct._text:'N/A',
            },
            {
                type : 'DC',
                count : summary.modDecCnt?summary.modDecCnt._text:'N/A',
                covered : summary.modDecCovered?summary.modDecCovered._text:'N/A',
                accepted : summary.modDecCoveredJust?summary.modDecCoveredJust._text:'N/A',
                percentage : summary.dec_fct?summary.dec_fct._text:'N/A',
                percentageJustified : summary.decJust_fct?summary.decJust_fct._text:'N/A',
            },
            {
                type : 'SC',
                count : summary.stmtCnt?summary.stmtCnt._text:'N/A',
                covered : summary.stmtCovered?summary.stmtCovered._text:'N/A',
                accepted : summary.stmtCoveredJust?summary.stmtCoveredJust._text:'N/A',
                percentage : summary.stmt_fct?summary.stmt_fct._text:'N/A',
                percentageJustified : summary.stmtJust_fct?summary.stmtJust_fct._text:'N/A',
            },
            {
                type : 'CC',
                count : summary.callsCnt?summary.callsCnt._text:'N/A',
                covered : summary.callsCovered?summary.callsCovered._text:'N/A',
                accepted : summary.callsCoveredJust?summary.callsCoveredJust._text:'N/A',
                percentage : summary.callcov_fct?summary.callcov_fct._text:'N/A',
                percentageJustified : summary.callcovJust_fct?summary.callcovJust_fct._text:'N/A',
            },
            {
                type : 'BC',
                count : summary.decisionCnt?summary.decisionCnt._text:'N/A',
                covered : summary.decisionCovered?summary.decisionCovered._text:'N/A',
                accepted : summary.decisionCoveredJust?summary.decisionCoveredJust._text:'N/A',
                percentage : summary.decisionCnt?(summary.decisionCnt._text==='N/A'?'N/A':(summary.decisionCovered._text?(parseInt(summary.decisionCovered._text)*100/summary.decisionCnt._text):'N/A')):'N/A',
                percentageJustified : summary.decisionCnt?(summary.decisionCnt._text==='N/A'?'N/A':(summary.decisionCoveredJust._text?(parseInt(summary.decisionCoveredJust._text)*100/summary.decisionCnt._text):'N/A')):'N/A',
            }
        ]

        return coverages
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
    var configNames=[...this.$store.state.testConfigs]

    configNames.forEach(name=>{
      var config = {}
      
      config.name = name
      config.Coverage_Status = 'TBD'

      var pathelt = name.split('\\')
      pathelt.pop()
      config.ConfigPath  = pathelt.join('\\')

      this.paths.push(config.ConfigPath) 
      config.QualityLevel = this.getquality(name)

      config.configName = name.replace(config.ConfigPath,'')
      var testRunsFunctionnalResultforthisConfig = this.getResultbytesruns(this.getlogbytestconfig(name).test_fonctional)
      config.Functional = {
        result : testRunsFunctionnalResultforthisConfig,
        status : testRunsFunctionnalResultforthisConfig!=='processorError'&&testRunsFunctionnalResultforthisConfig!=='FAIL'&&testRunsFunctionnalResultforthisConfig!=='WARN'?'OK':'FAIL',
        NrOfTestCases : this.getlogbytestconfig(name).test_fonctional.length
      }
      var testRunsMisraResultforthisConfig = this.getResultbytesruns(this.getlogbytestconfig(name).test_MISRA)
      
      var builds = []
      this.getlogbytestconfig(name).test_MISRA.forEach(testrun=>{
        if('log_build' in testrun){
          if('message' in testrun.log_build){
            if(Array.isArray(testrun.log_build.message)){
              testrun.log_build.message.forEach(message=>{
                if(message.result._text!=='info'){
                  builds.push(message)
                }
              })
            }else{
              if(testrun.log_build.message.result._text!=='info'){
                  builds.push(message)
                }
            }
          }
        }
      })
      
      var rules = []
      this.getlogbytestconfig(name).test_MISRA.forEach(testrun=>{
        if('log_QACSummary' in testrun){
          if('mcm' in testrun.log_QACSummary){
            if(Array.isArray(testrun.log_QACSummary.mcm)){
              rules.push(...testrun.log_QACSummary.mcm)
            }else{
              rules.push(testrun.log_QACSummary.mcm)
            }
          }
        }
      })
      
      config.Misra = {
        result : testRunsMisraResultforthisConfig,
        status : rules.length===0?'OK':'FAIL',
        NrOfOpenFindings : builds.length,
        NrOfDeviatedRules : rules.length
      }

      config.testruns = this.getTestrunByConfig(name)
      console.log('this testconfigs result',this.getResultbytesruns(config.testruns))
      this.testconfigs.push(config)
      if(name.toLowerCase()==='overall'){
        console.log('ce tetu',config)
      }
    })

    this.paths = [...(new Set(this.paths))]
    console.log('this testconfigs',this.testconfigs)
  }
};
</script>
<style scoped>
  .content{
    padding: 0 15px !important;
  }
  .md-table-cell {
    height: 40px !important;
    line-height: 5px !important;
  }
  .md-card-header{
    padding: 5px !important;
  }
  .md-title{
    font-size: 0.9em !important;
  }
  
</style>
