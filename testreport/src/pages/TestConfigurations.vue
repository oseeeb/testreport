<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
       <md-table md-card>
           <md-table-toolbar>
               <h2>TestConfiguration</h2>
           </md-table-toolbar>
            <md-table-row class="tLegend">
                <md-table-head>TestConfig</md-table-head>
                <md-table-head>SafetyLevel</md-table-head>
                <md-table-head>Functional</md-table-head>
                <md-table-head>MISRA</md-table-head>
                <md-table-head>Coverage(C/DC)</md-table-head>
                <md-table-head>Overall</md-table-head>
                <md-table-head>Result</md-table-head>
            </md-table-row>
            <template v-for="(path,key) in paths">
                <md-table-row colspan="7" :key="key">
                    {{path}}
                </md-table-row>
                <md-table-row v-for="(config,kex) in filteredConfigs(path)" :key="(kex+testconfigs.length)">   
                  <md-table-cell>{{config.configName}}</md-table-cell> 
                  <md-table-cell>{{getquality(config.name)}}</md-table-cell>  
                  <md-table-cell>
                    <template v-if="config.Functional.NrOfTestCases>0">
                      <md-table>
                        <md-table-row>
                            <md-table-cell>
                              <span :class="config.Functional.status==='OK'?'symbol_ok':'symbol_fail'"> </span>
                            </md-table-cell>
                        </md-table-row>
                      </md-table>
                    </template>
                  </md-table-cell> 
                  <md-table-cell>
                    <template v-if="config.Misra.NrOfDeviatedRules>0">
                      <md-table>
                        <md-table-row>
                            <md-table-cell>
                              <span :class="config.Misra.status==='OK'?'symbol_ok':'symbol_fail'"> </span>
                            </md-table-cell>
                            <md-table-cell>
                              {{config.Misra.NrOfDeviatedRules}}
                            </md-table-cell>
                        </md-table-row>
                      </md-table>
                    </template>
                  </md-table-cell>              
                </md-table-row>
            </template>

       </md-table>
      </div> 
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
export default {
  components:{
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
    getlogbytestconfig(config){
      var testRunslog = []
      var testRundlog_QAC = []
      this.$store.state.testRuns.forEach(testrun=>{
          if(('config' in testrun._attributes)&&(testrun._attributes.config.includes(config))){
            if('log' in testrun){
              testRunslog.push(testrun)
            }
            if('log_QACSummary' in testrun){
              testRundlog_QAC.push(testrun)
            }
          }
          else if(('parameter' in testrun._attributes)&&(testrun._attributes.parameter.includes(config))){
            if('log' in testrun){
              testRunslog.push(testrun)
            }
            if('log_QACSummary' in testrun){
              testRundlog_QAC.push(testrun)
            }
          }
      })
      return {
        test_fonctional:testRunslog,
        test_MISRA:testRundlog_QAC
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
    }
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

    //  config.testruns = [...this.getlogbytestconfig(name).test_MISRA,...this.getlogbytestconfig(name).test_functional]

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
    height: 0 !important;
    line-height: 5px !important;
  }
  .md-card-header{
    padding: 5px !important;
  }
  .md-title{
    font-size: 0.9em !important;
  }
  
</style>
