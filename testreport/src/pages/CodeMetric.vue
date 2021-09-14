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
                    <md-table-head>Configuration reference</md-table-head>
                    <md-table-head>Date</md-table-head>
                    <md-table-head>Tester</md-table-head>
                    <md-table-head style="width:3%;text-align:center;">Result</md-table-head>
                </md-table-row>
                <md-table-row v-for="(item,key) in TestRuns_QACSummary" :key="key">
                    <md-table-cell>{{getConfig(item._attributes.parameter)!==null?getConfig(item._attributes.parameter)[1]:''}}</md-table-cell>
                    <md-table-cell>{{item._attributes.date}}</md-table-cell>
                    <md-table-cell>{{item._attributes.executor}}</md-table-cell>
                    <md-table-cell :style="'text-align:center;background-color:'+(getTestRunResult(item)==='FAIL*'||getTestRunResult(item)==='WARN*'||getTestRunResult(item)==='PROCESSERROR*'?'green':(getTestRunResult(item)==='FAIL'?'red;':(getTestRunResult(item)==='WARN'?'yellow':'#00FF00;')))">{{getTestRunResult(item)}}</md-table-cell>
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
                    <md-table-cell  data-toggle="tooltip" :title="'COCOMO embedded programmer months'" >BME</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >BMO</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >BMS</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >BUG</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'comment to code ratio'" >CDN</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >DEV</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'rogram difficulty'" >DIF</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >ECT</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >EFF</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >FCO</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of function definitions'" >FNC</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >HAL</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >M20</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >M21</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of statements'" >M22</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of non-header comments'" >M28</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >M33</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >OPN</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'Teste \n a la lign'" >OPT</md-table-cell>
                </md-table-row>
                <md-table-row>
                    <md-table-cell>Metrics Abreviations</md-table-cell>
                    <md-table-cell><span data-tooltip="test">BME</span></md-table-cell>
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
                    <md-table-cell  data-toggle="tooltip" :title="'estimated static path count (1..80)'" >PTH</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'cyclomatic complexity (1..10)'" >CYC</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of distinct function calls (0..7)'" >CAL</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of function parameters (0..5)'" >PAR</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'maximum nesting of contro! structures (0..4)'" >MIF</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of backward jumps (0)'" >BAK</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of GOTOs (0) {decomposition threshold: 6)'" >GTO</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of exit points (0..1)'" >M19</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of function return points (0..1)'" >RET</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of statements in function (variant 3) (1..50)'" >ST3</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'average size of function statements'" >AV1</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'knot count'" >KNT</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of local variables declared'" >LCT</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of maintainable lines of code'" >LIN</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'essential cyclomatic complexity'" >MOQ7</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of functions calling this function'" >M29</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of function calls'" >SUB</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of unreachable statements'" >UNR</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of unused and non-reused variables'" >UNV</md-table-cell>
                    <md-table-cell  data-toggle="tooltip" :title="'number of executable lines'" >XLN</md-table-cell>
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
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'PTH'),1,80,80)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'CYC'),1,10,20)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'CAL'),0,7)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'PAR'),0,5)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'MIF'),0,4,6)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'BAK'),0,0)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'GTO'),0,0)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'M19'),0,1)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'RET'),0,1)"></md-table-cell>
                    <md-table-cell v-html="GetMinMaxInfo(filters(functions,'ST3'),1,50)"></md-table-cell>
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
                        <md-table-cell><span :style="'background-color:'+(item.PTH.max>80?'#33BCFF':(item.PTH.max>80?'#CCEEFF':''))" >{{item.PTH?(item.PTH.min===item.PTH.max?item.PTH.min:item.PTH.min+'...'+item.PTH.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.CYC.max>20?'#33BCFF':(item.CYC.max>10?'#CCEEFF':''))" >{{item.CYC?(item.CYC.min===item.CYC.max?item.CYC.min:item.CYC.min+'...'+item.CYC.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.CAL.max>10000000?'#33BCFF':(item.CAL.max>7?'#CCEEFF':''))" >{{item.CAL?(item.CAL.min===item.CAL.max?item.CAL.min:item.CAL.min+'...'+item.CAL.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.PAR.max>10000000?'#33BCFF':(item.PAR.max>5?'#CCEEFF':''))" >{{item.PAR?(item.PAR.min===item.PAR.max?item.PAR.min:item.PAR.min+'...'+item.PAR.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.MIF.max>6?'#33BCFF':(item.MIF.max>4?'#CCEEFF':''))" >{{item.MIF?(item.MIF.min===item.MIF.max?item.MIF.min:item.MIF.min+'...'+item.MIF.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.BAK.max>100?'#33BCFF':(item.BAK.max>0?'#CCEEFF':''))" >{{item.BAK?(item.BAK.min===item.BAK.max?item.BAK.min:item.BAK.min+'...'+item.BAK.max):'n/a'}}</span></md-table-cell>

                        <md-table-cell><span :style="'background-color:'+(item.GTO.max>0?'#33BCFF':(item.GTO.max>0?'#CCEEFF':''))" >{{item.GTO?(item.GTO.min===item.GTO.max?item.GTO.min:item.GTO.min+'...'+item.GTO.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.M19.max>10?'#33BCFF':(item.M19.max>1?'#CCEEFF':''))" >{{item.M19?(item.M19.min===item.M19.max?item.M19.min:item.M19.min+'...'+item.M19.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.RET.max>10000000?'#33BCFF':(item.RET.max>1?'#CCEEFF':''))" >{{item.RET?(item.RET.min===item.RET.max?item.RET.min:item.RET.min+'...'+item.RET.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.ST3.max>10000000?'#33BCFF':(item.ST3.max>50?'#CCEEFF':''))" >{{item.ST3?(item.ST3.min===item.ST3.max?item.ST3.min:item.ST3.min+'...'+item.ST3.max):'n/a'}}</span></md-table-cell>

                        <md-table-cell><span :style="'background-color:'+(item.AV1.max>10000000?'#33BCFF':(item.AV1.max>1000000?'#CCEEFF':''))" >{{item.AV1?(item.AV1.min===item.AV1.max?item.AV1.min:item.AV1.min+'...'+item.AV1.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.KNT.max>10000000?'#33BCFF':(item.KNT.max>1000000?'#CCEEFF':''))" >{{item.KNT?(item.KNT.min===item.KNT.max?item.KNT.min:item.KNT.min+'...'+item.KNT.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.LCT.max>10000000?'#33BCFF':(item.LCT.max>1000000?'#CCEEFF':''))" >{{item.LCT?(item.LCT.min===item.LCT.max?item.LCT.min:item.LCT.min+'...'+item.LCT.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.LIN.max>10000000?'#33BCFF':(item.LIN.max>1000000?'#CCEEFF':''))" >{{item.LIN?(item.LIN.min===item.LIN.max?item.LIN.min:item.LIN.min+'...'+item.LIN.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.M07.max>10000000?'#33BCFF':(item.M07.max>1000000?'#CCEEFF':''))" >{{item.M07?(item.M07.min===item.M07.max?item.M07.min:item.M07.min+'...'+item.M07.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.M29.max>10000000?'#33BCFF':(item.M29.max>1000000?'#CCEEFF':''))" >{{item.M29?(item.M29.min===item.M29.max?item.M29.min:item.M29.min+'...'+item.M29.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.SUB.max>10000000?'#33BCFF':(item.SUB.max>1000000?'#CCEEFF':''))" >{{item.SUB?(item.SUB.min===item.SUB.max?item.SUB.min:item.SUB.min+'...'+item.SUB.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.UNR.max>10000000?'#33BCFF':(item.UNR.max>1000000?'#CCEEFF':''))" >{{item.UNR?(item.UNR.min===item.UNR.max?item.UNR.min:item.UNR.min+'...'+item.UNR.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.UNV.max>10000000?'#33BCFF':(item.UNV.max>1000000?'#CCEEFF':''))" >{{item.UNV?(item.UNV.min===item.UNV.max?item.UNV.min:item.UNV.min+'...'+item.UNV.max):'n/a'}}</span></md-table-cell>
                        <md-table-cell><span :style="'background-color:'+(item.XLN.max>10000000?'#33BCFF':(item.XLN.max>1000000?'#CCEEFF':''))" >{{item.XLN?(item.XLN.min===item.XLN.max?item.XLN.min:item.XLN.min+'...'+item.XLN.max):'n/a'}}</span></md-table-cell>
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
            if(criteria in elt){
                datas.push(elt[criteria]._text)
            }
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
            if(result.max > RangeMax){
                bgcolor = '#CCEEFF'
            }
            if(result.max > RangeMaxMax){
                bgcolor = '#33BCFF'
            }
            

            if(result.min===result.max){
                display = `<span style="background-color:${bgcolor}">${result.min}</span>`
            }
            else{
                display = `<span style="background-color:${bgcolor}">${result.min} ... ${result.max}</span>`
            }

            return display

        }
    },
    getConfig(parameter){
        return parameter.match(new RegExp("config=(.*)"))
    },
    getsimpleResult(result){
        if(result.includes('FAIL')){
            return 'FAIL'
        }
        else if(result.includes('WARN')){
            return 'WARN'
        }
        else if(result.includes('processError')){
            return 'PROCESSERROR'
        }
        else if(result.includes('OK.N/A')){
            return 'OK.N/A'
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
            return 'OK.N/A'
        }
        else if(result.toLowerCase().includes('processerror')){
            return 'processError'
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
  [data-tooltip] {
    position: relative;
    z-index: 9999999999999;
    cursor: default;
  }
  [data-tooltip]:before,
  [data-tooltip]:after {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  }

          /* Position tooltip above the element */
  [data-tooltip]:before {
    position: absolute;
    bottom: 150%;
    left: 50%;
    margin-bottom: 5px;
    margin-left: -5px;
    padding: 7px;
    width: 150px;
    min-width:50px;
    -webkit-border-radius: 3px;
    -moz-border-radius:    3px;
    border-radius:         3px;
    background-color: #181818;
    color: rgb(255, 255, 255);
    content: attr(data-tooltip);
    text-align: left;
    white-space: normal;
    font-size: 10pt;
    line-height: 1.2;
  }
  [data-tooltip]:after {
    position: absolute;
    bottom: 150%;
    left: 50%;
    width: 0;
    border-top: 5px solid #ffffff;
    border-top: 5px solid rgba(255, 255, 255, 0.98);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  }

  
</style>
