<template>
    <md-table-row :key="key" v-if="!outputFunctionsWithRiskMetricViolationOnly || getriskMetricData(func).riskCycJustMinMaxValues.max>=minimumRiskMetricValueForFunctionOutputInTheOutputFunctionsWithRiskMetricViolationOnlyCase">
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
        
      }
  }
</script>
<style scoped>

</style>
  