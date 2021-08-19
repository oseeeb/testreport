<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
       <md-table md-card>
           <md-table-toolbar>
               <h2>TestConfiguration</h2>
           </md-table-toolbar>
            <md-table-row class="tLegend">
                <td>TestConfig</td>
                <td>SafetyLevel</td>
                <td>Functional</td>
                <td>MISRA</td>
                <td>Coverage(C/DC)</td>
                <td>Overall</td>
                <td>Result</td>
            </md-table-row>
            <template v-for="(path,key) in paths">
                <md-table-row colspan="7" :key="key">
                    {{path}}
                </md-table-row>
                <md-table-row v-for="(config,kex) in filteredConfigs(path)" :key="(kex+testconfigs.length)">   
                  <md-table-cell>{{config}}</md-table-cell>                 
                </md-table-row>
            </template>

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
      console.log('test confg', this.paths)
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
