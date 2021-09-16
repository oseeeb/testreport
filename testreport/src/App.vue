<template>
  <preloader v-if="loading" :message="msg"/>
  <router-view v-else></router-view>
</template>

<script>
/* eslint-disable */
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
      testRuns:[],
      testConfigs:[],
    }
  },
  methods:{
    findTestCaseInGroup(testgroup){
      if('testcase' in testgroup){
        if(Array.isArray(testgroup.testcase)){
          this.testCases.push(...testgroup.testcase.map(testcase=>{
              var obj = testcase;
              obj.testgroup_attr = testcase._attributes
              return obj
            }))
        }else{
          var obj = testgroup.testcase
          obj.testgroup_attr = testgroup._attributes
          this.testCases.push(obj)
        }
      }

      if('testgroup' in testgroup){
        this.findTestCase(testgroup.testgroup)
      }
    },
    findTestCase(testgroup){
      if(Array.isArray(testgroup)){
        testgroup.forEach(elt=>{
          this.findTestCaseInGroup(elt)
        })
      }
      else{
        this.findTestCaseInGroup(testgroup)
      }
        
    },
    findTestRun(testcases){
      if(Array.isArray(testcases)){
        testcases.forEach(testcase=>{
          if('testrun' in testcase){
            if(Array.isArray(testcase.testrun)){
              this.testRuns.push(...testcase.testrun.map(testrun=>{
                  var obj = testrun;
                  obj.testcase_attr = testcase._attributes
                  return obj
                }))
            }else{
              var obj = testcase.testrun
              obj.testcase_attr = testcase._attributes
              this.testRuns.push(obj)
            }
          }
        })
      }else{
        if('testrun' in testcases){
            if(Array.isArray(testcases.testrun)){
              this.testRuns.push(...testcases.testrun.map(testrun=>{
                  var obj = testrun;
                  obj.testcase_attr = testcases._attributes
                  return obj
                }))
            }else{
              var obj = testcases.testrun
              obj.testcase_attr = testcases._attributes
              this.testRuns.push(obj)
            }
          }
      }
      
    },
    findTestConfig(testRuns){
      console.log('testruns for config', testRuns.length)
      testRuns.forEach(testrun=>{
        if('config' in testrun._attributes){
          this.testConfigs.push(testrun._attributes.config)
        }
        else if('parameter' in testrun._attributes){
          if(testrun._attributes.parameter.match(new RegExp("config=(.*)"))){
            var config = testrun._attributes.parameter.match(new RegExp("config=(.*)"))[1];
            if(config.includes(',')){
              this.testConfigs.push(config.split(',')[0].trim())
            }
            else{
              this.testConfigs.push(config.trim())
            }
          }
          else{
            this.testConfigs.push('Overall')
          }
        }
      })

      this.testConfigs = [...(new Set(this.testConfigs))]
      console.log('this.testConfigs',this.testConfigs)
    },
  },
  mounted(){
    this.msg = 'Getting Data...'
    axios
    .get('/testdata.xml')
    .then((result)=>{
      var options = {ignoreComment: true, alwaysChildren: true, compact: true};
      //convertion de xml en json avec xml2json
      var res = converter.xml2js(result.data, options);
      //sauvegarde du resultat convertit  
      this.$store.dispatch('testdata',res)
  
      this.msg = 'Retrieving TestCase...'
      this.findTestCase(this.$store.state.testdata.testplan.testgroup)
      this.$store.dispatch('testCases',this.testCases)

      this.msg = 'Retrieving TestRuns...'
      this.findTestRun(this.testCases)
      this.$store.dispatch('testRuns',this.testRuns)

      this.msg = 'Retrieving TestConfigs...'
      this.findTestConfig(this.testRuns)
      this.$store.dispatch('testConfigs',this.testConfigs)
      this.loading = false;
    })
  }
};
</script>
<style>
.symbol_info {
  background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVUlEQVR42q2Tu2tTcRTHP7m5ucnNvWnTh0qpVGm0IO3gokWRjoqtqFQFH0spdO6im+D/UHS17uoQRVHQRQk+unSwbVKjldCqtKRJk+ZxH7/fz+FCipROeuAsB87ne578q4V2Ra5/6MOvT5sd1phlGSkppKqXtnPNciWNH53h1bn1vQGT2Ymubnn/5JkjViQR4fu6pLjl4Dcc3M0S1dxKSfr2BE+Gn+0GTOYnUkf1hyMjh0KZ37D8fpl2uQ2xGH44Qk0zQQpY+eZTMy/z/PSLHcCNj31dvfbipfFBK52HYh0GCvNkbycRIZ10PsTVxwLwwBeQXdrA8QZ4e62sAeBsTw+f6rc+ryqK2xKkQsQthG7hh22E1RFoSQnCh87OfXjOFIAGEGuPjSUTBl/WGuC64DhoZgw9HieWaMO046AUCBG4YYCUYwA6gB2PpgpFFxw3aEoqwm0mhKOARjQC+H5QgVLgeRAOp1oAJTy5WWmA44EWAqnY1Gwe5HQ8AQsVABlAhADXAV+oFqBWri27TX8Iz20tZ33xJ3cXyhzusZlf00A5IP1AvemA62ZbgGapmm4Uy0O4OqBAwvkDZV7e6QfDZLFkMnjvK9RKUKlArQa+l24NkZA9s7H0oxQSOwrR7iQYMSCObYdAySCx0YBKtYDRNvv3IV14dxGj8ZSDvXrQq8ax470M9FikM78gnwOnCeWtOp59lrkrmd2nPPpmFFGZpSO5n2gUmm6wVs+FRh2q1QKq8yZz45m9n+nE63aM1SmENooeTiGEwnFzKJXGSDzi0606/9P+AJ98HjqqKHdEAAAAK3RFWHRDb3B5cmlnaHQAQ29weXJpZ2h0IKkgMjAwOC0yMDExIElOQ09SUyBHbWJIEI4hTwAAAABJRU5ErkJggg==') no-repeat left center;
  margin: 0px 0 0px 0px;
  padding: 0px 0 0px 0px;
}

