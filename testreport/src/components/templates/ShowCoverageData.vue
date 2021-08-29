<template>
    <span v-if="coverage.percentageJustified==='N/A'"> <!-- TBD -->
    N/A
    </span>
    <div v-else>
    <template v-for="(cov,key) in coverage">
        <PercentageBar
        :subBar1Value="cov.percentageJustified"
        :subBar2Class="cov.percentage"
        :tooltip="getCoverageToolTip(coverage)"
        :key="key"
        />
    </template>
    </div>
</template>
<script>
import PercentageBar from './PercentageBar.vue'
export default {
    components:{
        PercentageBar,
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
            var result = coverage.count+'/'+coverage.covered+' covered ('+coverage.percentage+'%)\n'
            result+=coverage.accepted+'/'+coverage.covered+' accepted ('+coverage.percentage+'%)\n'
            result+=(coverage.accepted-coverage.count)+' uncovered'

            return result
        },
    }
}
</script>