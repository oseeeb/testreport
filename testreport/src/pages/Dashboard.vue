<template>
  <div class="content">
    <div class="md-layout md-gutter md-alignment-center">
      <div class="md-layout-item md-xlarge-size-75 md-large-size-75 md-medium-size-75 md-small-size-50 md-xsmall-size-100">
        <md-table v-model="infoReport" md-card>
          <md-table-toolbar>
            <h1 class="md-title">General Informations</h1>
          </md-table-toolbar>
          <md-table-row v-for="item in infoReport" :key="item">
            <md-table-cell style="width:25%;">{{ item.elemt }}</md-table-cell>
            <md-table-cell>{{ item.value }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>  
      <div class="md-layout-item md-xlarge-size-25  md-large-size-25 md-medium-size-25 md-small-size-50 md-xsmall-size-100">
        <md-card class="md-accent" md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">Test Result</div>
            </md-card-header>
            <md-card-content>
              <span style="">FAIL</span>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>  
    </div>
    <div class="md-layout">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Test Plan</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
        </md-card-content>
      </md-card>
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Test Cases</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
        </md-card-content>
      </md-card>
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Test Configuration</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
        </md-card-content>
      </md-card>
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Test Level</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
        </md-card-content>
      </md-card>  
    </div>
    <div class="md-layout">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Functional TestCases</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
        </md-card-content>
      </md-card>
      <div class="md-layout md-layout-item">
        <md-card >
          <md-card-header>
            <div class="md-title">RunTime Coverage</div>
          </md-card-header>

          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">Preprocessor Coverage</div>
          </md-card-header>

          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout md-layout-item">
        <md-card >
          <md-card-header>
            <div class="md-title">MISRA</div>
          </md-card-header>
          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">Memory Resource</div>
          </md-card-header>

          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">PCLint</div>
          </md-card-header>

          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">BuildEmbenddedCompiler</div>
          </md-card-header>

          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          </md-card-content>
        </md-card>
        <md-card >
          <md-card-header>
            <div class="md-title">BuildVisuel</div>
          </md-card-header>

          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">CodeMetric</div>
          </md-card-header>

          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
          </md-card-content>
        </md-card>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoReport:[
        {
          elemt:"scope",
          value:"xxxxxxxxxx"
        },
        {
          elemt:"Test Person",
          value:"xxxxxxxxxx"
        },
        {
          elemt:"Test date",
          value:"xxxxxxxxxx"
        },
        {
          elemt:"Rationale",
          value:"xxxxxxxxxx"
        },
        {
          elemt:"Links",
          value:"xxxxxxxxxx"
        }
      ]
    };
  }
};
</script>
<style scoped>
  .content{
    padding: 0 15px !important;
  }
</style>
