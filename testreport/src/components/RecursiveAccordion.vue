<template>
    <div style="padding-left:50px">
        <div class="accordion" role="tablist" v-for="(testgroup,key) in testgroupInit" :key="key">
            <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="testgroup._attributes.name+'-accordion-'+key" variant="info">{{testgroup._attributes.name}}</b-button>
            </b-card-header>
            <b-collapse :id="testgroup._attributes.name+'-accordion-'+key" visible :accordion="'my-accordion-'+testgroup._attributes.name" role="tabpanel">
                <b-card-body>
                <div v-if="testgroup.testgroup">
                    <recursive-accordion :testgroupInit="testgroup.testgroup"></recursive-accordion>
                </div>
                <div v-if="testgroup.testcase">
                    <md-table md-card>
                        <md-table-row v-for="item in testgroup.testcase" :key="item._attributes.id">
                            <md-table-cell style="width:25%;">{{ item._attributes.id }}</md-table-cell>
                            <md-table-cell>{{ item._attributes.id}}</md-table-cell>
                        </md-table-row>
                    </md-table>
                </div>
                </b-card-body>
            </b-collapse>
            </b-card>
        </div>
        <div>

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
        console.log('testgrop acc',this.testgroups)
    }
}
</script>
