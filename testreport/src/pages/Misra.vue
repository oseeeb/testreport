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
        <div v-if="TestRuns_QACSummary.length!==0" class="md-layout-item md-xlarge-size-75 md-large-size-75 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
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
