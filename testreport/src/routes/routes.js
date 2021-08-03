import OverviewLayout from "@/pages/Layout/OverviewLayout.vue";

import Overview from "@/pages/Overview.vue";
const routes = [
  {
    path: "/",
    component: OverviewLayout,
    redirect: "/overview",
    children: [
      {
        path: "overview",
        name: "overview",
        component: Overview
      },
      {
        path: "test_elements",
        name: "test_elements",
        component: Overview
      },
      {
        path: "test_cases",
        name: "test_cases",
        component: Overview
      },
      {
        path: "test_cases_justifications",
        name: "test_cases_justifications",
        component: Overview
      },
      {
        path: "test_configurations",
        name: "test_configurations",
        component: Overview
      },
      {
        path: "misra",
        name: "MISRA",
        component: Overview
      },
      {
        path: "code_metrics",
        name: "code_metrics",
        component: Overview
      },
      {
        path: "runtime_coverage",
        name: "runtime_coverage",
        component: Overview
      },
      {
        path: "memory_resources",
        name: "memory_resources",
        component: Overview
      }
    ]
  }
];

export default routes;
