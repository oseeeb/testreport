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
                  <md-table-cell>{{config}}</md-table-cell> 
                  <md-table-cell>{{getquality(config)}}</md-table-cell>                
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
                <md-table-head v-for="(config,kem) in testconfigs" :key="kem">{{config}}</md-table-head>
            </md-table-row>
            <md-table-row v-for="(testcase,ken) in $store.state.testCases" :key="ken">  
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
      return this.testconfigs.filter(elt=>{
        return elt.includes(path)
      })
    },
    getquality(config){
      var testRunsRuntime = []
      this.$store.state.testRuns.forEach(elt=>{
        if(('log_RuntimeCoverage' in elt)&&elt._attributes.config===config){
          testRunsRuntime.push(elt)
        }
      })

      if(testRunsRuntime.length!==0){
        if('parameter' in testRunsRuntime[0]._attributes){
          var quality = testRunsRuntime[0]._attributes.parameter.match(/.*quality=/)
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
        if(testrun.result){
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
    getResultConfig(testcase,config){
      if('testrun' in testcase){
        if(Array.isArray(testcase.testrun)){
          var testrun = testcase.testrun.filter(elt=>{return elt._attributes.config===config})
          if(testrun[0]){
            return this.getTestRunResult(testrun[0])
          }
        }
        else if(testcase.testrun._attributes.config===config){
          return this.getTestRunResult(testcase.testrun)
        }
      }
    }
  },
  mounted(){
    this.testconfigs=[...this.$store.state.testConfigs]
    this.testconfigs.forEach(elt=>{
        var pathelt = elt.split('\\')
        console.log('path elt', pathelt)
        pathelt.pop()
        this.paths.push(pathelt.join('\\'))
    })
    this.paths = [...(new Set(this.paths))]
    
    console.log(this.testconfigs)

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
