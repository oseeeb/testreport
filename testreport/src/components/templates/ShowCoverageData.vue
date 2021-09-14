<template>
    <div v-if="Array.isArray(coverage)">
        <PercentageBar
        v-for="(cov,key) in coverage"
        :subBar1Value="cov.percentageJustified"
        :subBar2Class="cov.percentage"
        :tooltip="getCoverageToolTip(cov)"
        :key="key"/>
    </div>
    <span v-else-if="coverage.percentageJustified==='N/A'||isNaN(coverage.percentageJustified)"> <!-- TBD -->
    N/A
    </span>
    <PercentageBar
    :subBar1Value="''+coverage.percentageJustified"
    :subBar2Class="''+coverage.percentage"
    :tooltip="getCoverageToolTip(coverage)"
    v-else
    />
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
            var result = coverage.covered+'/'+coverage.count+' covered ('+coverage.percentage+'%)\n'
            result+=coverage.accepted+'/'+coverage.count+' accepted ('+coverage.percentage+'%)\n'
            result+=(coverage.count-coverage.covered)+' uncovered'

            return result
        },
    },
}
</script>