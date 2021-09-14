<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
        <div v-if="TestRuns_QACSummary.length!==0" class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
            <md-table md-card>
                <md-table-toolbar>
                    <h1 class="md-title">Test Environnement</h1>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-cell style="width:25%;">Version</md-table-cell>
                    <md-table-cell>{{TestRuns_QACSummary[1].testenv.version._text}}</md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell style="width:25%;">option</md-table-cell>
                    <md-table-cell>{{TestRuns_QACSummary[0].testenv.option?TestRuns_QACSummary[1].testenv.option._text:''}}</md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell style="width:25%;">Personality files</md-table-cell>
                    <md-table-cell>
                        <p v-html="TestRuns_QACSummary[0].testenv.QACoption.p_a._text"></p>
                        <p v-html="TestRuns_QACSummary[0].testenv.QACoption.p_c._text"></p>
                        <p v-html="TestRuns_QACSummary[0].testenv.QACoption.p_s._text"></p>
                    </md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell style="width:25%;">Analyzed files</md-table-cell>
                    <md-table-cell>{{TestRuns_QACSummary[0].testenv.QACoption.ProjectFile}}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <template v-if="moduleCodeCoverageTestRunsAvailable">
            <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
                <md-table md-card>
                    <md-table-toolbar>
                        <h1 class="md-title">Module Code Coverage</h1>
                        <h2 class="md-subhead">Module code coverage was executed for {{moduleCodeCoverageTestRuns.length}} configuration{{moduleCodeCoverageTestRuns.length>1?'s':''}}</h2>
                    </md-table-toolbar>
                     <md-table-row>
                        <md-table-cell colspan="2">Configuration</md-table-cell>
                        <md-table-cell>FC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>C/DC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>SC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>CC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>BC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell></md-table-cell>
                    </md-table-row>
                    <template v-for="(quality,key) in qualitys">
                         <md-table-row style="background-color:darkgrey;color:white" :key="key" colspan="7">
                             <md-table-cell colspan="7">{{quality}}</md-table-cell>
                        </md-table-row>
                        <template v-for="(log,key) in logs">
                            <template v-if="quality===getqualityFromString(log.testrunAttr.parameter)">
                                <md-table-row :key="key">
                                    <md-table-cell colspan="2">
                                        {{getConfig(log.testrunAttr.parameter)!==null?getConfig(log.testrunAttr.parameter)[1]:''}}
                                        <a :href="log.link?log.link._text:'#'">[Details Report]</a>
                                    </md-table-cell>
                                    <md-table-cell><show-coverage-data :coverage="log.summary?getCoverage(log.summary)[0]:[]"></show-coverage-data></md-table-cell>
                                    <md-table-cell><show-coverage-data :coverage="log.summary?getCoverage(log.summary)[1]:[]"></show-coverage-data></md-table-cell>
                                    <md-table-cell><show-coverage-data :coverage="log.summary?getCoverage(log.summary)[2]:[]"></show-coverage-data></md-table-cell>
                                    <md-table-cell><show-coverage-data :coverage="log.summary?getCoverage(log.summary)[3]:[]"></show-coverage-data></md-table-cell>
                                    <md-table-cell><show-coverage-data :coverage="log.summary?getCoverage(log.summary)[4]:[]"></show-coverage-data></md-table-cell>
                                    <md-table-cell></md-table-cell>
                                </md-table-row>
                            </template>
                        </template>
                    </template> 
                </md-table>
            </div>
            <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
                <md-table md-card>
                    <md-table-toolbar>
                        <h1 class="md-title">FileCoverage</h1>
                    </md-table-toolbar>
                     <md-table-row>
                        <md-table-cell colspan="2">file name</md-table-cell>
                        <md-table-cell>FC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>C/DC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>SC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>CC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>BC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell></md-table-cell>
                    </md-table-row>
                    <template v-if="moduleCodeCoverageUniqueFileNodes.length<100">
                        <template v-for="(file,key) in moduleCodeCoverageUniqueFileNodes">
                            <md-table-row :key="key">
                                <md-table-cell colspan="2">
                                    {{file.name._text}}
                                </md-table-cell>
                                <md-table-cell><show-coverage-data :coverage="getCoverage(file)[0]"></show-coverage-data></md-table-cell>
                                <md-table-cell><show-coverage-data :coverage="getCoverage(file)[1]"></show-coverage-data></md-table-cell>
                                <md-table-cell><show-coverage-data :coverage="getCoverage(file)[2]"></show-coverage-data></md-table-cell>
                                <md-table-cell><show-coverage-data :coverage="getCoverage(file)[3]"></show-coverage-data></md-table-cell>
                                <md-table-cell><show-coverage-data :coverage="getCoverage(file)[4]"></show-coverage-data></md-table-cell>
                                <md-table-cell></md-table-cell>
                            </md-table-row>
                        </template>
                    </template>
                    <template v-else>
                        <md-table-row>
                            <md-table-cell colspan="7">There are {{moduleCodeCoverageUniqueFileNodes.length}} differently named files in {{moduleCodeCoverageFileNodes.length}} files. Details are not displayed.</md-table-cell>
                        </md-table-row>
                    </template>
                </md-table>
            </div>
            <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
                <md-table md-card>
                    <md-table-toolbar>
                        <h1 class="md-title">Functions coverage</h1>
                    </md-table-toolbar>
                     <md-table-row>
                        <md-table-cell colspan="2">Function name</md-table-cell>
                        <md-table-cell v-if="riskMetricAvailableForFunctions"><span class="riskTooltip" :data-tooltip="'Risk metric per function, maximum over all configurations, based on cyclomatic complexity and code coverage. It helps detecting complex functions with low code coverage (such functions have greater risk of issues).\n\nThresholds:\n\n>= 4: justifiable deviation\n\n>= 10: approval required'">Risk metric<br/>Justified (Measured)</span></md-table-cell>
                        <md-table-cell>FC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>C/DC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>SC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>CC<br/>Justified% (Measured%)</md-table-cell>
                        <md-table-cell>BC<br/>Justified% (Measured%)</md-table-cell>
                    </md-table-row>
                    <template v-if="moduleCodeCoverageUniqueFunctionNodes.length<200">
                       <output-function-data-for-module-code-coverage
                        v-for="(func,key) in moduleCodeCoverageUniqueFunctionNodes"
                        :key="key"
                        :functionNodes="moduleCodeCoverageFunctionNodes"
                        :func="func"
                        :outputFunctionsWithRiskMetricViolationOnly="false"
                        :riskMetricAvailableForFunctions="riskMetricAvailableForFunctions"
                       ></output-function-data-for-module-code-coverage>
                    </template>
                    <template v-else>
                        <md-table-row>
                            <md-table-cell colspan="7">There are {{moduleCodeCoverageUniqueFileNodes.length}} differently named files in {{moduleCodeCoverageFileNodes.length}} files. Details are not displayed.</md-table-cell>
                        </md-table-row>
                    </template>
                </md-table>
            </div>
        </template>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ShowCoverageData from '../components/templates/ShowCoverageData.vue'
