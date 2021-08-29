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
                        <span :key="key"></span>
                        <template v-for="(log,key) in logs">
                            <template v-if="quality===getqualityFromString(log.testrunAttr.parameter)">
                                <md-table-row :key="key">
                                    <md-table-cell colspan="2">
                                        {{log.testrunAttr.parameter}}
                                        <a :href="log.link._text">[Details Report]</a>
                                    </md-table-cell>
                                    <md-table-cell><show-coverage-data :coverage="getCoverage(log.summary)[0]"></show-coverage-data></md-table-cell>
                                    <md-table-cell><show-coverage-data :coverage="getCoverage(log.summary)[1]"></show-coverage-data></md-table-cell>
                                    <md-table-cell><show-coverage-data :coverage="getCoverage(log.summary)[2]"></show-coverage-data></md-table-cell>
                                    <md-table-cell><show-coverage-data :coverage="getCoverage(log.summary)[3]"></show-coverage-data></md-table-cell>
                                    <md-table-cell><show-coverage-data :coverage="getCoverage(log.summary)[4]"></show-coverage-data></md-table-cell>
                                    <md-table-cell></md-table-cell>
                                </md-table-row>
                            </template>
                        </template>
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
export default {
  components:{
      ShowCoverageData
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
                this.moduleCodeCoverageFileNodes.push(elt.file)
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
                this.moduleCodeCoverageFileNodes.push(elt.file)
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

        console.log('logRuntimeCoverageNodesForModuleCodeCoverage',this.logRuntimeCoverageNodesForModuleCodeCoverage)
        console.log('moduleCodeCoverageTestRuns',this.moduleCodeCoverageTestRuns)
    },
    getqualityFromString(parameter){
        var quality = parameter.match(/.*quality=/)
        
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

    },
    getCoverage(summary){
        var ya = 5158
        var coverages =[
            {
                type : 'FC',
                count : summary.modFctCnt._text,
                covered : summary.modFctCovered._text,
                accepted : summary.modFctCoveredJust._text,
                percentage : summary.cov_fct._text,
                percentageJustified : summary.covJust_fct._text,
            },
            {
                type : 'DC',
                count : summary.modDecCnt._text,
                covered : summary.modDecCovered._text,
                accepted : summary.modDecCoveredJust._text,
                percentage : summary.dec_fct._text,
                percentageJustified : summary.decJust_fct._text,
            },
            {
                type : 'SC',
                count : summary.stmtCnt._text,
                covered : summary.stmtCovered._text,
                accepted : summary.stmtCoveredJust._text,
                percentage : summary.stmt_fct._text,
                percentageJustified : summary.stmtJust_fct._text,
            },
            {
                type : 'CC',
                count : summary.callsCnt._text,
                covered : summary.callsCovered._text,
                accepted : summary.callsCoveredJust._text,
                percentage : summary.callcov_fct._text,
                percentageJustified : summary.callcovJust_fct._text,
            },
            {
                type : 'BC',
                count : summary.decisionCnt._text,
                covered : summary.decisionCovered._text,
                accepted : summary.decisionCoveredJust._text,
                percentage : summary.decisionCnt._text==='0'?'N/A':(summary.decisionCovered._text?(parseInt(summary.decisionCovered._text)*100/summary.decisionCnt._text):'N/A'),
                percentageJustified : summary.decisionCnt._text==='0'?'N/A':(summary.decisionCoveredJust._text?(parseInt(summary.decisionCoveredJust._text)*100/summary.decisionCnt._text):'N/A'),
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
     console.log(this.qualitys)
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
  
</style>
