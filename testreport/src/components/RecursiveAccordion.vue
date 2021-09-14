<template>
    <div v-if="Array.isArray(testgroupInit)" class="accordion accordion-flush" :id="'accordionFlush-'+sharename+'-'+level">
        <div class="accordion-item"
            v-for="(testgroup,key) in testgroupInit" :key="level+''+key"
        >
            <h2 class="accordion-header" :id="'flush-heading'+key">
              <button :class="'accordion-button collapsed d-flex justify-content-between '+getTestGroupResult(testgroup)+'-result'" type="button"  data-bs-toggle="collapse" :data-bs-target="'#flush-collapse'+(testgroup._attributes?testgroup._attributes.name.replace(/ /g,'_'):'no-name')+'_'+key" aria-expanded="true" :aria-controls="'flush-collapse'+(testgroup._attributes?testgroup._attributes.name.replace(/ /g,'-'):'no-name')+'-'+key">
                <div class="p-2 bd-highlight">{{(testgroup._attributes?testgroup._attributes.name:'no-name')}}</div> 
                <div class="p-2 bd-highlight" :style="'background-color:'+(getTestGroupResult(testgroup)==='WARN*'||getTestGroupResult(testgroup)==='FAIL*'||getTestGroupResult(testgroup)==='PROCESSERROR*'?'green':(getTestGroupResult(testgroup)==='FAIL'||getTestGroupResult(testgroup)==='PROCESSERROR'?'red;':(getTestGroupResult(testgroup)==='WARN'?'yellow;':(getTestGroupResult(testgroup)==='OK'?'#00FF00;':''))))">{{getTestGroupResult(testgroup)}}</div>
              </button>
            </h2>
            <div :id="'flush-collapse'+(testgroup._attributes?testgroup._attributes.name.replace(/ /g,'_'):'no-name')+'_'+key" :class="'accordion-collapse collapse '+getTestGroupResult(testgroup)+'-collapse'" aria-labelledby="flush-headingOne" :data-bs-parent="'accordionFlush-'+sharename+'-'+level">
              <div class="accordion-body">
                    <div v-if="testgroup.testgroup">
                        <recursive-accordion :filter="filter" :testgroupInit="Array.isArray(testgroup.testgroup)?Object.values(testgroup.testgroup):testgroup.testgroup" :sharename="(testgroup._attributes?testgroup._attributes.name.replace(/ /g,'-'):'no-name')" :level="level+1"></recursive-accordion>
                    </div>
                    <div v-if="testgroup.testcase">
                        <div v-if="Array.isArray(testgroup.testcase)">
                            <md-table md-card class="fold-table" :id="sharename">
                                <md-table-row>
                                    <md-table-head>TestCase ID</md-table-head>
                                    <md-table-head>Name</md-table-head>
                                    <md-table-head style="width:3%;">Result</md-table-head>
                                </md-table-row>
                                <template v-for="(item,kel) in testgroup.testcase" >
                                    <md-table-row :key="level+''+key+''+kel"  role="button" data-bs-toggle="collapse" :data-bs-target="'#'+(item._attributes?item._attributes.name.replace(/ /g,''):'no-id')+'_config'" aria-expanded="false" :aria-controls="(item._attributes?item._attributes.name.replace(/ /g,''):'no-id')+'_config'">
                                        <md-table-cell data-toggle="tooltip" :title="item.description?item.description._cdata:'no-description'"><span :data-tooltip="item.description?item.description._cdata:'no-description'">{{ item._attributes?item._attributes.id:'no-id' }}</span></md-table-cell>
                                        <md-table-cell>{{ item._attributes?item._attributes.name:'no-name'}}</md-table-cell>
                                        <md-table-cell :style="'text-align:center;background-color:'+(getTestCaseResult(item)==='FAIL*'||getTestCaseResult(item)==='WARN*'||getTestCaseResult(item)==='PROCESSERROR*'?'green':(getTestCaseResult(item)==='FAIL'?'red;':(getTestCaseResult(item)==='WARN'?'yellow':'#00FF00;')))">{{ getTestCaseResult(item)}}</md-table-cell>
                                    </md-table-row>
                                    <md-table-row :id="(item._attributes?item._attributes.name.replace(/ /g,''):'no-id')+'_config'" class="collapse" :key="level+''+key+''+kel">
                                        <div v-if="Array.isArray(item.testrun)">       
                                            <md-table>
                                               <md-table-row v-for="(itex,kex) in item.testrun" :key="level+''+key+''+kel+''+kex">
                                                    <md-table-cell>{{itex._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.date}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'text-align:center;background-color:'+(getTestRunResult(itex)==='FAIL*'||getTestRunResult(itex)==='WARN*'||getTestRunResult(itex)==='PROCESSERROR*'?'green':(getTestRunResult(itex)==='FAIL'?'red;':(getTestRunResult(itex)==='WARN'?'yellow':'#00FF00;')))">{{getTestRunResult(itex)}}</md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                        </div>
                                        <div v-else>
                                            <md-table>
                                                <md-table-row>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.date}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'text-align:center;width:20%;background-color:'+(getTestRunResult(item.testrun)==='FAIL*'||getTestRunResult(item.testrun)==='WARN*'||getTestRunResult(item.testrun)==='PROCESSERROR*'?'green':(getTestRunResult(item.testrun)==='FAIL'?'red;':(getTestRunResult(item.testrun)==='WARN'?'yellow':'#00FF00;')))">{{getTestRunResult(item.testrun)}}</md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                        </div>
                                    </md-table-row>
                                </template>
                            </md-table>
                        </div>
                        <div v-else>
                            <md-table md-card class="fold-table">
                                <md-table-row>
                                    <md-table-head style="width:25%;">TestCase ID</md-table-head>
                                    <md-table-head style="width:25%;">Name</md-table-head>
                                    <md-table-head style="width:3%;">Result</md-table-head>
                                </md-table-row>
                                <md-table-row  role="button" data-bs-toggle="collapse" :data-bs-target="'#'+(testgroup.testcase._attributes?testgroup.testcase._attributes.name.replace(/ /g,''):'no-id')+'_config'" aria-expanded="false" :aria-controls="(testgroup.testcase._attributes?testgroup.testcase._attributes.name.replace(/ /g,''):'no-id')+'_config'">
                                    <md-table-cell style="width:25%;" data-toggle="tooltip" :title="testgroup.testcase.description?testgroup.testcase.description._cdata:'no-description'"><span :data-tooltip="testgroup.testcase.description?testgroup.testcase.description._cdata:'no-description'">{{ testgroup.testcase._attributes?testgroup.testcase._attributes.id:'no-id' }}</span></md-table-cell>
                                    <md-table-cell style="width:50%;">{{ testgroup.testcase._attributes?testgroup.testcase._attributes.name:'no-name'}}</md-table-cell>
                                    <md-table-cell :style="'text-align:center;width:25%;background-color:'+(getTestCaseResult(testgroup.testcase)==='FAIL'?'red;':(getTestCaseResult(testgroup.testcase)==='WARN'?'yellow':(getTestGroupResult(testgroup)==='OK'?'#00FF00;':'')))">{{ getTestCaseResult(testgroup.testcase)}}</md-table-cell>
                                </md-table-row>
                                <md-table-row :id="(testgroup.testcase._attributes?testgroup.testcase._attributes.name.replace(/ /g,''):'no-id')+'_config'" class="collapse">
                                    <div v-if="Array.isArray(testgroup.testcase.testrun)">       
                                        <md-table>
                                            <md-table-row v-for="(itex,kex) in testgroup.testcase.testrun" :key="level+''+key+''+kex">
                                                <md-table-cell>{{itex._attributes.parameter}}</md-table-cell>
                                                <md-table-cell>{{itex._attributes.date}}</md-table-cell>
                                                <md-table-cell>{{itex._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'text-align:center;background-color:'+(getTestRunResult(itex)==='FAIL*'||getTestRunResult(itex)==='WARN*'||getTestRunResult(itex)==='PROCESSERROR*'?'green':(getTestRunResult(itex)==='FAIL'?'red;':(getTestRunResult(itex)==='WARN'?'yellow':'#00FF00;')))">{{getTestRunResult(itex)}}</md-table-cell>
                                            </md-table-row>
                                        </md-table>
                                    </div>
                                    <div v-else>
                                        <md-table>
                                            <md-table-row>
                                                <md-table-cell style="width:20%;">{{testgroup.testcase.testrun._attributes.parameter}}</md-table-cell>
                                                <md-table-cell style="width:20%;">{{testgroup.testcase.testrun._attributes.date}}</md-table-cell>
                                                <md-table-cell style="width:20%;">{{testgroup.testcase.testrun._attributes.executor}}</md-table-cell>
                                                <md-table-cell :style="'text-align:center;width:20%;background-color:'+(getTestRunResult(testgroup.testcase.testrun)==='FAIL*'||getTestRunResult(testgroup.testcase.testrun)==='WARN*'||getTestRunResult(testgroup.testcase.testrun)==='PROCESSERROR*'?'green':(getTestRunResult(testgroup.testcase.testrun)==='FAIL'?'red;':(getTestRunResult(testgroup.testcase.testrun)==='WARN'?'yellow':'#00FF00;')))">{{getTestRunResult(testgroup.testcase.testrun)}}</md-table-cell>
                                            </md-table-row>
                                        </md-table>
                                    </div>
                                </md-table-row>
                            </md-table>
                        </div>
                    </div>
              </div>
            </div>
        </div>
    </div>
    <div v-else class="accordion accordion-flush" :id="'accordionFlush-'+sharename+'-'+level">
        <div class="accordion-item">
            <h2 class="accordion-header" :id="'flush-heading'+level">
              <button :class="'accordion-button collapsed d-flex justify-content-between '+getTestGroupResult(testgroupInit)+'-result'"  type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse'+(testgroupInit._attributes?testgroupInit._attributes.name.replace(/ /g,'-'):'no-name')+'-'+level" aria-expanded="true" :aria-controls="'flush-collapse'+(testgroupInit._attributes?testgroupInit._attributes.name.replace(/ /g,'-'):'no-name')+'-'+level">
                 <div class="p-2 bd-highlight">{{(testgroupInit._attributes?testgroupInit._attributes.name:'no-name')}}</div> 
                <div class="p-2 bd-highlight" :style="'background-color:'+(getTestGroupResult(testgroupInit).includes('*')?'green':(getTestGroupResult(testgroupInit)==='FAIL'?'red;':(getTestGroupResult(testgroupInit)==='WARN'?'yellow':'#00FF00;')))">{{getTestGroupResult(testgroup)}}</div>
              </button>
            </h2>
            <div :id="'flush-collapse'+(testgroupInit._attributes?testgroupInit._attributes.name.replace(/ /g,'-'):'no-name')+'-'+level" :class="'accordion-collapse collapse '+getTestGroupResult(testgroupInit)+'-collapse'" aria-labelledby="flush-headingOne" :data-bs-parent="'accordionFlush-'+sharename+'-'+level">
              <div class="accordion-body">
                    <div v-if="testgroupInit.testgroup">
                        <recursive-accordion :testgroupInit="Array.isArray(testgroupInit.testgroup)?Object.values(testgroupInit.testgroup):testgroupInit.testgroup" :sharename="(testgroupInit._attributes?testgroupInit._attributes.name.replace(/ /g,'-'):'no-name')" :level="level+1"></recursive-accordion>
                    </div>
                    <div v-if="testgroupInit.testcase">
                        <div v-if="Array.isArray(testgroupInit.testcase)">
                            <md-table md-card class="fold-table">
                                <md-table-row>
                                    <md-table-head>TestCase ID</md-table-head>
                                    <md-table-head>Name</md-table-head>
                                    <md-table-head style="width:3%;">Result</md-table-head>
                                </md-table-row>
                                <template v-for="(item,key) in testgroupInit.testcase">
                                    <md-table-row :key="level+'2'+key" role="button" data-bs-toggle="collapse" :data-bs-target="'#'+(item._attributes?item._attributes.name.replace(/ /g,''):'no-id')+'_config'" aria-expanded="false" :aria-controls="(item._attributes?item._attributes.name.replace(/ /g,''):'no-id')+'_config'">
                                        <md-table-cell data-toggle="tooltip" :title="item.description?item.description._cdata:'no-description'">><span :data-tooltip="item.description?item.description._cdata:'no-description'">{{ item._attributes?item._attributes.id:'no-id' }}</span></md-table-cell>
                                        <md-table-cell>{{ item._attributes?item._attributes.name:'no-name'}}</md-table-cell>
                                        <md-table-cell :style="'text-align:center;background-color:'+(getTestCaseResult(item)==='FAIL*'||getTestCaseResult(item)==='WARN*'||getTestCaseResult(item)==='PROCESSERROR*'?'green':(getTestCaseResult(item)==='FAIL'?'red;':(getTestCaseResult(item)==='WARN'?'yellow':'#00FF00;')))">{{ getTestCaseResult(item)}}</md-table-cell>
                                    </md-table-row>
                                    <md-table-row :id="(item._attributes?item._attributes.name.replace(/ /g,''):'no-id')+'_config'" class="collapse" :key="level+'2'+key+'2'">
                                        <div v-if="Array.isArray(item.testrun)">       
                                            <md-table>
                                               <md-table-row v-for="(itex,kex) in item.testrun" :key="level+'2'+key+''+kex+'2'">
                                                    <md-table-cell>{{itex._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.date}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'text-align:center;background-color:'+(getTestRunResult(itex)==='FAIL*'||getTestRunResult(itex)==='WARN*'||getTestRunResult(itex)==='PROCESSERROR*'?'green':(getTestRunResult(itex)==='FAIL'?'red;':(getTestRunResult(itex)==='WARN'?'yellow':'#00FF00;')))">{{getTestRunResult(itex)}}</md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                        </div>
                                        <div v-else>
                                            <md-table>
                                                <md-table-row>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.date}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'text-align:center;width:20%;background-color:'+(getTestRunResult(item.testrun)==='FAIL*'||getTestRunResult(item.testrun)==='WARN*'||getTestRunResult(item.testrun)==='PROCESSERROR*'?'green':(getTestRunResult(item.testrun)==='FAIL'?'red;':(getTestRunResult(item.testrun)==='WARN'?'yellow':'#00FF00;')))">{{getTestRunResult(item.testrun)}}</md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                        </div>
                                    </md-table-row>
                                </template>
                            </md-table>
                        </div>
                        <div v-else>
                            <md-table md-card class="fold-table">
                                <md-table-row>
                                    <md-table-head style="width:25%;">TestCase ID</md-table-head>
                                    <md-table-head style="width:25%;">Name</md-table-head>
                                    <md-table-head style="width:3%;">Result</md-table-head>
                                </md-table-row>
                                <md-table-row role="button" data-bs-toggle="collapse" :data-bs-target="'#'+(testgroupInit.testcase._attributes?testgroupInit.testcase._attributes.name.replace(/ /g,''):'no-id')+'_config'" aria-expanded="false" :aria-controls="(testgroupInit.testcase._attributes?testgroupInit.testcase._attributes.name.replace(/ /g,''):'no-id')+'_config'">
                                    <md-table-cell style="width:25%;" data-toggle="tooltip" :title="testgroupInit.testcase.description?testgroupInit.testcase.description._cdata:'no-description'"><span :data-tooltip="testgroupInit.testcase.description?testgroupInit.testcase.description._cdata:'no-description'">{{ testgroupInit.testcase._attributes?testgroupInit.testcase._attributes.id:'no-id' }}</span></md-table-cell>
                                    <md-table-cell style="width:50%;">{{ testgroupInit.testcase._attributes?testgroupInit.testcase._attributes.name:'no-name'}}</md-table-cell>
                                    <md-table-cell :style="'text-align:center;width:25%;background-color:'+(getTestCaseResult(testgroupInit.testcase)==='FAIL*'||getTestCaseResult(testgroupInit.testcase)==='WARN*'||getTestCaseResult(testgroupInit.testcase)==='PROCESSERROR*'?'green':(getTestCaseResult(testgroupInit.testcase)==='FAIL'?'red;':(getTestCaseResult(testgroupInit.testcase)==='WARN'?'yellow':'#00FF00;')))">{{ getTestCaseResult(testgroupInit.testcase)}}</md-table-cell>
                                </md-table-row>
                                <md-table-row :id="(testgroupInit.testcase._attributes?testgroupInit.testcase._attributes.name.replace(/ /g,''):'no-id')+'_config'" class="collapse">
                                        <div v-if="Array.isArray(testgroupInit.testcase.testrun)">       
                                            <md-table>
                                               <md-table-row v-for="(itex,kex) in testgroupInit.testcase.testrun" :key="level+'2'+key+'2'+kex+'2'">
                                                    <md-table-cell>{{itex._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.date}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'text-align:center;background-color:'+(getTestRunResult(itex)==='FAIL*'||getTestRunResult(itex)==='WARN*'||getTestRunResult(itex)==='PROCESSERROR*'?'green':(getTestRunResult(itex)==='FAIL'?'red;':(getTestRunResult(itex)==='WARN'?'yellow':'#00FF00;')))">{{getTestRunResult(itex)}}</md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                        </div>
                                        <div v-else>
                                            <md-table>
                                                <md-table-row>
                                                    <md-table-cell style="width:20%;">{{testgroupInit.testcase.testrun._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{testgroupInit.testcase.testrun._attributes.date}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{testgroupInit.testcase.testrun._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'width:20%;background-color:'+(getTestRunResult(testgroupInit.testcase.testrun)==='FAIL*'||getTestRunResult(testgroupInit.testcase.testrun)==='WARN*'||getTestRunResult(testgroupInit.testcase.testrun)==='PROCESSERROR*'?'green':(getTestRunResult(testgroupInit.testcase.testrun)==='FAIL'?'red;':(getTestRunResult(testgroupInit.testcase.testrun)==='WARN'?'yellow':'#00FF00;')))">{{getTestRunResult(testgroupInit.testcase.testrun)}}</md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                        </div>
                                    </md-table-row>
                            </md-table>
                        </div>
                    </div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'RecursiveAccordion',
    props:{
        testgroupInit:{
            type:[Array, Object]
        },
        level:{
            type:Number,
            default:0,
        },
        sharename:{
            type:String,
            default:'group'
        },
        filter:{
            type:String,
            default:'desactived'
        }
    },
    data(){
        return {
            testgroups:[]
        }
    },
    methods:{
        getsimpleResult(result){
            if(result.includes('FAIL*')){
                return 'FAIL*'
            }
            else if(result.includes('FAIL')){
                return 'FAIL'
            }
            else if(result.includes('WARN*')){
                return 'WARN*'
            }
            else if(result.includes('WARN')){
                return 'WARN'
            }
            else if(result.includes('processError')){
                return 'PROCESSERROR'
            }
            else if(result.includes('OK.N/A')){
                return 'OK'
            }
            else if(result.includes('OK')){
                return 'OK'
            }
        },
        getResult(result,isJustified){
            if(result.includes('fail')){
                if(isJustified){
                    return 'FAIL*'
                }else{
                    return 'FAIL'
                }
            }
            else if(result.includes('warn')){
                if(isJustified){
                    return 'WARN*'
                }else{
                    return 'WARN'
                }
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
                var isJustified = 'justification' in testrun
                if('_text' in testrun.result){
                        return this.getResult(testrun.result._text,isJustified)
                }
                else{
                    var result = []
                    testrun.result.forEach(elt=>{
                    result.push(this.getResult(elt._text,isJustified))
                    })
                    return this.getsimpleResult(result)
                }
            }
        },
        getTestCaseResult(testcase){
            if(testcase.testrun){
                if('result' in testcase.testrun){
                    return this.getTestRunResult(testcase.testrun)
                }else{
                    var result = []
                    testcase.testrun.forEach(elt=>{
                        result.push(this.getTestRunResult(elt))
                    })

                    return this.getsimpleResult(result)
                }
            }
        },
        getTestGroupResult(testgroup){
            var result = []

            if(testgroup.testgroup){
                if(Array.isArray(testgroup.testgroup)){
                    testgroup.testgroup.forEach(elt=>{
                        result.push(this.getTestGroupResult(elt))
                    })
                }else{
                    result.push(this.getTestGroupResult(testgroup.testgroup))
                }
            }

            if('testcase' in testgroup){
                if('testrun' in testgroup.testcase){
                    result.push(this.getTestCaseResult(testgroup.testcase))
                }else{
                    testgroup.testcase.forEach(elt=>{
                        result.push(this.getTestCaseResult(elt))
                    })
                }
            }

            return this.getsimpleResult(result)
            
        },
        expand({target}){
            target.classList.toggle("open")
            target.nextElementSibling.classList.toggle("open")
        },
        handleCollapseIn(result,collapse){
            for (let i = 0; i < result.length; i++) {
                result[i].classList.remove("collapsed");
                result[i].setAttribute("aria-expanded","false")
            }

            for (let j = 0; j < collapse.length; j++) {
                collapse[j].classList.add("show");
            }
        },
        handleCollapseOut(result,collapse){
            for (let i = 0; i < result.length; i++) {
                result[i].classList.add("collapsed");
                result[i].setAttribute("aria-expanded","true")
            }

            for (let j = 0; j < collapse.length; j++) {
                collapse[j].classList.remove("show");
            }
        },
        handleFilter(){
            switch (this.filter) {
                case 'WARN':
                    var defaultResult = document.getElementsByClassName('accordion-button')
                    var defaultCollapse = document.getElementsByClassName('accordion-collapse')

                    this.handleCollapseOut(defaultResult,defaultCollapse)

                    var eltsResult = document.getElementsByClassName('WARN-result')
                    var eltsCollapse = document.getElementsByClassName('WARN-collapse')

                    this.handleCollapseIn(eltsResult,eltsCollapse)
                    break;
                case 'WARN*':
                    var defaultResult = document.getElementsByClassName('accordion-button')
                    var defaultCollapse = document.getElementsByClassName('accordion-collapse')

                    this.handleCollapseOut(defaultResult,defaultCollapse)

                    var eltsResult = document.getElementsByClassName('WARN*-result')
                    var eltsCollapse = document.getElementsByClassName('WARN*-collapse')

                    this.handleCollapseIn(eltsResult,eltsCollapse)
                    break;
                case 'FAIL':
                    var defaultResult = document.getElementsByClassName('accordion-button')
                    var defaultCollapse = document.getElementsByClassName('accordion-collapse')

                    this.handleCollapseOut(defaultResult,defaultCollapse)

                    var eltsResult = document.getElementsByClassName('FAIL-result')
                    var eltsCollapse = document.getElementsByClassName('FAIL-collapse')

                    this.handleCollapseIn(eltsResult,eltsCollapse)
                    break;
                case 'FAIL*':
                    var defaultResult = document.getElementsByClassName('accordion-button')
                    var defaultCollapse = document.getElementsByClassName('accordion-collapse')

                    this.handleCollapseOut(defaultResult,defaultCollapse)

                    var eltsResult = document.getElementsByClassName('FAIL*-result')
                    var eltsCollapse = document.getElementsByClassName('FAIL*-collapse')

                    this.handleCollapseIn(eltsResult,eltsCollapse)
                    break;
            
                default:
                    var eltsResult = document.getElementsByClassName('accordion-button')
                    var eltsCollapse = document.getElementsByClassName('accordion-collapse')

                    this.handleCollapseOut(eltsResult,eltsCollapse)
                    break;
            }
        }
    },
    mounted(){
        if(this.testgroupInit.length){
            this.testgroupInit.forEach((key,elt)=>{
                if(elt.testgroup&&elt.testgroup.lenth){
                        var obj = elt
                        obj.id = key
                        this.testgroups.push(obj)
                }else if(elt.testgroup){
                    elt.testgroup.id = 0
                    this.testgroups.push(elt.testgroup)
                }

            })
        }

        this.handleFilter()
    },
    updated(){
        this.handleFilter()
    }
}
</script>
<style scoped>
.md-table-row[aria-expanded=true]{
    background-color:gray;
}
.accordion-button{
    padding:0rem 0 0 1.25rem !important;
}
.accordion-header {
    margin: 0 !important;
    background-color: green;
}

.accordion-button::after{
    display:none
}

.accordion-button:not(.collapsed)::before {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230c63e4'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
-webkit-transform: rotate(-180deg);
transform: rotate(-180deg);
}
.accordion-button::before {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    content: "";
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-size: 1.25rem;
    -webkit-transition: -webkit-transform .2s ease-in-out;
    transition: -webkit-transform .2s ease-in-out;
    transition: transform .2s ease-in-out;
    transition: transform .2s ease-in-out, -webkit-transform .2s ease-in-out;
}
</style>