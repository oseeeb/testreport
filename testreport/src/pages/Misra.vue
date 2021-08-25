<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
        <div class="d-flex justify-content-between conf-block">
            <div class="flex">
                <span>MISRA Compliance Result</span>
            </div>
            <div class="flex" :style="'background-color: '+bgcolor_compliance">
                <span>{{compliance_result}}</span>
            </div>
        </div> 
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
        <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
            <md-table md-card>
                <md-table-toolbar>
                    <h1 class="md-title">Overview of tested configurations({{TestRuns_QACSummary.length}})</h1>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head style="width:20%;">Configuration reference</md-table-head>
                    <md-table-head style="width:20%;">Date</md-table-head>
                    <md-table-head style="width:20%;">Tester</md-table-head>
                    <md-table-head style="width:20%;">Result</md-table-head>
                </md-table-row>
                <md-table-row v-for="(item,key) in TestRuns_QACSummary" :key="key">
                    <md-table-cell>{{item._attributes.parameter}}</md-table-cell>
                    <md-table-cell>{{item._attributes.date}}</md-table-cell>
                    <md-table-cell>{{item._attributes.executor}}</md-table-cell>
                    <md-table-cell>{{item.result._text}}</md-table-cell>
                </md-table-row>
            </md-table>
        </div> 
        <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
            <md-table md-card>
                <md-table-toolbar>
                    <h1 class="md-title">QAC Summary for all configurations</h1>
                </md-table-toolbar>
                <md-table-row>
                    
                    <md-table-head>MISRA rule</md-table-head>
                    <md-table-head>Number of configurations with deviations</md-table-head>
                    <md-table-head>Sum of deviations for all configurations</md-table-head>
                    <md-table-head>Max deviations per configuration</md-table-head>
                    <md-table-head>Justifications</md-table-head>
                </md-table-row>
                <md-table-row v-for="(item,key) in MISRA_Rules" :key="key">
                    <md-table-cell>{{item._attributes.msgId}}</md-table-cell>
                    <md-table-cell>{{getMatchingRules(MISRA_Rules,item._attributes.msgId).length}}/{{nrOfConfigs}}</md-table-cell>
                    <md-table-cell>{{getSum(MISRA_Rules,item._attributes.msgId)}}</md-table-cell>
                    <md-table-cell>{{getMaxOcc(MISRA_Rules,item._attributes.msgId)}}</md-table-cell>
                    <md-table-cell>
                        <md-table>
                            <template v-if="item.version==='9'">
                                <template v-if="Array.isArray(item.message)">
                                    <md-table-row v-for="(itex,kex) in item.message" :key="kex">
                                        <template v-if="getjustificationCount(itex)===0">
                                            <template v-if="itex._attributes.file==='multi-homed'||itex._attributes.file==='cma'">
                                                <md-table-cell>{{itex._attributes.file}}</md-table-cell>
                                                <md-table-cell></md-table-cell>
                                            </template>
                                            <template v-else>
                                                <md-table-cell class="yellow">{{itex._attributes.file}}</md-table-cell>
                                                <md-table-cell class="yellow">Unjustified occurrences of msg {{itex._attributes.msgId}}</md-table-cell>
                                            </template>
                                        </template>
                                        <template v-else>
                                            <md-table-cell>{{itex._attributes.file}}</md-table-cell>
                                            <md-table-cell>
                                                <template v-if="Array.isArray(itex.justification)">
                                                    <template v-for="(itey,kem) in itex.justification">
                                                        <span :key="kem" v-if="itey.text._text.substring(0,6)==='MD_MSR_'">{{itey.text._text}}</span>
                                                        <span :key="kem" v-else-if="itey.text._text.substring(0,6)==='MD_CBD_'">{{itey.text._text}}</span>
                                                        <span :key="kem" v-else-if="itey.text._text.substring(0,6)==='MD_CSL_'">{{itey.text._text}}</span>
                                                        <span :key="kem" v-else-if="itey.text._text.substring(0,2)==='MD_'">
                                                            <a :href="'#'+itey.text._text">{{itey.text._text}}</a>
                                                        </span>
                                                        <span :key="kem" v-else>{{itey.text._text}}</span>
                                                    </template>
                                                </template>
                                                <template v-else>
                                                    <span v-if="itex.justification.text._text.substring(0,6)==='MD_MSR_'">{{itex.justification.text._text}}</span>
                                                    <span v-else-if="itex.justification.text._text.substring(0,6)==='MD_CBD_'">{{itex.justification.text._text}}</span>
                                                    <span v-else-if="itex.justification.text._text.substring(0,6)==='MD_CSL_'">{{itex.justification.text._text}}</span>
                                                    <span v-else-if="itex.justification.text._text.substring(0,2)==='MD_'">
                                                        <a :href="'#'+itex.justification.text._text">{{itex.justification.text._text}}</a>
                                                    </span>
                                                    <span v-else>{{itex.justification.text._text}}</span>
                                                </template>
                                            </md-table-cell>
                                        </template>
                                    </md-table-row>
                                </template>
                                <template v-else>
                                    <md-table-row>
                                        <template v-if="getjustificationCount(item.message)===0">
                                            <template v-if="item.message._attributes.file==='multi-homed'||item.message._attributes.file==='cma'">
                                                <md-table-cell>{{item.message._attributes.file}}</md-table-cell>
                                                <md-table-cell></md-table-cell>
                                            </template>
                                            <template v-else>
                                                <md-table-cell class="yellow">{{item.message._attributes.file}}</md-table-cell>
                                                <md-table-cell class="yellow">Unjustified occurrences of msg {{item.message._attributes.msgId}}</md-table-cell>
                                            </template>
                                        </template>
                                    </md-table-row>
                                </template>
                            </template>
                        </md-table>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div> 
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
        compliance_result:'N/A',
        bgcolor_compliance:'#000000',
        TestRunsWithContainedMisraJustifications:[],
        TestRuns_QACSummary:[]
    }
  },
  computed:{
      MISRA_Rules(){
          var rules = []
          var distinctRules = []
          this.TestRuns_QACSummary.forEach(elt=>{
              if('log_QACSummary' in elt){
                  elt.log_QACSummary.mcm.map(elmt=>{
                      var obj = {}
                      obj=elmt
                      obj.version = elt.log_QACSummary._attributes.version

                      return obj
                  })
                  rules.push(...elt.log_QACSummary.mcm)
              }
          })
            rules=Object.values(
                rules.reduce((a, b) => {
                if (!a[b._attributes.msgId]) a[b._attributes.msgId] = b 
                return a
            }, {})
            )
          return rules
      },
      nrOfConfigs(){
          return this.TestRuns_QACSummary.length
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
                          if('QacJustificationMarkerList' in testrun){
                              this.TestRunsWithContainedMisraJustifications.push(testrun)
                          }
                      })
                  }else{
                    if('log_QACSummary' in elt.testrun){
                            this.TestRuns_QACSummary.push(elt.testrun)
                        }
                    if('QacJustificationMarkerList' in elt.testrun){
                            this.TestRunsWithContainedMisraJustifications.push(elt.testrun)
                        } 
                  }
              }
          })
        console.log(this.TestRuns_QACSummary)
          var TestRunsRelevantForTestResult = this.TestRuns_QACSummary.concat(this.TestRunsWithContainedMisraJustifications)
          var MissingJustificationsText = ' (due to missing justifications)';

          var nrOfProcessErrorUnjustified = TestRunsRelevantForTestResult.filter(elt=>{
              return (("_text" in elt.result)&&elt.result._text.includes('processError'))&&(!('justification' in elt))
          }).length

          var nrOfFailUnjustified = TestRunsRelevantForTestResult.filter(elt=>{
              return (("_text" in elt.result)&&elt.result._text.includes('fail'))&&(!('justification' in elt))
          }).length

          var nrOfWarnUnjustified = TestRunsRelevantForTestResult.filter(elt=>{
              return (("_text" in elt.result)&&elt.result._text.includes('warn'))&&(!('justification' in elt))
          }).length
          
          if(nrOfProcessErrorUnjustified!==0){
              this.compliance_result = 'ProcessError'+MissingJustificationsText
              this.bgcolor_compliance = '#FF0000'
          }
          else if(nrOfFailUnjustified!==0){
              this.compliance_result = 'Fail'+MissingJustificationsText
              this.bgcolor_compliance = '#FF0000'
          }
          else if(nrOfWarnUnjustified!==0){
              this.compliance_result = 'Warn '+MissingJustificationsText
              this.bgcolor_compliance = '#FFFF00'
          }
          else{
              this.compliance_result = 'accepted'
              this.bgcolor_compliance = '#00FF00'
          }

      },
      getMatchingRules(rules,currentId){
          return rules.filter(elt=>{return elt._attributes.msgId===currentId})
      },
      getSum(rules,currid){
          var MatchingRules = this.getMatchingRules(rules,currid)
          console.log('match',MatchingRules)

          if(Array.isArray(MatchingRules)){
              var occurences = []
              MatchingRules.forEach(elt=>{
                  occurences.push(parseInt(elt._attributes.occurence))
              })
              return occurences.reduce((acc,curr)=>acc+curr)
          }
          else{
              return MatchingRules
          }
      },
      getMaxOcc(rules,currid){
        var MatchingRules = this.getMatchingRules(rules,currid)

        if(Array.isArray(MatchingRules)){
              MatchingRules.map(elt=>{
                var obj = elt
                obj._attributes.occurence = parseInt(obj._attributes.occurence) 
                return obj
              })
              
              MatchingRules.sort((a,b)=>{
                  return a._attributes.occurence-b._attributes.occurence
              })

              return MatchingRules[0]._attributes.occurence

          }
          else{
              return MatchingRules
          }
      },
      getjustificationCount(msg){
          var count = []
          if(Array.isArray(msg.justification)){
              msg.justification.forEach(elt=>{
                  count.push(parseInt(elt._attributes.count))
              })
          }
          else{
              count.push(parseInt(msg.justification._attributes.count))
          }

          return count.reduce((acc,curr)=>acc+curr)
      }

  },
  mounted(){
     this.getResultCompliance()
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
