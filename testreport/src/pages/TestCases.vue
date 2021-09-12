<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-50 ">
        <md-field>
          <label for="testcase">Show TestCase by</label>
          <md-select v-model="filter" name="filterTestCase" id="testcase">
            <md-option value="desactivate">Reset</md-option>
            <md-option value="FAIL">FAIL</md-option>
            <md-option value="FAIL*">FAIL*</md-option>
            <md-option value="WARN">WARN</md-option>
            <md-option value="WARN*">WARN*</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
        <recursive-accordion :filter="Accordionfilter" :testgroupInit="$store.state.testdata.testplan.testgroup" :level="0"></recursive-accordion>
      </div> 
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import RecursiveAccordion from '../components/RecursiveAccordion.vue';
export default {
  components:{
    RecursiveAccordion
  },
  data() {
    return {
      filter:'desactivate'
    }
  },
  computed:{
    Accordionfilter(){
      console.log(this.filter)
      return this.filter
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
