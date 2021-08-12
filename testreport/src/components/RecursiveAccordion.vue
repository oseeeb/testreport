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
                    <div v-if="testgroup.testcase">
                        <md-table md-card>
                            <md-table-row>
                                <md-table-head style="width:25%;">TestCase ID</md-table-head>
                                <md-table-head style="width:25%;">Description</md-table-head>
                                <md-table-head>Result</md-table-head>
                            </md-table-row>
                            <md-table-row v-for="(item,key) in testgroup.testcase" :key="key" :style="'background-color:'+Array.isArray(item.testrun)">
                                <md-table-cell style="width:25%;">{{ item._attributes?item._attributes.id:'no-id' }}</md-table-cell>
                                <md-table-cell style="width:50%;">{{ item.description._cdata}}</md-table-cell>
                                <md-table-cell style="width:25%;">{{ Array.isArray(item.testrun)?(item.testrun.filter(elt=>{return elt.result._text.includes('ok')}).length===item.testrun.length?'OK':'FAIL'):item.testrun.result._text}}</md-table-cell>
                            </md-table-row>
                        </md-table>
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
</style>
