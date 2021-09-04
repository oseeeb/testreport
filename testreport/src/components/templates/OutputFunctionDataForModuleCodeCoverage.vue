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
                count : summary.modFctCnt?summary.modFctCnt._text:0,
                covered : summary.modFctCovered?summary.modFctCovered._text:0,
                accepted : summary.modFctCoveredJust?summary.modFctCoveredJust._text:0,
                percentage : summary.cov_fct?summary.cov_fct._text:0,
                percentageJustified : summary.covJust_fct?summary.covJust_fct._text:0,
            },
            {
                type : 'DC',
                count : summary.modDecCnt?summary.modDecCnt._text:0,
                covered : summary.modDecCovered?summary.modDecCovered._text:0,
                accepted : summary.modDecCoveredJust?summary.modDecCoveredJust._text:0,
                percentage : summary.dec_fct?summary.dec_fct._text:0,
                percentageJustified : summary.decJust_fct?summary.decJust_fct._text:0,
            },
            {
                type : 'SC',
                count : summary.stmtCnt?summary.stmtCnt._text:0,
                covered : summary.stmtCovered?summary.stmtCovered._text:0,
                accepted : summary.stmtCoveredJust?summary.stmtCoveredJust._text:0,
                percentage : summary.stmt_fct?summary.stmt_fct._text:0,
                percentageJustified : summary.stmtJust_fct?summary.stmtJust_fct._text:0,
            },
            {
                type : 'CC',
                count : summary.callsCnt?summary.callsCnt._text:0,
                covered : summary.callsCovered?summary.callsCovered._text:0,
                accepted : summary.callsCoveredJust?summary.callsCoveredJust._text:0,
                percentage : summary.callcov_fct?summary.callcov_fct._text:0,
                percentageJustified : summary.callcovJust_fct?summary.callcovJust_fct._text:0,
            },
            {
                type : 'BC',
                count : summary.decisionCnt?summary.decisionCnt._text:0,
                covered : summary.decisionCovered?summary.decisionCovered._text:0,
                accepted : summary.decisionCoveredJust?summary.decisionCoveredJust._text:0,
                percentage : summary.decisionCnt?(summary.decisionCnt._text==='0'?'N/A':(summary.decisionCovered._text?(parseInt(summary.decisionCovered._text)*100/summary.decisionCnt._text):'N/A')):0,
                percentageJustified : summary.decisionCnt?(summary.decisionCnt._text==='0'?'N/A':(summary.decisionCoveredJust._text?(parseInt(summary.decisionCoveredJust._text)*100/summary.decisionCnt._text):'N/A')):0,
            }
            ]

            return coverages
        },
        
      }
  }
</script>
<style scoped>

</style>
  