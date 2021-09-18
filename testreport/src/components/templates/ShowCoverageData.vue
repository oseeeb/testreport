<template>
    <div v-if="Array.isArray(coverage)" style="height:100%;width:100%">
    <MetricsBar
        v-for="(cov,key) in coverage"
        :Todraw="cov"
        :Type="'coverage'"
        :key="key"
        
        />
    </div>
    
    <MetricsBar
    :Todraw="coverage"
    :Type="'coverage'"
    v-else
    />
</template>
<script>
import MetricsBar from './metricsBar.vue'
export default {
    components:{
        MetricsBar,
    },
    props:{
        coverage:{
            type:[Array, Object],
            default: new Array()
        },
        styl:{
            type:String,
            default:'B'
        }
    },
    computed:{
        coveragePercentageJustified(){
            var coverageWithPercentJust = []
            this.coverage.foreach(coverage=>{
                if(coverage.percentageJustified!=='N/A'){
                    coverageWithPercentJust.push(coverage)
                }
            })
            return coverageWithPercentJust
        }
    },
    methods:{
        getCoverageToolTip(coverage){
            var result = coverage.covered+'/'+coverage.count+' covered ('+coverage.percentage+'%)\n'
            result+=coverage.accepted+'/'+coverage.count+' accepted ('+coverage.percentage+'%)\n'
            result+=(coverage.count-coverage.covered)+' uncovered'

            return result
        },
    },
}
</script>