.symbol_ok {
  background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACdklEQVR42q2SW0iTARiG3/26Nllu2kwJy8OwiSmOCiQVQgr1JjFQBIMikyw8lAdI59SQmmxiXoRWHrMETyV1UYEYujDNWTfmRaKuA81KWxqU1tR4u/CwwuzK5/55+D54sfk0YSsMyBYqhZ4dNUqrZ7ViUmQUTLiIPBgg/798G1EetQpr3lAS69/ms2QkmWmDh5n4JIyaDh+KjeJPqEDMhnJwi+pny/tSGkZPMHVoLxP6Ahn72J+Rj3Yx9L4n/doVFJcLdlQgdt3ZHjVya+vkJWpHjjD1eShPmjVM7AtiTLeKEQ930rdNRv2LQgZ0uhNa0RTy4eYI6JGdOZBA42gKTw2FMsWsYXJ/CONMgTzU5UdVhwstX8ZIO/nKNkRppZzIhtYRKEdP9UQ+j/WHMLrbl0lPgxhvUjO6W0X1XRktM2PkEslf5LXxAqJCSeSInq3526vdrUUvj3N3sxcNvZUMuOPOqC5vBnbK+GZ2nKvUjOsoNIIo8yZypDNrAY+rismjPZFsNXfQPr3A4XfD3H/Ph5bZsTW5zqKjpBFELYiiIOL8HwFcFkzxveHc0+HH6Q82fp+ZI3+QXFyW6y3FdLkJCnUgqgQiJ4xIh9kR0CFP0xZA73YpDz4I5tzXeS7MLy3Lr4spaVyRa0AU+xPn1EQaihwBI+SSsi0fvdpkdL0lYmLvAU59m2CdpZBODSviDRD6bURmBJEutiEVyr+3YECMs16wS5uciQbQtXnl3+sgqkCU+BAZ4US6YhG5iPv3GksRC61oCgYpcUVBGJREiS+Ru4/IUhNnJTZc2EhepQBuyEIBMpwGkCX9jEwXG844DeI0dOvP3gR+A+P8W/q3X6rZAAAAK3RFWHRDb3B5cmlnaHQAQ29weXJpZ2h0IKkgMjAwOC0yMDExIElOQ09SUyBHbWJIEI4hTwAAAABJRU5ErkJggg==') no-repeat left center;
  margin: 0px 0 0px 0px;
  padding: 0px 0 0px 20px;
}

