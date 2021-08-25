<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
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
                    <h1 class="md-title">Code Metrics</h1>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-cell>Metrics Abreviations</md-table-cell>
                    <md-table-cell>BME</md-table-cell>
                    <md-table-cell>BMO</md-table-cell>
                    <md-table-cell>BMS</md-table-cell>
                    <md-table-cell>BUG</md-table-cell>
                    <md-table-cell>CDN</md-table-cell>
                    <md-table-cell>DEV</md-table-cell>
                    <md-table-cell>DIF</md-table-cell>
                    <md-table-cell>ECT</md-table-cell>
                    <md-table-cell>EFF</md-table-cell>
                    <md-table-cell>FCO</md-table-cell>
                    <md-table-cell>FNC</md-table-cell>
                    <md-table-cell>HAL</md-table-cell>
                    <md-table-cell>M20</md-table-cell>
                    <md-table-cell>M21</md-table-cell>
                    <md-table-cell>M22</md-table-cell>
                    <md-table-cell>M28</md-table-cell>
                    <md-table-cell>M33</md-table-cell>
                    <md-table-cell>OPN</md-table-cell>
                    <md-table-cell>OPT</md-table-cell>
                    <md-table-cell>SCT</md-table-cell>
                    <md-table-cell>SHN</md-table-cell>
                    <md-table-cell>TDE</md-table-cell>
                    <md-table-cell>TDO</md-table-cell>
                    <md-table-cell>TDS</md-table-cell>
                    <md-table-cell>TLN</md-table-cell>
                    <md-table-cell>TOT</md-table-cell>
                    <md-table-cell>TPP</md-table-cell>
                    <md-table-cell>VAR</md-table-cell>
                    <md-table-cell>VOL</md-table-cell>
                    <md-table-cell>ZIP</md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell>Allowed Range</md-table-cell>
                    <md-table-cell>BME</md-table-cell>
                    <md-table-cell>BMO</md-table-cell>
                    <md-table-cell>BMS</md-table-cell>
                    <md-table-cell>BUG</md-table-cell>
                    <md-table-cell>1...20</md-table-cell>
                    <md-table-cell>DEV</md-table-cell>
                    <md-table-cell>DIF</md-table-cell>
                    <md-table-cell>ECT</md-table-cell>
                    <md-table-cell>EFF</md-table-cell>
                    <md-table-cell>FCO</md-table-cell>
                    <md-table-cell>FNC</md-table-cell>
                    <md-table-cell>HAL</md-table-cell>
                    <md-table-cell>M20</md-table-cell>
                    <md-table-cell>M21</md-table-cell>
                    <md-table-cell>M22</md-table-cell>
                    <md-table-cell>M28</md-table-cell>
                    <md-table-cell>M33</md-table-cell>
                    <md-table-cell>OPN</md-table-cell>
                    <md-table-cell>OPT</md-table-cell>
                    <md-table-cell>SCT</md-table-cell>
                    <md-table-cell>SHN</md-table-cell>
                    <md-table-cell>TDE</md-table-cell>
                    <md-table-cell>TDO</md-table-cell>
                    <md-table-cell>TDS</md-table-cell>
                    <md-table-cell>TLN</md-table-cell>
                    <md-table-cell>TOT</md-table-cell>
                    <md-table-cell>TPP</md-table-cell>
                    <md-table-cell>VAR</md-table-cell>
                    <md-table-cell>VOL</md-table-cell>
                    <md-table-cell>ZIP</md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell>Mesured Values</md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'BME'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'BMO'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'BMS'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'BUG'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'CDN'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'BME'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'DIF'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'ECT'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'EFF'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'FCO'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'FNC'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'HAL'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'M20'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'M21'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'M22'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'M28'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'M33'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'OPN'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'OPT'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'SCT'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'SHN'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'TDE'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'TDO'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'TDS'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'TLN'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'TOT'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'TPP'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'VAR'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'VOL'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(files,'ZIP'),1,20)"></md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell colspan="31">Files</md-table-cell>
                </md-table-row>
                <template v-for="(item,key) in condFiles">
                    <md-table-row :key="key">
                        <md-table-cell>{{item.name}}</md-table-cell>
                        <md-table-cell>{{item.BME}}</md-table-cell>
                        <md-table-cell>{{item.BMO}}</md-table-cell>
                        <md-table-cell>{{item.BMS}}</md-table-cell>
                        <md-table-cell>{{item.BUG}}</md-table-cell>
                        <md-table-cell>{{item.CDN}}</md-table-cell>
                        <md-table-cell>{{item.DEV}}</md-table-cell>
                        <md-table-cell>{{item.DIF}}</md-table-cell>
                        <md-table-cell>{{item.ECT}}</md-table-cell>
                        <md-table-cell>{{item.EFF}}</md-table-cell>
                        <md-table-cell>{{item.FCO}}</md-table-cell>
                        <md-table-cell>{{item.FNC}}</md-table-cell>
                        <md-table-cell>{{item.HAL}}</md-table-cell>
                        <md-table-cell>{{item.M20}}</md-table-cell>
                        <md-table-cell>{{item.M21}}</md-table-cell>
                        <md-table-cell>{{item.M22}}</md-table-cell>
                        <md-table-cell>{{item.M28}}</md-table-cell>
                        <md-table-cell>{{item.M33}}</md-table-cell>
                        <md-table-cell>{{item.OPN}}</md-table-cell>
                        <md-table-cell>{{item.OPT}}</md-table-cell>
                        <md-table-cell>{{item.SCT}}</md-table-cell>
                        <md-table-cell>{{item.SHN}}</md-table-cell>
                        <md-table-cell>{{item.TDE}}</md-table-cell>
                        <md-table-cell>{{item.TDO}}</md-table-cell>
                        <md-table-cell>{{item.TDS}}</md-table-cell>
                        <md-table-cell>{{item.TLN}}</md-table-cell>
                        <md-table-cell>{{item.TOT}}</md-table-cell>
                        <md-table-cell>{{item.TPP}}</md-table-cell>
                        <md-table-cell>{{item.VAR}}</md-table-cell>
                        <md-table-cell>{{item.VOL}}</md-table-cell>
                        <md-table-cell>{{item.ZIP}}</md-table-cell>
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
        TestRuns_QACSummary:[],
        log_QACMetrics:[],
        files:[],
        functions:[],
        condFiles:[]
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
                          if('log_QACSummary' in testrun){
                              this.TestRuns_QACSummary.push(testrun)
                          }
                      })
                  }else{
                    if('log_QACSummary' in elt.testrun){
                            this.TestRuns_QACSummary.push(elt.testrun)
                        }
                  }
              }
          })

          this.TestRuns_QACSummary.forEach(elt=>{
              if('log_QACMetrics' in elt){
                  if(Array.isArray(elt.log_QACMetrics)){
                      this.log_QACMetrics.push(...elt.log_QACMetrics)
                  }else{
                      this.log_QACMetrics.push(elt.log_QACMetrics)
                  }
              }
          })

          this.log_QACMetrics.forEach(elt=>{
              if('file' in elt){
                  if(Array.isArray(elt.file)){
                      this.files.push(...elt.file)
                  }else{
                      this.files.push(elt.file)
                  }
              }

              if('function' in elt){
                  if(Array.isArray(elt.function)){
                      this.functions.push(...elt.function)
                  }else{
                      this.functions.push(elt.function)
                  }
              }
          })

          console.log('log files',this.files)
    
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
      filters2(){

          this.files.forEach(elt=>{
              var resultSingleFilter = this.condFiles.filter(ely=>{return ely.name===elt._attributes.name}).length===0
              var criterias = Object.keys(elt)
              criterias.pop()
        
              if(resultSingleFilter){
                  var obj = {}
                  criterias.forEach(criteria=>{
                    obj[criteria] = {
                        min:parseInt(elt[criteria]._text),
                        max:parseInt(elt[criteria]._text)
                    }
                  })
                    obj.name = elt._attributes.name
                  this.condFiles.push(obj)
                  
              }
              else{
                var file = this.condFiles.find(eltt=>{return eltt.name===elt._attributes.name})
                criterias.forEach(criteria=>{
                    if(file[criteria].min > parseInt(elt[criteria]._text)) {
                        file[criteria].min = parseInt(elt[criteria]._text)
                    }
                    if(file[criteria].max < parseInt(elt[criteria]._text)){
                        file[criteria].max = parseInt(elt[criteria]._text)
                    }
                })
              }
          })
      },
      GetMinMaxInfo(path,RangeMin=0,RangeMax=1000000000,RangeMaxMax=1000000000,RangeMinCheck='LessThan'){
          if(path.length>0){
              var result = {
                  min:0,
                  max:0,
              }
              path.map(elt=>{
                  return parseInt(elt)
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
     this.filters2()
     console.log('condfle',this.condFiles)
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
