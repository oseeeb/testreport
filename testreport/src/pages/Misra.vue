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
                    <h1 class="md-title">QAC messages</h1>
                </md-table-toolbar>
                <md-table-row>
                    
                    <md-table-head>Message ID</md-table-head>
                    <md-table-head>Affected configurations</md-table-head>
                    <md-table-head>Occurrences</md-table-head>
                    <md-table-head>Justifications</md-table-head>
                    <md-table-head>Open messages</md-table-head>
                </md-table-row>
                <md-table-row v-for="(item,key) in QAC_Rules_Cond" :key="key">
                    <md-table-cell>
                        <a v-if="item.version==='9'" :href="'file:///\\vi.vector.int\\DE\\STR\\Restricted\\PES\\zCDK\\TestReport_References\\Code_MsgRef.html#'+item._attributes.msgId"> 
                            {{item._attributes.msgId}}
                        </a>
                        <a v-else :href="'file:///\\vi.vector.int\\DE\\STR\\Restricted\\PES\\zCDK\\TestReport_References\\Code_QAC_MsgRef.html'+item._attributes.msgId"> 
                            {{item._attributes.msgId}}
                        </a>
                        ({{item.msgId}})
                    </md-table-cell>
                    <md-table-cell>{{getAffectectedTestruns(item._attributes.msgId).length}}</md-table-cell>
                    <md-table-cell>{{getMaxMinOcc(QAC_Rules,item._attributes.msgId).min===getMaxMinOcc(QAC_Rules,item._attributes.msgId).max?getMaxMinOcc(QAC_Rules,item._attributes.msgId).min:getMaxMinOcc(QAC_Rules,item._attributes.msgId).min+'...'+getMaxMinOcc(QAC_Rules,item._attributes.msgId).max}}</md-table-cell>
                    <md-table-cell>
                        <span v-if="Array.isArray(item.justification)">
                            <template v-for="just in item.justification">
                                {{just.text._text}}
                            </template>
                        </span>
                        <span v-else>
                            {{item.justification.text?item.justification.text._text:'n/a'}}
                        </span>
                    </md-table-cell>
                    <md-table-cell>{{getQAC_LogMessage_ById(item._attributes.msgId).length}}</md-table-cell>
                </md-table-row>
            </md-table>
        </div> 
        <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
            <md-table md-card>
                <md-table-toolbar>
                    <h1 class="md-title">MISRA RULES</h1>
                </md-table-toolbar>
                <md-table-row>
                    
                    <md-table-head>Rule ID</md-table-head>
                    <md-table-head>Affected configurations</md-table-head>
                    <md-table-head>Occurrences</md-table-head>
                    <md-table-head>Justifications</md-table-head>
                </md-table-row>
                <md-table-row v-for="(item,key) in MISRA_Rules_Cond" :key="key">
                    <md-table-cell>{{item._attributes.msgId}}</md-table-cell>
                    <md-table-cell>{{getMatchingRules(MISRA_Rules,item._attributes.msgId).length}}</md-table-cell>
                    <md-table-cell>{{getMaxMinOcc(MISRA_Rules,item._attributes.msgId).min+'...'+getMaxMinOcc(MISRA_Rules,item._attributes.msgId).max}}</md-table-cell>
                    <md-table-cell v-if="'message' in item">
                        <template v-if="Array.isArray(item.message)">
                            <template v-for="(itex,kex) in item.message">
                                <span :key="kex" v-if="!itex.justification">
                                    <span v-if="itex._attributes.file==='multi-homed'||itex._attributes.file==='cma'"></span>
                                    <span style="background-color:yellow;" v-else>Unjustified occurrences of msg {{item._attributes.msgId}}</span>
                                </span>
                                <template v-else-if="Array.isArray(itex.justification)">
                                    <span v-for="(itey,kem) in itex.justification" :key="kem">{{itey.text._text}},</span>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            <span v-if="getjustificationCount(item.message)===0">
                                <span v-if="item.message._attributes.file==='multi-homed'||item.message._attributes.file==='cma'"></span>
                                <span style="background-color:yellow;" v-else>Unjustified occurrences of msg {{item.message._attributes.msgId}}</span>
                            </span>
                            <template v-else-if="Array.isArray(item.message.justification)">
                                <span v-for="(itey,kem) in item.message.justification" :key="kem">{{itey.text._text}},</span>
                            </template>
                            <template v-else>
                                <span>{{item.message.justification.text?item.message.justification.text._text:''}}</span>
                            </template>
                        </template>
                    </md-table-cell>
                    <md-table-cell v-else></md-table-cell>
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
          this.TestRuns_QACSummary.forEach(elt=>{
              if('log_QACSummary' in elt){
                  elt.log_QACSummary.mcm.map(elmt=>{
                      var obj = {}
                      obj=elmt
                      obj.version = elt.log_QACSummary._attributes?elt.log_QACSummary._attributes.version:'0'

                      return obj
                  })
                  rules.push(...elt.log_QACSummary.mcm)
              }
          })
            
          return rules
      },
      MISRA_Rules_Cond(){
         var rules=Object.values(
                this.MISRA_Rules.reduce((a, b) => {
                    if (!a[b._attributes.msgId]) a[b._attributes.msgId] = b 
                    return a
                }, {})
            )
            console.log('MISRA_Rules_Cond', rules)
            return rules
      },
      QAC_Rules(){
           var rulesmsg = []
          this.TestRuns_QACSummary.forEach(elt=>{
              if('log_QACSummary' in elt){
                  elt.log_QACSummary.mcm.forEach(elmt=>{
                        if(('message' in elmt)&&Array.isArray(elmt.message)){
                            elmt.message.map(elmtt=>{
                                var obj = {}
                                obj=elmtt
                                obj.version = elmt.version
                                obj.msgId = elmt._attributes.msgId
                                return obj
                            })

                            rulesmsg.push(...elmt.message)
                        }else if(('message' in elmt)){
                            var obj = {}
                            obj = elmt.message
                            obj.version = elmt.version
                            obj.msgId = elmt._attributes.msgId
                            rulesmsg.push(elmt.message)
                        }
                  })
              }
          })
        
          return rulesmsg
      },
      QAC_Rules_Cond(){
         var rules=Object.values(
                this.QAC_Rules.reduce((a, b) => {
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
      getMaxMinOcc(rules,currid){
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
            var match = {
                min:0,
                max:0
            }

            match.min = MatchingRules[0]._attributes.occurence
            match.max = MatchingRules[MatchingRules.length-1]._attributes.occurence
              return match

          }
          else{
              return MatchingRules
          }
      },
      getjustificationCount(msg){
          var count = []
          if('justification' in msg){
            if(Array.isArray(msg.justification)){
                msg.justification.forEach(elt=>{
                    count.push(parseInt(elt._attributes.count))
                })
            }
            else{
                count.push(parseInt(msg.justification._attributes.count))
            }

            return count.reduce((acc,curr)=>acc+curr)
          }else{
            return 0
          }
          
      },
      getAffectectedTestruns(currid){
          var AffectedTestruns = []
          this.TestRuns_QACSummary.forEach(elt=>{
              if('log_QACSummary' in elt){
                  elt.log_QACSummary.mcm.forEach(elmt=>{
                     if(('message' in elmt)&&Array.isArray(elmt.message)){
                            elmt.message.forEach(elmtt=>{
                                if(elmtt._attributes.msgId===currid){
                                   // if(AffectedTestruns.find(affected=>{return affected.testcase_attr===elt.testcase_attr})==="undefined"){
                                        AffectedTestruns.push(elt)
                                  //  }
                                }
                            })
                        }else if(('message' in elmt)){
                            if(elmt.message._attributes.msgId===currid){
                               // if(AffectedTestruns.find(affected=>{return affected.testcase_attr===elt.testcase_attr})==="undefined"){
                                        AffectedTestruns.push(elt)
                               //     }
                            }
                        }
                  })
              }
          })
          return AffectedTestruns
      },
      getQAC_LogMessage_ById(id){
          var QAC_logMessage = []
          this.TestRuns_QACSummary.forEach(testrun=>{
              if('log_build' in testrun){
                  if(testrun.log_build._attributes.type==='QAC'){
                      if('message' in testrun.log_build){
                        if(Array.isArray(testrun.log_build.message)){
                            QAC_logMessage.push(...testrun.log_build.message.filter(msg=>{return msg._attributes.number===id}))
                        }else{
                            if(testrun.log_build.message._attributes.number===id){
                                QAC_logMessage.push(testrun.log_build.message)
                            }
                        }
                      }
                  }
              }
          })
          return QAC_logMessage
      }

  },
  mounted(){
     this.getResultCompliance()
     console.log('qac rules', this.QAC_Rules_Cond)
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
