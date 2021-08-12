<template>
        <div class="container">
            <div class=" row grey-wrapper">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div :id="'testgroup'+level">
                        <div class="accordion-second">
                            <div class="accordion" :id="'accordion'+level">
                                <div 
                                class="accordion-group"
                                v-for="(testgroup,key) in testgroupInit" :key="key"
                                >
                                    <div class="accordion-heading">
                                    <a class="accordion-toggle" style="padding:0 5px; display:flex" data-toggle="collapse"  :data-target="'#collapse'+testgroup._attributes.name+'-accordion-'+key">
                                        <span class="toggle-testgroup"><b-icon-caret-up-fill class="icon-toggle"></b-icon-caret-up-fill></span> <span class="collapse-title" >{{testgroup._attributes.name}}</span>
                                    </a>
                                    </div>
                                    <div :id="'collapse'+testgroup._attributes.name+'-accordion-'+key"  :data-parent="'#accordion'+level" class="accordion-body collapse">
                                    <div class="accordion-inner">
                                        <div v-if="testgroup.testgroup">
                                            <recursive-accordion :testgroupInit="Object.values(testgroup.testgroup)" :level="level+1"></recursive-accordion>
                                        </div>
                                        <div v-if="testgroup.testcase">
                                            <md-table md-card>
                                                <md-table-row v-for="(item,key) in testgroup.testcase" :key="key">
                                                    <md-table-cell style="width:25%;">{{ item._attributes?item._attributes.id:'no-id' }}</md-table-cell>
                                                    <md-table-cell>{{ item._attributes?item._attributes.id:'no-id' }}}</md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                        </div>
                                    </div>
                                    </div>
                                </div>
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
            type:Array,
            default: new Array
        },
        level:{
            type:Number,
            default:0,
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
<style scoped>
	
    .grey-wrapper .accordion-second .accordion-heading .accordion-toggle,
	.grey-wrapper .accordion-second .accordion-heading, 
	.grey-wrapper .accordion-second .accordion-toggle:hover, 
	.grey-wrapper .accordion-second .accordion-heading .accordion-toggle.active,
	.grey-wrapper .accordion-second .accordion-inner {
		background:#fff;
	}

  
    .accordion-second .accordion-group{
        min-height: 65px;
        width: 100%;
		margin-bottom:10px;
	}
	.accordion-second .accordion-heading{
        width: 100%;
        min-height: 65px;
		border-bottom:1px #ef8d00 solid;
		font-size:16px;
	}
	.accordion-second .accordion-heading .accordion-toggle{
		display:block;
		cursor:pointer;
		color:#222222;
        padding: auto 5px;
		background:#f5f5f5;
        align-content: center;
		outline:none!important;
		text-decoration:none
	}
	.accordion-second .accordion-heading,
	.accordion-second .accordion-toggle:hover,
	.accordion-second .accordion-heading .accordion-toggle.active{
		background:#f5f5f5;
	}
	.accordion-second .accordion-heading .accordion-toggle > .toggle-testgroup {
		background-color: #222222;
		border-radius:0;
        display: inline-block;
		color: #FFFFFF;
		font-size:14px;
		line-height: 40px;
		margin-right: 10px;
		text-align: center;
        height: 65px;
		min-width: 40px;
	}
	.accordion-second .accordion-inner{
		padding:9px 10px;
		background:#f5f5f5;
	}	
    .accordion-inner ul{
        margin-left: 15px;
    }
    .accordion-second .accordion-heading .accordion-toggle.active .toggle-testgroup{
		background-color:#ef8d00;
	}

  .accordion-inner div{
    text-align: left;
    margin: 15px;
  }
    a[aria-expanded="false"] .icon-toggle{
        transform: rotate(0deg);
        -webkit-transition: transform .35s ease-in-out;
        transition: transform .35s ease-in-out;
    }
    a[aria-expanded="true"] .icon-toggle{
        transform: rotate(-180deg);
        -webkit-transition: transform .35s ease-in-out;
        transition: transform .35s ease-in-out;
    }
  
    .widget{
        width: 100%;
    }
    .widget h3 span{
		color:#ef8d00;
	}
    .widget h3 {
		font-size:24px;
	}


  
  .testgroup-title{
      font-size: 1.5em;
      font-weight: bold;
      display: inline-block;
      margin-bottom: 15px;
  }

  
    .collapse-title{
        font-size: 1.2em;
        display: inline-block;
        margin-top: 10px;
    }

  @media (max-width:767px) {
    *{
        font-size: 0.99em;
    }
    .testgroup-title{
        font-size: 1.2em;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 15px;
    }
  }
</style>
