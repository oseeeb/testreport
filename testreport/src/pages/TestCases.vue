<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-75 md-large-size-75 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
         <recursive-accordion :testgroupInit="$store.state.testdata.testplan.testgroup" :level="1"></recursive-accordion>
      </div> 
    </div>
  </div>
</template>
<script>
import RecursiveAccordion from '../components/RecursiveAccordion.vue';
export default {
  components:{
    RecursiveAccordion
  },
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
