<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
       <md-table md-card>
           <md-table-toolbar>
               <h2>TestConfiguration Matrix</h2>
           </md-table-toolbar>
            <md-table-row class="tLegend">
                <md-table-head>Testcases</md-table-head>
                <md-table-head v-for="(config,kem) in testconfigs" :key="kem">{{config.name}}</md-table-head>
            </md-table-row>
            <md-table-row v-for="(testcase,ken) in $store.state.testCases" :key="ken+$store.state.testCases.length">  
              <md-table-cell>{{testcase._attributes.id}}</md-table-cell>
              <md-table-cell :style="'background-color:'+(getResultConfig(testcase,config)==='FAIL'?'red;':getResultConfig(testcase,config)==='WARN'?'yellow;':getResultConfig(testcase,config)==='OK'?'#00FF00;':'')" v-for="(config,ket) in testconfigs" :key="ket">{{getResultConfig(testcase,config)}}</md-table-cell>                
            </md-table-row>
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
      paths:[]
    }
  },
  methods:{
    filteredConfigs(path){
      return this.testconfigs.filter(config=>{
        return config.name.includes(path)
      })
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
            if(result.includes('FAIL')){
                return 'FAIL'
            }
            else if(result.includes('WARN')){
                return 'WARN'
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
            return 'OK'
        }
        else{
            return 'OK'
        }
    },
    getTestRunResult(testrun){
        if('result' in testrun){
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
