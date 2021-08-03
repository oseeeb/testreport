<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">

    <side-bar
      :title="TestReport"
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <sidebar-link to="/overview">
        <md-icon>dashboard</md-icon>
        <p>Overview</p>
      </sidebar-link>
      <sidebar-link to="/test_elements">
        <md-icon>bubble_chart</md-icon>
        <p>Tests Elements</p>
      </sidebar-link>
      <sidebar-link to="/test_cases">
        <md-icon>beenhere</md-icon>
        <p>Test Cases</p>
      </sidebar-link>
      <sidebar-link to="/test_cases_justifications">
        <md-icon>border_all</md-icon>
        <p>Test Cases Justifications</p>
      </sidebar-link>
      <sidebar-link to="/test_configurations">
        <md-icon>build</md-icon>
        <p>Test Configurations</p>
      </sidebar-link>
      <sidebar-link to="/misra">
        <md-icon>business</md-icon>
        <p>MISRA</p>
      </sidebar-link>
      <sidebar-link to="/code_metrics">
        <md-icon>assessment</md-icon>
        <p>Code Metrics</p>
      </sidebar-link>
      <sidebar-link to="/runtime_coverage">
        <md-icon>control_camera</md-icon>
        <p>Runtime Coverage</p>
      </sidebar-link>
       <sidebar-link to="/memory_resources">
        <md-icon>business_center</md-icon>
        <p>Memory Resources</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg")
    };
  }
};
</script>
