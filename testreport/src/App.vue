<template>
  <preloader v-if="loading" :message="msg"/>
  <router-view v-else></router-view>
</template>

<script>
import converter from 'xml-js'
import axios from 'axios'
import preloader from './components/preloader.vue'

export default {
  components:{
    preloader
  },
  data(){
    return {
      loading:true,
      msg:'',
      testCases:[],
      testRuns:[]
    }
  },
  methods:{
    findTestCase(elt){
      if(elt['testgroup']){
        var testgroup = Object.values(elt.testgroup);
        testgroup.forEach(element=>{
          this.findTestCase(element)
        })
      }else if(elt['testcase']){
        var testcase = Object.values(elt.testcase);
        this.testCases.push(...testcase)
      }
    },
    findTestRun(elt){
      elt.forEach(element => {
        if(element['testrun']){
          var testrun = Object.values(element.testrun);
          this.testRuns.push(...testrun)
        }else if(Array.isArray(element)){
          this.testRuns.push(...element)
        }
      });
      
    }
  },
  mounted(){
    this.msg = 'Getting Data...'
    axios
    .get('http://localhost:8081/testdata.xml')
    .then((result)=>{
      var options = {ignoreComment: true, alwaysChildren: true, compact: true};
      //convertion de xml en json avec xml2json
      var res = converter.xml2js(result.data, options);
      //sauvegarde du resultat convertit  
      this.$store.dispatch('testdata',res)
      console.log('data result', this.$store.state.testdata)
  
      this.msg = 'Retrieving TestCase...'
      this.findTestCase(this.$store.state.testdata.testplan)
      this.$store.dispatch('testCases',this.testCases)
      console.log('testCases', this.testCases)

      this.msg = 'Retrieving TestRuns...'
      this.findTestRun(this.testCases)
      this.$store.dispatch('testRuns',this.testRuns)
      
      this.loading = false;
    })
  }
};
</script>
