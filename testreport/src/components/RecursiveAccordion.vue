<template>
    <div v-if="Array.isArray(testgroupInit)" class="accordion accordion-flush" :id="'accordionFlush-'+sharename+'-'+level">
        <div class="accordion-item"
            v-for="(testgroup,key) in testgroupInit" :key="key"
        >
            <h2 class="accordion-header" :id="'flush-heading'+key">
              <button :class="'accordion-button collapsed d-flex justify-content-between '+getTestGroupResult(testgroup)+'-result'" type="button"  data-bs-toggle="collapse" :data-bs-target="'#flush-collapse'+(testgroup._attributes?testgroup._attributes.name.replace(/ /g,'-'):'no-name')+'-'+key" aria-expanded="true" :aria-controls="'flush-collapse'+(testgroup._attributes?testgroup._attributes.name.replace(/ /g,'-'):'no-name')+'-'+key">
                <div class="p-2 bd-highlight">{{(testgroup._attributes?testgroup._attributes.name:'no-name')}}</div> 
                <div class="p-2 bd-highlight" :style="'background-color:'+(getTestGroupResult(testgroup)==='FAIL'?'red;':(getTestGroupResult(testgroup)==='WARN'?'yellow;':(getTestGroupResult(testgroup)==='OK'?'#00FF00;':'')))">{{getTestGroupResult(testgroup)}}</div>
              </button>
            </h2>
            <div :id="'flush-collapse'+(testgroup._attributes?testgroup._attributes.name.replace(/ /g,'-'):'no-name')+'-'+key" :class="'accordion-collapse collapse '+getTestGroupResult(testgroup)+'-collapse'" aria-labelledby="flush-headingOne" :data-bs-parent="'accordionFlush-'+sharename+'-'+level">
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
                                    <md-table-head>Result</md-table-head>
                                </md-table-row>
                                <template v-for="(item,key) in testgroup.testcase" >
                                    <md-table-row data-toggle="collapse" :data-target="'#'+(item._attributes?item._attributes.id:'no-id')" :data-parent="'#'+sharename" :key="(item._attributes?item._attributes.id:'no-id')+key" class="view" :ref="item._attributes.id">
                                        <md-table-cell><span :data-tooltip="item.description?item.description._cdata:'no-description'">{{ item._attributes?item._attributes.id:'no-id' }}</span></md-table-cell>
                                        <md-table-cell>{{ item._attributes?item._attributes.name:'no-name'}}</md-table-cell>
                                        <md-table-cell :style="'text-align:center;background-color:'+(getTestCaseResult(item)==='FAIL'?'red;':(getTestCaseResult(item)==='WARN'?'yellow':'#00FF00;'))">{{ getTestCaseResult(item)}}</md-table-cell>
                                    </md-table-row>
                                    <md-table-row :id="item._attributes?item._attributes.id:'no-id'"  :key="'collapse'+(item._attributes?item._attributes.id:'no-id')+key">
                                        <div v-if="Array.isArray(item.testrun)">       
                                            <md-table>
                                               <md-table-row v-for="(itex,kex) in item.testrun" :key="kex">
                                                    <md-table-cell>{{itex._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.date}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'background-color:'+(getTestRunResult(itex)==='FAIL'?'red;':(getTestRunResult(itex)==='WARN'?'yellow':'#00FF00;'))">{{getTestRunResult(itex)}}</md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                        </div>
                                        <div v-else>
                                            <md-table>
                                                <md-table-row>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.date}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'width:20%;background-color:'+(getTestRunResult(item.testrun)==='FAIL'?'red;':(getTestRunResult(item.testrun)==='WARN'?'yellow':'#00FF00;'))">{{getTestRunResult(item.testrun)}}</md-table-cell>
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
                                    <md-table-head>Result</md-table-head>
                                </md-table-row>
                                <md-table-row  @click="expand" class="view">
                                    <md-table-cell style="width:25%;"><span :data-tooltip="testgroup.testcase.description?testgroup.testcase.description._cdata:'no-description'">{{ testgroup.testcase._attributes?testgroup.testcase._attributes.id:'no-id' }}</span></md-table-cell>
                                    <md-table-cell style="width:50%;">{{ testgroup.testcase._attributes?testgroup.testcase._attributes.name:'no-name'}}</md-table-cell>
                                    <md-table-cell :style="'text-align:center;width:25%;background-color:'+(getTestCaseResult(testgroup.testcase)==='FAIL'?'red;':(getTestCaseResult(testgroup.testcase)==='WARN'?'yellow':(getTestGroupResult(testgroup)==='OK'?'#00FF00;':'')))">{{ getTestCaseResult(testgroup.testcase)}}</md-table-cell>
                                </md-table-row>
                                <md-table-row class="fold">
                                    <div v-if="Array.isArray(testgroup.testcase.testrun)">       
                                        <md-table>
                                            <md-table-row v-for="(itex,kex) in testgroup.testcase.testrun" :key="kex">
                                                <md-table-cell>{{itex._attributes.parameter}}</md-table-cell>
                                                <md-table-cell>{{itex._attributes.date}}</md-table-cell>
                                                <md-table-cell>{{itex._attributes.executor}}</md-table-cell>
                                                <md-table-cell :style="'background-color:'+(getTestRunResult(itex)==='FAIL'?'red;':(getTestRunResult(itex)==='WARN'?'yellow':'#00FF00;'))">{{getTestRunResult(itex)}}</md-table-cell>
                                            </md-table-row>
                                        </md-table>
                                    </div>
                                    <div v-else>
                                        <md-table>
                                            <md-table-row>
                                                <md-table-cell style="width:20%;">{{testgroup.testcase.testrun._attributes.parameter}}</md-table-cell>
                                                <md-table-cell style="width:20%;">{{testgroup.testcase.testrun._attributes.date}}</md-table-cell>
                                                <md-table-cell style="width:20%;">{{testgroup.testcase.testrun._attributes.executor}}</md-table-cell>
                                                <md-table-cell :style="'width:20%;background-color:'+(getTestRunResult(testgroup.testcase.testrun)==='FAIL'?'red;':(getTestRunResult(testgroup.testcase.testrun)==='WARN'?'yellow':'#00FF00;'))">{{getTestRunResult(testgroup.testcase.testrun)}}</md-table-cell>
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
              <button :class="'accordion-button collapsed d-flex justify-content-between '+getTestGroupResult(testgroupInit)+'-result'" :style="'background-color:'+(getTestGroupResult(testgroupInit)==='FAIL'?'red;':(getTestGroupResult(testgroupInit)==='WARN'?'yellow':'#00FF00;'))" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse'+(testgroupInit._attributes?testgroupInit._attributes.name.replace(/ /g,'-'):'no-name')+'-'+level" aria-expanded="true" :aria-controls="'flush-collapse'+(testgroupInit._attributes?testgroupInit._attributes.name.replace(/ /g,'-'):'no-name')+'-'+level">
                {{(testgroupInit._attributes?testgroupInit._attributes.name:'no-name')}} | {{getTestGroupResult(testgroupInit)}}
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
                                    <md-table-head>Result</md-table-head>
                                </md-table-row>
                                <template v-for="(item,key) in testgroupInit.testcase">
                                    <md-table-row  @click="expand" :key="(item._attributes?item._attributes.id:'no-id')+key" class="view" :ref="item._attributes.id">
                                        <md-table-cell><span :data-tooltip="item.description?item.description._cdata:'no-description'">{{ item._attributes?item._attributes.id:'no-id' }}</span></md-table-cell>
                                        <md-table-cell>{{ item._attributes?item._attributes.name:'no-name'}}</md-table-cell>
                                        <md-table-cell :style="'text-align:center;background-color:'+(getTestCaseResult(item)==='FAIL'?'red;':(getTestCaseResult(item)==='WARN'?'yellow':'#00FF00;'))">{{ getTestCaseResult(item)}}</md-table-cell>
                                    </md-table-row>
                                    <md-table-row :key="'collapse'+(item._attributes?item._attributes.id:'no-id')+key" class="fold">
                                        <div v-if="Array.isArray(item.testrun)">       
                                            <md-table>
                                               <md-table-row v-for="(itex,kex) in item.testrun" :key="kex">
                                                    <md-table-cell>{{itex._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.date}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'background-color:'+(getTestRunResult(itex)==='FAIL'?'red;':(getTestRunResult(itex)==='WARN'?'yellow':'#00FF00;'))">{{getTestRunResult(itex)}}</md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                        </div>
                                        <div v-else>
                                            <md-table>
                                                <md-table-row>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.date}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{item.testrun._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'width:20%;background-color:'+(getTestRunResult(item.testrun)==='FAIL'?'red;':(getTestRunResult(item.testrun)==='WARN'?'yellow':'#00FF00;'))">{{getTestRunResult(item.testrun)}}</md-table-cell>
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
                                    <md-table-head>Result</md-table-head>
                                </md-table-row>
                                <md-table-row  @click="expand" class="view">
                                    <md-table-cell style="width:25%;"><span :data-tooltip="testgroupInit.testcase.description?testgroupInit.testcase.description._cdata:'no-description'">{{ testgroupInit.testcase._attributes?testgroupInit.testcase._attributes.id:'no-id' }}</span></md-table-cell>
                                    <md-table-cell style="width:50%;">{{ testgroupInit.testcase._attributes?testgroupInit.testcase._attributes.name:'no-name'}}</md-table-cell>
                                    <md-table-cell :style="'text-align:center;width:25%;background-color:'+(getTestCaseResult(testgroupInit.testcase)==='FAIL'?'red;':(getTestCaseResult(testgroupInit.testcase)==='WARN'?'yellow':'#00FF00;'))">{{ getTestCaseResult(testgroupInit.testcase)}}</md-table-cell>
                                </md-table-row>
                                
                                    <md-table-row class="fold">
                                        <div v-if="Array.isArray(testgroupInit.testcase.testrun)">       
                                            <md-table>
                                               <md-table-row v-for="(itex,kex) in testgroupInit.testcase.testrun" :key="kex">
                                                    <md-table-cell>{{itex._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.date}}</md-table-cell>
                                                    <md-table-cell>{{itex._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'background-color:'+(getTestRunResult(itex)==='FAIL'?'red;':(getTestRunResult(itex)==='WARN'?'yellow':'#00FF00;'))">{{getTestRunResult(itex)}}</md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                        </div>
                                        <div v-else>
                                            <md-table>
                                                <md-table-row>
                                                    <md-table-cell style="width:20%;">{{testgroupInit.testcase.testrun._attributes.parameter}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{testgroupInit.testcase.testrun._attributes.date}}</md-table-cell>
                                                    <md-table-cell style="width:20%;">{{testgroupInit.testcase.testrun._attributes.executor}}</md-table-cell>
                                                    <md-table-cell :style="'width:20%;background-color:'+(getTestRunResult(testgroupInit.testcase.testrun)==='FAIL'?'red;':(getTestRunResult(testgroupInit.testcase.testrun)==='WARN'?'yellow':'#00FF00;'))">{{getTestRunResult(testgroupInit.testcase.testrun)}}</md-table-cell>
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
                case 'FAIL':
                    var defaultResult = document.getElementsByClassName('accordion-button')
                    var defaultCollapse = document.getElementsByClassName('accordion-collapse')

                    this.handleCollapseOut(defaultResult,defaultCollapse)

                    var eltsResult = document.getElementsByClassName('FAIL-result')
                    var eltsCollapse = document.getElementsByClassName('FAIL-collapse')

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

.accordion-button:not(.collapsed){
    background-color: green;
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
<style lang="scss" scoped>
table {
  width: 100%;
  th { text-align: left; border-bottom: 1px solid #ccc;}
  th, td { padding: .4em; }
}

// fold table 
table{
  > tbody {
    // view segment
    > tr.view {
      td, th {cursor: pointer;}
      td:first-child, 
      th:first-child { 
        position: relative;
        padding-left:20px;
        &:before {
          position: absolute;
          top:50%; left:5px;
          width: 9px; height: 16px;
          margin-top: -8px;
          font: 16px fontawesome;
          color: #999;
          content: "\f0d7";
          transition: all .3s ease;
        }
      }
      &:nth-child(4n-1) { background: #eee; }
      &:hover { background: #000; }
      &.open {
        background: tomato;
        color: white;
        td:first-child, th:first-child {
          &:before {
            transform: rotate(-180deg);
            color: #333;
          }
        }
      }
    }
  
    // fold segment
    // > tr.fold {
    //   display: none;
    //   &.open { display:table-row; }
    // }
  }
}
</style>
