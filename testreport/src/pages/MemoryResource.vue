<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
        <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
            <md-table md-card>
                <md-table-toolbar>
                    <h1 class="md-title">Memory resource</h1>
                        <h2 class="md-subhead">Memory resources were measured {{TestRuns_MemoryResources.length}}</h2>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head>Module</md-table-head>
                    <md-table-head>CODE</md-table-head>
                    <md-table-head>CONST</md-table-head>
                    <md-table-head>RAM</md-table-head>
                    <md-table-head>IRAM</md-table-head>
                </md-table-row>
                <md-table-row>
                    <md-table-cell colspan="5" style="background-color:grey;color:white">VisualStudio</md-table-cell>
                </md-table-row>
                <md-table-row v-for="(modul,key) in filtersUniqueCompiler('VisualStudio')" :key="key">
                    <md-table-cell>{{modul.name}}</md-table-cell>
                    <md-table-cell>{{modul.code.min+'...'+modul.code.max}}</md-table-cell>
                    <md-table-cell>{{modul.const.min+'...'+modul.const.max}}</md-table-cell>
                    <md-table-cell>{{modul.ram.min+'...'+modul.ram.max}}</md-table-cell>
                    <md-table-cell>{{modul.iram.min+'...'+modul.iram.max}}</md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell colspan="5" style="background-color:grey;color:white">GreenHills (SpeedOptim)</md-table-cell>
                </md-table-row>
                <md-table-row v-for="(modul,key) in filtersUniqueCompiler('GreenHills')" :key="key">
                    <md-table-cell>{{modul.name}}</md-table-cell>
                    <md-table-cell>{{modul.code.min+'...'+modul.code.max}}</md-table-cell>
                    <md-table-cell>{{modul.const.min+'...'+modul.const.max}}</md-table-cell>
                    <md-table-cell>{{modul.ram.min+'...'+modul.ram.max}}</md-table-cell>
                    <md-table-cell>{{modul.iram.min+'...'+modul.iram.max}}</md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell colspan="5" style="background-color:grey;color:white">Cosmic</md-table-cell>
                </md-table-row>
                <md-table-row v-for="(modul,key) in filtersUniqueCompiler('Cosmic')" :key="key">
                    <md-table-cell>{{modul.name}}</md-table-cell>
                    <md-table-cell>{{modul.code.min+'...'+modul.code.max}}</md-table-cell>
                    <md-table-cell>{{modul.const.min+'...'+modul.const.max}}</md-table-cell>
                    <md-table-cell>{{modul.ram.min+'...'+modul.ram.max}}</md-table-cell>
                    <md-table-cell>{{modul.iram.min+'...'+modul.iram.max}}</md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell colspan="5" style="background-color:grey;color:white">DiabData</md-table-cell>
                </md-table-row>
                <md-table-row v-for="(modul,key) in filtersUniqueCompiler('DiabData')" :key="key">
                    <md-table-cell>{{modul.name}}</md-table-cell>
                    <md-table-cell>{{modul.code.min+'...'+modul.code.max}}</md-table-cell>
                    <md-table-cell>{{modul.const.min+'...'+modul.const.max}}</md-table-cell>
                    <md-table-cell>{{modul.ram.min+'...'+modul.ram.max}}</md-table-cell>
                    <md-table-cell>{{modul.iram.min+'...'+modul.iram.max}}</md-table-cell>
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
        TestRuns_MemoryResources:[],
        log_MemoryResources:[]
    }
  },
  computed:{
      
    },
  methods:{
      getResultCompliance(){
          this.$store.state.testCases.forEach(elt=>{
              if('testrun' in elt){
                  if(Array.isArray(elt.testrun)){
                      elt.testrun.forEach(testrun=>{
                          if('log_MemoryResources' in testrun){
                              this.TestRuns_MemoryResources.push(testrun)
                          }
                      })
                  }else{
                    if('log_MemoryResources' in elt.testrun){
                            this.TestRuns_MemoryResources.push(elt.testrun)
                        }
                  }
              }
          })

          this.TestRuns_MemoryResources.forEach(elt=>{
              if('log_MemoryResources' in elt){
                  if(Array.isArray(elt.log_MemoryResources)){
                      this.log_MemoryResources.push(...elt.log_MemoryResources)
                  }else{
                      this.log_MemoryResources.push(elt.log_MemoryResources)
                  }
              }
          })

          console.log('log_MemoryResources',this.log_MemoryResources)
          console.log('TestRuns_MemoryResources',this.TestRuns_MemoryResources)
    
      },
      getCompilerModule(compiler){
          var modules = []
          console.log('log_memoryresources',this.log_MemoryResources)
          this.log_MemoryResources.forEach(log=>{
              if('compiler' in log._attributes && log._attributes.compiler===compiler){
                  if('module' in log && Array.isArray(log.module)){
                      modules.push(...log.module)
                  }
                  else if ('module' in log ){
                      modules.push(log.module)
                  }
              }
          })
          return modules
      },
      filtersUniqueCompiler(compiler){
          var modules = this.getCompilerModule(compiler)
          console.log('modules',this.getCompilerModule(compiler))
          var uModules = []

          modules.forEach(mod=>{
              var resultSingleFilter = uModules.filter(ely=>{return ely.name===mod._attributes.name}).length===0
              console.log('resultfilter',resultSingleFilter)
              var criterias = Object.keys(mod)
              if(resultSingleFilter){
                  var obj = {}
                  criterias.forEach(criteria=>{
                    obj[criteria] = {
                        min:parseFloat(mod[criteria]._text),
                        max:parseFloat(mod[criteria]._text)
                    }
                  })
                    obj.name = mod._attributes.name
                  uModules.push(obj)
                  
              }
              else{
                uModules.map(eltt=>{
                    if(eltt.name===mod._attributes.name){
                         criterias.forEach(criteria=>{
                            if(eltt[criteria].min > parseFloat(mod[criteria]._text)) {
                                eltt[criteria].min = parseFloat(mod[criteria]._text)
                            }
                            if(eltt[criteria].max < parseFloat(mod[criteria]._text)){
                                eltt[criteria].max = parseFloat(mod[criteria]._text)
                            }
                        })
                    }
                })
              }
          })
            console.log('umodule',uModules);
          return uModules;
      },
      filters(bigdata,criteria){
          var datas = []
          if(Array.isArray(bigdata)){
            bigdata.forEach(elt=>{
                datas.push(elt[criteria]._text)
            })
          }
          return datas
      },
      GetMinMaxInfo(path,RangeMin=0,RangeMax=1000000000,RangeMaxMax=1000000000,RangeMinCheck='LessThan'){
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

              var display = ''
              var bgcolor = ''

              if((RangeMinCheck === 'LessThan')&&(result.min < RangeMin)){
                  bgcolor = '#CCEEFF'
              }
              if((RangeMinCheck === 'LessThanOrEqual')&&(result.min <= RangeMin)){
                  bgcolor = '#CCEEFF'
              }
              if(result.max > RangeMaxMax){
                  bgcolor = '#33BCFF'
              }
              if(result.max > RangeMax){
                  bgcolor = '#CCEEFF'
              }

              if(result.min===result.max){
                  display = `<span style="background-color:${bgcolor}">${result.min}</span>`
              }
              else{
                  display = `<span style="background-color:${bgcolor}">${result.min} ... ${result.max}</span>`
              }

              return display

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
