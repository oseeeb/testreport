<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
        <md-table md-card>
            <md-table-row>
                <md-table-head style="width:20%;">TestCase ID</md-table-head>
                <md-table-head style="width:20%;">Result</md-table-head>
                <md-table-head style="width:20%;">Justification</md-table-head>
            </md-table-row>
            <md-table-row v-for="(item,key) in testCasesWithJustification" :key="key">
                <md-table-cell>{{item.id}}</md-table-cell>
                <md-table-cell>{{item.result}}</md-table-cell>
                <md-table-cell>{{item.justification}}</md-table-cell>
            </md-table-row>
        </md-table>
      </div> 
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      testCasesWithJustification:[]
    }
  },
  mounted(){
    let TestCaseJustification = new Set()
    for (const testCase of this.$store.state.testCases) {
        if ('testrun' in testCase) {
            if(Array.isArray(testCase.testrun)){
                for(const testrun of testCase.testrun){
                    if ('justification' in testrun) {
                        TestCaseJustification.add(testCase)
                    }
                }
            }else{
                if ('justification' in testCase.testrun) {
                        TestCaseJustification.add(testCase)
                    }
            }
        }
    }
    console.log(TestCaseJustification)
    for (const testCase of TestCaseJustification) {
        let testCasebuff = {}
        
        testCasebuff.id = testCase._attributes.id
        if(Array.isArray(testCase.testrun)){
            testCase.testrun.forEach(elt=>{
                if('justification' in elt){        
                    testCasebuff.result = elt.result._text
                    testCasebuff.justification = elt.justification.text._text
                }
            })
        }else{
            testCasebuff.result = testCase.testrun.result._text
            testCasebuff.justification = testCase.testrun.justification.text._text
        }
         this.testCasesWithJustification.push(testCasebuff)
    }
    

    console.log(TestCaseJustification)
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