.symbol_warn {
  background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACD0lEQVR42s3RS0hUcRTH8e//3jvXmXS8M/nAEp2gpIeNBVIgWdQiIoJokZtI10GgtFIKIpJJcJE9iB4URRThoqBdSA8EJUolwlqElJhMM+nUjJMzzujce1oIQvZeBJ3l4ZzP78Dhn9XQeVb3XQy87Ltc/b6vg11/DQxf8/Ymow8k/fG+9F9d92H0LAV/vPzuBg3jT1skGb4pybFzEnnVKo9ChH40qy1uvO3BnSDQWRSoYWygi7eDFyjyJ7Aqg0een2LFb9NfX+JYdPikTL3YKZrpF19xtYSfrZT4aIM8DGndv7xgvJvlTnFtm9u3FJf+hcICH6VFXlIuG9MTo2RtRcOTEPU/BT7F6SgL7i/IZSN4Si1q1uhYVh5VQRvbnqBqu6Ym0U8LqO+AN1fY7K7YfdAwAWeKmZyffXvTbN2mkBkPyoihGRNs3CGbbrfRtBhQ07n8M8vW79HsuTioFLO5DI1NZRw+ZJKdTaC74ig9RVWdg2URuneU/AXgcTsHfMGmOrFToDIolcXQpxm4O8JI7yAuTxLdnMWVN5+2pZHyaJjWBUC8lcdLV9Vj2ylgDrQ5PHym85afE9dr0Zco9DxAnwf85RDYQAuAAWC4SyzDUDimCUoHpci6C+npiWCbYSCDbnz7vpkk6QUgMjLU3H+nvUs3lFecNCI5RDJAFkditiCIgDg4tiDTMSYTUZr5L+oroXfI9T/dqS8AAAArdEVYdENvcHlyaWdodABDb3B5cmlnaHQgqSAyMDA4LTIwMTEgSU5DT1JTIEdtYkgQjiFPAAAAAElFTkSuQmCC') no-repeat left center;
  margin: 0px 0 0px 0px;
  padding: 0px 0 0px 20px;
}

.symbol_fail {
  background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACfklEQVR42q2TXYhMcRjGf/8z58zY1n6MtTusKd8KJeSrlZuVC3JLygVRruRKkdwpFJdSLkiiFBcKKTc2yUcidlcRy+6yzO4yc2ZmzTnn/+li0HLLW+/d06/3ed735V9LAMhFHHDLlxwy6ebAGoN2BhtptNG4RKO0wmiDkRqpNEkkVTQWnlj3jTMCIN6xrJQ5ebqVnksgJSMPPzFrQSNUJFQjKFeRYyFGBETKUYxh/PPXUtdwNM0HMJmpaZ7ehOe36X8M4th13JHN5HMWKppaHMDVl/i71pAMTxBbiGtkADwAYywkkr5HluDCI1pWrUBc6aM8aoh0Gu6O4s9fTLqnSHZpHq3AuHoGdYA2fOsrkOw9RTrXDnFEMGMG9nIv9tob/GyWAMAPmHL2Fg1NHomuA3wAlUjacxncuX2U5+QRq9chlMTLz8FLp/GdQwgB40MUt62lFFrUHxMoDdWI6Z0BnQe34D+7j/ADhLX1FgIGX1HcOJfxzwnWA20nAVRioRJBReE1BpCfB66u8DyvrmztwJuZJ0lAGpCTAVpLKFeJoxSFi72Y9k6wDlIprPBwzkFrO6133jKrexlxDYyZbCE2UCwzfvg8pi2HTWJsyscrDCI+9GOE+KnO0HbuBtnZLb9D9ACkMcRG0HF0N5mBXkxDE6mwgN21nurODXhfP6IBkpCh7d2MDJR/3vAvC4kiUoZiDM37N9HSf49gzwa+vC/zZXCC0W1d+MMvGN66ktcPBrHBX7/wZGE2zOXbWqKBd2gFU5oCwqLCeKAcJDVo7GhgbCTC+DAhIdaE+yDrA5QKpeMTldqh+DuBcSBDhbZgbH1dBrAfIhBgFeBQDo7zP+oHFpxLe8l1bsoAAAArdEVYdENvcHlyaWdodABDb3B5cmlnaHQgqSAyMDA4LTIwMTEgSU5DT1JTIEdtYkgQjiFPAAAAAElFTkSuQmCC') no-repeat left center;
  margin: 0px 0 0px 0px;
  padding: 0px 0 0px 20px;
}
</style>
