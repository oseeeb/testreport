<template>
    <div class="accordion accordion-flush" :id="'accordionFlush-'+sharename+'-'+level">
        <div class="accordion-item"
            v-for="(testgroup,key) in testgroupInit" :key="key"
        >
            <h2 class="accordion-header" :id="'flush-heading'+key">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse'+(testgroup._attributes?testgroup._attributes.name.replace(/ /g,'-'):'no-name')+'-'+key" aria-expanded="false" :aria-controls="'flush-collapse'+(testgroup._attributes?testgroup._attributes.name.replace(/ /g,'-'):'no-name')+'-'+key">
                {{(testgroup._attributes?testgroup._attributes.name:'no-name')}}
              </button>
            </h2>
            <div :id="'flush-collapse'+(testgroup._attributes?testgroup._attributes.name.replace(/ /g,'-'):'no-name')+'-'+key" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" :data-bs-parent="'accordionFlush-'+sharename+'-'+level">
              <div class="accordion-body">
                    <div v-if="testgroup.testgroup">
                        <recursive-accordion :testgroupInit="Object.values(testgroup.testgroup)" :sharename="(testgroup._attributes?testgroup._attributes.name.replace(/ /g,'-'):'no-name')" :level="level+1"></recursive-accordion>
                    </div>
                    <div v-if="testgroup.testcase" style="width:100%">
                        <table class="fold-table">
                            <thead>
                                <tr>
                                <th>TestCase ID</th>
                                <th>Name</th>
                                <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                            <div style="width:100%;" v-for="(item,key) in testgroup.testcase" :key="key" >
                                <tr class="view">
                                    <td style="width:25%;"><span :data-tooltip="item.description?item.description._cdata:''">{{ item._attributes?item._attributes.id:'no-id' }}</span></td>
                                    <td style="width:50%;">{{ item._attributes?item._attributes.name:'no-name'}}</td>
                                    <!-- <md-table-cell :style="'text-align:center;width:25%;background-color:'+(Array.isArray(item.testrun)?(item.testrun.filter(elt=>{
                                        if(Array.isArray(elt.result)){
                                          return  elt.result[0]._text.includes('ok')
                                        }else{
                                           return elt.result._text.includes('ok')
                                        }
                                    }).length===item.testrun.length?'#00FF00;':'red;'):(Array.isArray(item.testrun.result)?(item.testrun.result[0]._text.includes('ok')?'#00FF00;':'red;'):item.testrun.result._text.includes('ok')?'#00FF00;':'red;'))">{{ Array.isArray(item.testrun)?(item.testrun.filter(elt=>{
                                        if(Array.isArray(elt.result)){
                                          return  elt.result[0]._text.includes('ok')
                                        }else{
                                           return elt.result._text.includes('ok')
                                        }
                                    }).length===item.testrun.length?'OK':'FAIL'):item.testrun.result._text}}</md-table-cell> -->
                                    <td></td>
                                </tr>
                                <tr class="fold">
                                    <table>
                                        <tr v-for="(testrun,kex) in item.testrun" :key="kex">
                                            <td style="width:25%;"><span :data-tooltip="testrun._attributes?testrun._attributes.config:'no-id'">{{ testrun._attributes?testrun._attributes.config:'no-id' }}</span></td>
                                            <td style="width:50%;">-</td>
                                            <td style="width:50%;">-</td>
                                            <!-- <md-table-cell :style="'text-align:center;width:25%;background-color:'+(testrun.result&&testrun.result._text.includes('ok')?'#00FF00;':'red;')">{{ testrun.result?testrun.result._text:'' }}</md-table-cell> -->

                                        </tr>
                                    </table>
                                </tr>
                            </div>
                            </tbody>
                        </table>
                    </div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    name:'RecursiveAccordion',
    props:{
        testgroupInit:{
            type:Array,
            default: new Array
        },
        level:{
            type:Number,
            default:0,
        },
        sharename:{
            type:String,
            default:'group'
        }
    },
    data(){
        return {
            testgroups:[]
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
        $(".fold-table tr.view").on("click", function(){
            $(this).toggleClass("open").next(".fold").toggleClass("open");
        });
    }
}
</script>
<style scoped>
.accordion-button{
    padding:0rem 1.25rem !important;
}
.accordion-header {
    margin: 0 !important;
}
table {
	 width: 100%;
}
 table th {
	 text-align: left;
	 border-bottom: 1px solid #ccc;
}
 table th, table td {
	 padding: 0.4em;
}
 table.fold-table > tbody > tr.view td, table.fold-table > tbody > tr.view th {
	 cursor: pointer;
}
 table.fold-table > tbody > tr.view td:first-child, table.fold-table > tbody > tr.view th:first-child {
	 position: relative;
	 padding-left: 20px;
}
 table.fold-table > tbody > tr.view td:first-child:before, table.fold-table > tbody > tr.view th:first-child:before {
	 position: absolute;
	 top: 50%;
	 left: 5px;
	 width: 9px;
	 height: 16px;
	 margin-top: -8px;
	 font: 16px fontawesome;
	 color: #999;
	 content: "\f0d7";
	 transition: all 0.3s ease;
}
 table.fold-table > tbody > tr.view:nth-child(4n-1) {
	 background: #eee;
}
 table.fold-table > tbody > tr.view:hover {
	 background: #000;
}
 table.fold-table > tbody > tr.view.open {
	 background: tomato;
	 color: white;
}
 table.fold-table > tbody > tr.view.open td:first-child:before, table.fold-table > tbody > tr.view.open th:first-child:before {
	 transform: rotate(-180deg);
	 color: #333;
}
 table.fold-table > tbody > tr.fold {
	 display: none;
}
 table.fold-table > tbody > tr.fold.open {
	 display: table-row;
}
 .fold-content {
	 padding: 0.5em;
}
 .fold-content h3 {
	 margin-top: 0;
}
 .fold-content > table {
	 border: 2px solid #ccc;
}
 .fold-content > table > tbody tr:nth-child(even) {
	 background: #eee;
}
</style>
