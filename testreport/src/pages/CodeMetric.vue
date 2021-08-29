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
                    <h1 class="md-title">Code Metrics</h1>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-cell>Metrics Abreviations</md-table-cell>
                    <md-table-cell>BME</md-table-cell>
                    <md-table-cell>BMO</md-table-cell>
                    <md-table-cell>BMS</md-table-cell>
                    <md-table-cell>BUG</md-table-cell>
                    <md-table-cell>1..20</md-table-cell>
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
                </md-table-row>
                <md-table-row>
                    <md-table-cell>Metrics Abreviations</md-table-cell>
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
                </md-table-row>
                <md-table-row>
                    <md-table-cell colspan="21" :style="'width:20%;background-color:grey;color:white;font-weight:bold'">Files</md-table-cell>
                </md-table-row>
                <template v-for="(item,key) in condFiles">
                    <md-table-row :key="key">
                        <md-table-cell>{{item.name}}</md-table-cell>
                        <md-table-cell>{{item.BME.min===item.BME.max?item.BME.min:item.BME.min+'...'+item.BME.max}}</md-table-cell>
                        <md-table-cell>{{item.BMO.min===item.BMO.max?item.BMO.min:item.BMO.min+'...'+item.BMO.max}}</md-table-cell>
                        <md-table-cell>{{item.BMS.min===item.BMS.max?item.BMS.min:item.BMS.min+'...'+item.BMS.max}}</md-table-cell>
                        <md-table-cell>{{item.BUG.min===item.BUG.max?item.BUG.min:item.BUG.min+'...'+item.BUG.max}}</md-table-cell>
                        <md-table-cell>{{item.CDN.min===item.CDN.max?item.CDN.min:item.CDN.min+'...'+item.CDN.max}}</md-table-cell>
                        <md-table-cell>{{item.DEV.min===item.DEV.max?item.DEV.min:item.DEV.min+'...'+item.DEV.max}}</md-table-cell>
                        <md-table-cell>{{item.DIF.min===item.DIF.max?item.DIF.min:item.DIF.min+'...'+item.DIF.max}}</md-table-cell>
                        <md-table-cell>{{item.ECT.min===item.ECT.max?item.ECT.min:item.ECT.min+'...'+item.ECT.max}}</md-table-cell>
                        <md-table-cell>{{item.EFF.min===item.EFF.max?item.EFF.min:item.EFF.min+'...'+item.EFF.max}}</md-table-cell>
                        <md-table-cell>{{item.FCO.min===item.FCO.max?item.FCO.min:item.FCO.min+'...'+item.FCO.max}}</md-table-cell>
                        <md-table-cell>{{item.FNC.min===item.FNC.max?item.FNC.min:item.FNC.min+'...'+item.FNC.max}}</md-table-cell>
                        <md-table-cell>{{item.HAL.min===item.HAL.max?item.HAL.min:item.HAL.min+'...'+item.HAL.max}}</md-table-cell>
                        <md-table-cell>{{item.M20.min===item.M20.max?item.M20.min:item.M20.min+'...'+item.M20.max}}</md-table-cell>
                        <md-table-cell>{{item.M21.min===item.M21.max?item.M21.min:item.M21.min+'...'+item.M21.max}}</md-table-cell>
                        <md-table-cell>{{item.M22.min===item.M22.max?item.M22.min:item.M22.min+'...'+item.M22.max}}</md-table-cell>
                        <md-table-cell>{{item.M28.min===item.M28.max?item.M28.min:item.M28.min+'...'+item.M28.max}}</md-table-cell>
                        <md-table-cell>{{item.M33.min===item.M33.max?item.M33.min:item.M33.min+'...'+item.M33.max}}</md-table-cell>
                        <md-table-cell>{{item.OPN.min===item.OPN.max?item.OPN.min:item.OPN.min+'...'+item.OPN.max}}</md-table-cell>
                        <md-table-cell>{{item.OPT.min===item.OPT.max?item.OPT.min:item.OPT.min+'...'+item.OPT.max}}</md-table-cell>
                    </md-table-row>
                </template>
            </md-table>
        </div>
        <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
            <md-table md-card>
                <md-table-toolbar>
                    <h1 class="md-title">Function Metrics</h1>
                </md-table-toolbar>
                 <md-table-row>
                    <md-table-cell></md-table-cell>
                    <md-table-cell colspan="6">Supervised metrics</md-table-cell>
                    <md-table-cell colspan="4">Info-only metrics</md-table-cell>
                    <md-table-cell colspan="10">Measured-only metrics</md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell>Metrics Abreviations</md-table-cell>
                    <md-table-cell>PTH</md-table-cell>
                    <md-table-cell>CYC</md-table-cell>
                    <md-table-cell>CAL</md-table-cell>
                    <md-table-cell>PAR</md-table-cell>
                    <md-table-cell>MIF</md-table-cell>
                    <md-table-cell>BAK</md-table-cell>
                    <md-table-cell>GTO</md-table-cell>
                    <md-table-cell>M19</md-table-cell>
                    <md-table-cell>RET</md-table-cell>
                    <md-table-cell>ST3</md-table-cell>
                    <md-table-cell>AV1</md-table-cell>
                    <md-table-cell>KNT</md-table-cell>
                    <md-table-cell>LCT</md-table-cell>
                    <md-table-cell>LIN</md-table-cell>
                    <md-table-cell>M07</md-table-cell>
                    <md-table-cell>M29</md-table-cell>
                    <md-table-cell>SUB</md-table-cell>
                    <md-table-cell>UNR</md-table-cell>
                    <md-table-cell>UNV</md-table-cell>
                    <md-table-cell>XLN</md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell>Allowed Range</md-table-cell>
                    <md-table-cell>1..80 (decomposition threshold: 80)</md-table-cell>
                    <md-table-cell>1..10 (decomposition threshold: 20)</md-table-cell>
                    <md-table-cell>0..7</md-table-cell>
                    <md-table-cell>0..5	</md-table-cell>
                    <md-table-cell>0..4 (decomposition threshold: 6)	</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                    <md-table-cell>0..1</md-table-cell>
                    <md-table-cell>0..1</md-table-cell>
                    <md-table-cell>1..50</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                    <md-table-cell>0</md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell>Mesured Values</md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'PTH'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'CYC'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'CAL'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'PAR'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'MIF'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'BAK'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'GTO'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'M19'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'RET'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'ST3'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'AV1'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'KNT'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'LCT'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'LIN'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'M07'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'M29'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'SUB'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'UNR'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'UNV'),1,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'XLN'),1,20)"></md-table-cell>
                </md-table-row>
                 <md-table-row>
                    <md-table-cell colspan="21" :style="'width:20%;background-color:grey;color:white;font-weight:bold'">Functions (detailed)</md-table-cell>
                </md-table-row>
                 <md-table-row>
                    <md-table-cell>Functions</md-table-cell>
                    <md-table-cell>PTH</md-table-cell>
                    <md-table-cell>CYC</md-table-cell>
                    <md-table-cell>CAL</md-table-cell>
                    <md-table-cell>PAR</md-table-cell>
                    <md-table-cell>MIF</md-table-cell>
                    <md-table-cell>BAK</md-table-cell>
                    <md-table-cell>GTO</md-table-cell>
                    <md-table-cell>M19</md-table-cell>
                    <md-table-cell>RET</md-table-cell>
                    <md-table-cell>ST3</md-table-cell>
                    <md-table-cell>AV1</md-table-cell>
                    <md-table-cell>KNT</md-table-cell>
                    <md-table-cell>LCT</md-table-cell>
                    <md-table-cell>LIN</md-table-cell>
                    <md-table-cell>M07</md-table-cell>
                    <md-table-cell>M29</md-table-cell>
                    <md-table-cell>SUB</md-table-cell>
                    <md-table-cell>UNR</md-table-cell>
                    <md-table-cell>UNV</md-table-cell>
                    <md-table-cell>XLN</md-table-cell>
                </md-table-row>
                <template v-for="(item,key) in condFunct">
                    <md-table-row :key="key">
                        <md-table-cell>{{item.name}}</md-table-cell>
                        <md-table-cell>{{item.PTH.min===item.PTH.max?item.PTH.min:item.PTH.min+'...'+item.PTH.max}}</md-table-cell>
                        <md-table-cell>{{item.CYC.min===item.CYC.max?item.CYC.min:item.CYC.min+'...'+item.CYC.max}}</md-table-cell>
                        <md-table-cell>{{item.CAL.min===item.CAL.max?item.CAL.min:item.CAL.min+'...'+item.CAL.max}}</md-table-cell>
                        <md-table-cell>{{item.PAR.min===item.PAR.max?item.PAR.min:item.PAR.min+'...'+item.PAR.max}}</md-table-cell>
                        <md-table-cell>{{item.MIF.min===item.MIF.max?item.MIF.min:item.MIF.min+'...'+item.MIF.max}}</md-table-cell>
                        <md-table-cell>{{item.BAK.min===item.BAK.max?item.BAK.min:item.BAK.min+'...'+item.BAK.max}}</md-table-cell>

                        <md-table-cell>{{item.GTO.min===item.GTO.max?item.GTO.min:item.GTO.min+'...'+item.GTO.max}}</md-table-cell>
                        <md-table-cell>{{item.M19.min===item.M19.max?item.M19.min:item.M19.min+'...'+item.M19.max}}</md-table-cell>
                        <md-table-cell>{{item.RET.min===item.RET.max?item.RET.min:item.RET.min+'...'+item.RET.max}}</md-table-cell>
                        <md-table-cell>{{item.ST3.min===item.ST3.max?item.ST3.min:item.ST3.min+'...'+item.ST3.max}}</md-table-cell>

                        <md-table-cell>{{item.AV1.min===item.AV1.max?item.AV1.min:item.AV1.min+'...'+item.AV1.max}}</md-table-cell>
                        <md-table-cell>{{item.KNT.min===item.KNT.max?item.KNT.min:item.KNT.min+'...'+item.KNT.max}}</md-table-cell>
                        <md-table-cell>{{item.LCT.min===item.LCT.max?item.LCT.min:item.LCT.min+'...'+item.LCT.max}}</md-table-cell>
                        <md-table-cell>{{item.LIN.min===item.LIN.max?item.LIN.min:item.LIN.min+'...'+item.LIN.max}}</md-table-cell>
                        <md-table-cell>{{item.M07.min===item.M07.max?item.M07.min:item.M07.min+'...'+item.M07.max}}</md-table-cell>
                        <md-table-cell>{{item.M29.min===item.M29.max?item.M29.min:item.M29.min+'...'+item.M29.max}}</md-table-cell>
                        <md-table-cell>{{item.SUB.min===item.SUB.max?item.SUB.min:item.SUB.min+'...'+item.SUB.max}}</md-table-cell>
                        <md-table-cell>{{item.UNR.min===item.UNR.max?item.UNR.min:item.UNR.min+'...'+item.UNR.max}}</md-table-cell>
                        <md-table-cell>{{item.UNV.min===item.UNV.max?item.UNV.min:item.UNV.min+'...'+item.UNV.max}}</md-table-cell>
                        <md-table-cell>{{item.XLN.min===item.XLN.max?item.XLN.min:item.XLN.min+'...'+item.XLN.max}}</md-table-cell>
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
        condFiles:[],
        condFunct:[]
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

          console.log('log functions',this.functions)
    
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
        
              if(resultSingleFilter){
                  var obj = {}
                  criterias.forEach(criteria=>{
                    obj[criteria] = {
                        min:parseFloat(elt[criteria]._text),
                        max:parseFloat(elt[criteria]._text)
                    }
                  })
                    obj.name = elt._attributes.name
                  this.condFiles.push(obj)
                  
              }
              else{
                var file = this.condFiles.find(eltt=>{return eltt.name===elt._attributes.name})
                criterias.forEach(criteria=>{
                    if(file[criteria].min > parseFloat(elt[criteria]._text)) {
                        file[criteria].min = parseFloat(elt[criteria]._text)
                    }
                    if(file[criteria].max < parseFloat(elt[criteria]._text)){
                        file[criteria].max = parseFloat(elt[criteria]._text)
                    }
                })
              }
          })
      },
      filters3(){

          this.functions.forEach(elt=>{
              var resultSingleFilter = this.condFunct.filter(ely=>{return ely.name===elt._attributes.name}).length===0
              var criterias = Object.keys(elt)
        
              if(resultSingleFilter){
                  var obj = {}
                  criterias.forEach(criteria=>{
                    obj[criteria] = {
                        min:parseFloat(elt[criteria]._text),
                        max:parseFloat(elt[criteria]._text)
                    }
                  })
                    obj.name = elt._attributes.name
                  this.condFunct.push(obj)
                  
              }
              else{
                var func = this.condFunct.find(eltt=>{return eltt.name===elt._attributes.name})
                criterias.forEach(criteria=>{
                    if(func[criteria].min > parseFloat(elt[criteria]._text)) {
                        func[criteria].min = parseFloat(elt[criteria]._text)
                    }
                    if(func[criteria].max < parseFloat(elt[criteria]._text)){
                        func[criteria].max = parseFloat(elt[criteria]._text)
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
     this.filters2()
     this.filters3()
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
