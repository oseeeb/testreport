<template>
    <md-table-row v-if="!outputFunctionsWithRiskMetricViolationOnly || getriskMetricData(func).riskCycJustMinMaxValues.max>=minimumRiskMetricValueForFunctionOutputInTheOutputFunctionsWithRiskMetricViolationOnlyCase">
        <md-table-cell colspan="2">{{func.name._text}}</md-table-cell>
            <template v-if="getriskMetricData(func).riskCycJustMinMaxValues.max !== 0 || getriskMetricData(func).riskCycMinMaxValues.max !== 0">
            <md-table-cell 
            :style="'background-color:'+((getriskMetricData(func).riskCycJustMinMaxValues.max>=4.0&&getriskMetricData(func).riskCycJustMinMaxValues.max<=10.0)?'#CCEEFF':(getriskMetricData(func).riskCycJustMinMaxValues.max>10.0?'#33BCFF':''))"
            >
                {{getriskMetricData(func).riskCycJustMinMaxValues.max+'('+getriskMetricData(func).riskCycMinMaxValues.max+')'}}
            </md-table-cell>
            </template>
            <template v-else>
            <md-table-cell></md-table-cell>
            </template>
        <md-table-cell><show-coverage-data :coverage="getCoverage(func)[0]"></show-coverage-data></md-table-cell>
        <md-table-cell><show-coverage-data :coverage="getCoverage(func)[1]"></show-coverage-data></md-table-cell>
        <md-table-cell><show-coverage-data :coverage="getCoverage(func)[2]"></show-coverage-data></md-table-cell>
        <md-table-cell><show-coverage-data :coverage="getCoverage(func)[3]"></show-coverage-data></md-table-cell>
        <md-table-cell><show-coverage-data :coverage="getCoverage(func)[4]"></show-coverage-data></md-table-cell>
    </md-table-row>
</template>
<script>
import ShowCoverageData from './ShowCoverageData.vue'
export default {
  components:{
      ShowCoverageData
  },
      props:{
          functionNodes:{
              type:[Array, Object],
              default:new Array()
          },
          func:{
              type:Object
          },
          riskMetricAvailableForFunctions:{
              type:Boolean,
              default:false
          },
          outputFunctionsWithRiskMetricViolationOnly:{
              type:Boolean,
              default:false
          },
          minimumRiskMetricValueForFunctionOutputInTheOutputFunctionsWithRiskMetricViolationOnlyCase:{
              type:Number,
              default:4
          }
      },
      computed:{
          functionCoverageColumnColspan(){
              return 3 - this.riskMetricAvailableForFunctions
          }
      },
      methods:{
        getriskMetricData(func){
            var functionsWithSameName = this.functionNodes.filter(funct=>{
                return funct.name._text === func.name._text
            })

            var result = {
                riskCycJustMinMaxValues:{
                    min:0,
                    max:0
                },
                riskCycMinMaxValues:{
                    min:0,
                    max:0
                } 
            }
            var riskfunctionsWithSameName = functionsWithSameName.filter(funct=>{
                                                return 'riskCYC' in funct
                                            })
            var riskJustfunctionsWithSameName = functionsWithSameName.filter(funct=>{
                return 'riskCYCJust' in funct
            })

            if(riskfunctionsWithSameName.length>0){
                riskfunctionsWithSameName.sort((a,b)=>{return parseFloat(a.riskCYC._text)-parseFloat(b.riskCYC._text)})
                result.riskCycMinMaxValues.min = parseFloat(riskfunctionsWithSameName[0].riskCYC._text)
                result.riskCycMinMaxValues.max = parseFloat(riskfunctionsWithSameName[riskfunctionsWithSameName.length-1].riskCYC._text)
            }

            if(riskJustfunctionsWithSameName.length>0){
                riskfunctionsWithSameName.sort((a,b)=>{return parseInt(a.riskCYCJust._text)-parseInt(b.riskCYCJust._text)})
                result.riskCycJustMinMaxValues.min = parseFloat(riskfunctionsWithSameName[0].riskCYC._text)
                result.riskCycJustMinMaxValues.max = parseFloat(riskfunctionsWithSameName[riskfunctionsWithSameName.length-1].riskCYC._text)
            }

            return result
        },
        getCoverage(summary){
             var nodes_func = this.functionNodes.filter(func=>{
                return func.name._text === summary.name._text
            })
            var itemcoverageFC = []
            var itemcoverageDC = []
            var itemcoverageSC = []
            var itemcoverageCC = []
            var itemcoverageBC = []

            nodes_func.forEach(func=>{
                itemcoverageFC.push({
                    type : 'FC',
                    count : func.modFctCnt?func.modFctCnt._text:'N/A',
                    covered : func.modFctCovered?func.modFctCovered._text:'N/A',
                    accepted : func.modFctCoveredJust?func.modFctCoveredJust._text:'N/A',
                    percentage : func.cov_fct?parseInt(func.cov_fct._text):'N/A',
                    percentageJustified : func.covJust_fct?parseInt(func.covJust_fct._text):'N/A',
                })
                itemcoverageDC.push({
                    type : 'DC',
                    count : func.modDecCnt?func.modDecCnt._text:'N/A',
                    covered : func.modDecCovered?func.modDecCovered._text:'N/A',
                    accepted : func.modDecCoveredJust?func.modDecCoveredJust._text:'N/A',
                    percentage : func.dec_fct?parseInt(func.dec_fct._text):'N/A',
                    percentageJustified : func.decJust_fct?parseInt(func.decJust_fct._text):'N/A',
                })
                itemcoverageSC.push({
                    type : 'SC',
                    count : func.stmtCnt?func.stmtCnt._text:'N/A',
                    covered : func.stmtCovered?func.stmtCovered._text:'N/A',
                    accepted : func.stmtCoveredJust?func.stmtCoveredJust._text:'N/A',
                    percentage : func.stmt_fct?parseInt(func.stmt_fct._text):'N/A',
                    percentageJustified : func.stmtJust_fct?parseInt(func.stmtJust_fct._text):'N/A',
                })
                itemcoverageCC.push({
                    type : 'CC',
                    count : func.callsCnt?func.callsCnt._text:'N/A',
                    covered : func.callsCovered?func.callsCovered._text:'N/A',
                    accepted : func.callsCoveredJust?func.callsCoveredJust._text:'N/A',
                    percentage : func.callcov_fct?parseInt(func.callcov_fct._text):'N/A',
                    percentageJustified : func.callcovJust_fct?parseInt(func.callcovJust_fct._text):'N/A',
                })
                itemcoverageBC.push({
                    type : 'BC',
                    count : func.decisionCnt?func.decisionCnt._text:'N/A',
                    covered : func.decisionCovered?func.decisionCovered._text:'N/A',
                    accepted : func.decisionCoveredJust?func.decisionCoveredJust._text:'N/A',
                    percentage : func.decisionCnt?(func.decisionCnt._text==='N/A'?'N/A':(func.decisionCovered._text?(parseInt(func.decisionCovered._text)*100/func.decisionCnt._text):'N/A')):'N/A',
                    percentageJustified : func.decisionCnt?(func.decisionCnt._text==='N/A'?'N/A':(func.decisionCoveredJust._text?(parseInt(func.decisionCoveredJust._text)*100/func.decisionCnt._text):'N/A')):'N/A',
                })
            })

            return [itemcoverageFC , itemcoverageDC , itemcoverageSC , itemcoverageCC , itemcoverageBC ]
        },
        
      }
  }
</script>
<style scoped>

</style>
  