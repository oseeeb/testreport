<template>
  <preloader v-if="loading"/>
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
    }
  },
  mounted(){
    axios
    .get('http://localhost:8080/testdata.xml')
    .then((result)=>{
      var options = {ignoreComment: true, alwaysChildren: true};
      //convertion de xml en json avec xml2json
      var res = converter.xml2js(result.data, options);
      //sauvegarde du resultat convertit  
      this.$store.dispatch('testdata',res)
      console.log('data result', this.$store.state.testdata)
      this.loading = false;
    })
  }
};
</script>