import OutputFunctionDataForModuleCodeCoverage from '../components/templates/OutputFunctionDataForModuleCodeCoverage.vue'
export default {
  components:{
      ShowCoverageData,
      OutputFunctionDataForModuleCodeCoverage
  },
  data() {
    return {
        TestRuns_QACSummary:[],
        moduleCodeCoverageTestRuns:[],
        log_FunctionCoverageNodesForModuleCodeCoverage:[],
        logRuntimeCoverageNodesForModuleCodeCoverage:[],
        moduleCodeCoverageFileNodes:[],
        moduleCodeCoverageFunctionNodes:[]
    }
  },
  computed:{
      moduleCodeCoverageTestRunsAvailable(){
          return this.moduleCodeCoverageTestRuns.length>0
      },
      qualitys(){
          var logs = [...this.log_FunctionCoverageNodesForModuleCodeCoverage,...this.logRuntimeCoverageNodesForModuleCodeCoverage]
          var qualities = []
          logs.forEach(log=>{
              if("parameter" in log.testrunAttr){
                qualities.push(this.getqualityFromString(log.testrunAttr.parameter))
              }
          })

          return new Set(qualities)
      },
      logs(){
          return [...this.log_FunctionCoverageNodesForModuleCodeCoverage,...this.logRuntimeCoverageNodesForModuleCodeCoverage]
      },
      moduleCodeCoverageUniqueFileNodes(){
          var unique_files = []
          this.moduleCodeCoverageFileNodes.forEach(file=>{
              var testPresence = unique_files.find(ufile=>{return file.name._text===ufile.name._text})

              if(!testPresence){
                  unique_files.push(file)
              }
          })
          
          return unique_files
      },
      moduleCodeCoverageUniqueFunctionNodes(){
          var unique_functions = []
          this.moduleCodeCoverageFunctionNodes.forEach(func=>{
              var testPresence = unique_functions.find(ufunc=>{return func.name._text===ufunc.name._text})

              if(!testPresence){
                  unique_functions.push(func)
              }
          })
          
          return unique_functions
      },
      riskMetricAvailableForFunctions(){
          var risky_metrics = []
        
            this.moduleCodeCoverageFunctionNodes.forEach(func=>{
                if('riskCYC' in func || 'riskCYCJust' in func){
                    risky_metrics.push(func)
                }
            })
        
        return risky_metrics.length>0;
      }
    },
  methods:{
    getResultCompliance(){
        this.$store.state.testCases.forEach(elt=>{
            if('testrun' in elt){
                if(Array.isArray(elt.testrun)){
                    elt.testrun.forEach(testrun=>{
                        if('log_QACSummary' in testrun){
                            this.TestRuns_QACSummary.push(testrun)
                        }
                    })
                }else{
                if('log_QACSummary' in elt.testrun){
                        this.TestRuns_QACSummary.push(elt.testrun)
                    }
                }
            }
        })
        this.$store.state.testCases.forEach(elt=>{
            if('testrun' in elt){
                if(Array.isArray(elt.testrun)){
                    elt.testrun.forEach(testrun=>{
                        if(('log_FunctionCoverage' in testrun)||(('log_RuntimeCoverage' in testrun))){
                            this.moduleCodeCoverageTestRuns.push(testrun)
                        }
                    })
                }else{
                    if(('log_FunctionCoverage' in elt.testrun)||(('log_RuntimeCoverage' in elt.testrun))){
                        this.moduleCodeCoverageTestRuns.push(elt.testrun)
                    }
                }
            }
        })
        this.moduleCodeCoverageTestRuns.forEach(testrun=>{
            if ('log_FunctionCoverage' in testrun){
                if(Array.isArray(testrun.log_FunctionCoverage)){
                    this.testrun.log_FunctionCoverage.map(elt=>{
                        var obj = {}
                        obj = elt
                        obj.link = testrun.link
                        obj.testrunAttr = testrun._attributes
                        return obj;
                    })
                    this.log_FunctionCoverageNodesForModuleCodeCoverage.push(...testrun.log_FunctionCoverage)
                }else{
                    var obj = {}
                        obj = testrun.log_FunctionCoverage
                        obj.link = testrun.link
                        obj.testrunAttr = testrun._attributes
                    this.log_FunctionCoverageNodesForModuleCodeCoverage.push(obj)
                }
            }
            if ('log_RuntimeCoverage' in testrun){
                if(Array.isArray(testrun.log_RuntimeCoverage)){
                    this.testrun.log_RuntimeCoverage.map(elt=>{
                        var obj = {}
                        obj = elt
                        obj.link = testrun.link
                        obj.testrunAttr = testrun._attributes
                        return obj;
                    })
                    this.logRuntimeCoverageNodesForModuleCodeCoverage.push(...testrun.log_RuntimeCoverage)
                }else{
                    var obj = {}
                        obj = testrun.log_RuntimeCoverage
                        obj.link = testrun.link
                        obj.testrunAttr = testrun._attributes
                    this.logRuntimeCoverageNodesForModuleCodeCoverage.push(obj)
                }
            }
        })

        this.log_FunctionCoverageNodesForModuleCodeCoverage.forEach(elt=>{
            if('file' in elt){
                if(Array.isArray(elt.file)){
                    this.moduleCodeCoverageFileNodes.push(...elt.file)
                }else{
                    this.moduleCodeCoverageFileNodes.push(elt.file)
                }
            }
            if ('function' in elt){
                if(Array.isArray(elt.function)){
                    this.moduleCodeCoverageFunctionNodes.push(...elt.function)
                }else{
                    this.moduleCodeCoverageFunctionNodes.push(elt.function)
                }
            }
        })

        this.logRuntimeCoverageNodesForModuleCodeCoverage.forEach(elt=>{
            if('file' in elt){
                if(Array.isArray(elt.file)){
                    this.moduleCodeCoverageFileNodes.push(...elt.file)
                }else{
                    this.moduleCodeCoverageFileNodes.push(elt.file)
                }
            }
        })
        this.moduleCodeCoverageFileNodes.forEach(elt=>{
            if ('function' in elt){
                if(Array.isArray(elt.function)){
                    this.moduleCodeCoverageFunctionNodes.push(...elt.function)
                }else{
                    this.moduleCodeCoverageFunctionNodes.push(elt.function)
                }
            }
        })

    },
    getqualityFromString(parameter){
        var Matchquality = parameter.match(new RegExp("quality=(.*)"))
        if(Matchquality===null){
            return 'QM'
        }else{
            var quality = Matchquality[1]
            if((quality==='')||(quality==='OverallCoverage')){
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
        

    },
    getCoverage(summary){
        var coverages =[
            {
                type : 'FC',
                count : summary.modFctCnt?summary.modFctCnt._text:'N/A',
                covered : summary.modFctCovered?summary.modFctCovered._text:'N/A',
                accepted : summary.modFctCoveredJust?summary.modFctCoveredJust._text:'N/A',
                percentage : summary.cov_fct?parseInt(summary.cov_fct._text):'N/A',
                percentageJustified : summary.covJust_fct?parseInt(summary.covJust_fct._text):'N/A',
            },
            {
                type : 'DC',
                count : summary.modDecCnt?summary.modDecCnt._text:'N/A',
                covered : summary.modDecCovered?summary.modDecCovered._text:'N/A',
                accepted : summary.modDecCoveredJust?summary.modDecCoveredJust._text:'N/A',
                percentage : summary.dec_fct?parseInt(summary.dec_fct._text):'N/A',
                percentageJustified : summary.decJust_fct?parseInt(summary.decJust_fct._text):'N/A',
            },
            {
                type : 'SC',
                count : summary.stmtCnt?summary.stmtCnt._text:'N/A',
                covered : summary.stmtCovered?summary.stmtCovered._text:'N/A',
                accepted : summary.stmtCoveredJust?summary.stmtCoveredJust._text:'N/A',
                percentage : summary.stmt_fct?parseInt(summary.stmt_fct._text):'N/A',
                percentageJustified : summary.stmtJust_fct?parseInt(summary.stmtJust_fct._text):'N/A',
            },
            {
                type : 'CC',
                count : summary.callsCnt?summary.callsCnt._text:'N/A',
                covered : summary.callsCovered?summary.callsCovered._text:'N/A',
                accepted : summary.callsCoveredJust?summary.callsCoveredJust._text:'N/A',
                percentage : summary.callcov_fct?parseInt(summary.callcov_fct._text):'N/A',
                percentageJustified : summary.callcovJust_fct?parseInt(summary.callcovJust_fct._text):'N/A',
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
    getMinMaxInfo(path){
          if(path.length>0){
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

              var display=''


              if(result.min===result.max){
                  display = `${result.min}`
              }
              else{
                  display = `${result.min} ... ${result.max}`
              }

              return display

          }
    },
    getConfig(parameter){
        return parameter.match(new RegExp("config=(.*),"))
    },
    filters(bigdata,type,criteria){
        var datas = []
        if(Array.isArray(bigdata)){
        bigdata.forEach(elt=>{
            if(elt.type===type){
                datas.push(elt[criteria]._text)
            }
        })
        }
        return datas
    }
  },
  mounted(){
     this.getResultCompliance()
     console.log('moduleCodeCoverageUniqueFileNodes',this.moduleCodeCoverageUniqueFileNodes)
  }
};
</script>
<style scoped>
  .conf-block{
      background-color: white;
  }

  .conf-block .flex{
      padding: 15px;
  }
  
  .riskTooltip[data-tooltip]:before {
        left: -15em;
        white-space: pre-wrap; /* css-3 */
        white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
        white-space: -pre-wrap; /* Opera 4-6 */
        white-space: -o-pre-wrap; /* Opera 7 */
        word-wrap: break-word; /* Internet Explorer 5.5+ */
    }
    
    .riskTooltip[data-tooltip]:after {
        left: 0;
    }
</style>
