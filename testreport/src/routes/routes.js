import OverviewLayout from "@/pages/Layout/OverviewLayout.vue";

import Overview from "@/pages/Overview.vue";
import TestCases from "@/pages/TestCases.vue";
import TestElements from "@/pages/TestElements.vue";
import TestCasesJustifications from "@/pages/TestCasesJustifications.vue";
import TestConfigurations from "@/pages/TestConfigurations.vue";

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
        name: "TestElements",
        component: TestElements
      },
      {
        path: "test_cases",
        name: "TestCases",
        component: TestCases
      },
      {
        path: "test_cases_justifications",
        name: "TestCasesJustifications",
        component: TestCasesJustifications
      },
      {
        path: "test_configurations",
        name: "TestConfigurations",
        component: TestConfigurations
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
