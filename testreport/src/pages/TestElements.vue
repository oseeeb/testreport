<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
        <md-table md-card>
            <md-table-row>
                <md-table-head style="width:20%;">Name</md-table-head>
                <md-table-head style="width:20%;">Version</md-table-head>
                <md-table-head style="width:20%;">Repository</md-table-head>
                <md-table-head style="width:20%;">Repository-status</md-table-head>
                <md-table-head style="width:20%;">Execution</md-table-head>
            </md-table-row>
            <md-table-row v-for="(item,key) in $store.state.testdata.testplan.testelement" :key="key">
                <md-table-cell>{{item._attributes.name}}</md-table-cell>
                <md-table-cell>
                    <div v-if="item.fileversion&&Array.isArray(item.fileversion)">
                        <p v-for="(ver,kex) in item.fileversion" :key="kex">{{ver._attributes.name+'('+ver._attributes.version+')'}}</p>
                    </div>
                    <div v-else-if="item.fileversion">
                        <span>{{item.fileversion._attributes.name+'('+item.fileversion._attributes.version+')'}}</span>
                    </div>
                </md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell :style="'background-color:'+(item._attributes.swcp&&item._attributes.swcp==='yes'?'#00FF00;':'red;')">{{item._attributes.swcp&&item._attributes.swcp.includes('yes')?'ok':'warn'}}</md-table-cell>
                <md-table-cell>
                    <p>{{item._attributes&&item._attributes.date?item._attributes.date:''}}</p>
                    <p>{{item._attributes&&item._attributes.executor?item._attributes.executor:''}}</p>
                </md-table-cell>
            </md-table-row>
        </md-table>
      </div> 
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      
    }
  }
};
</script>
<style scoped>
  .content{
    padding: 0 15px !important;
  }
  .md-table-cell {
    height: 0 !important;
    line-height: 5px !important;
  }
  .md-card-header{
    padding: 5px !important;
  }
  .md-title{
    font-size: 0.9em !important;
  }
  
</style>
