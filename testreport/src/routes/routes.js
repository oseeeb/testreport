import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/overview",
    children: [
      {
        path: "overview",
        name: "overview",
        component: Dashboard
      },
      {
        path: "test_elements",
        name: "test_elements",
        component: Dashboard
      },
      {
        path: "test_cases",
        name: "test_cases",
        component: Dashboard
      },
      {
        path: "test_cases_justifications",
        name: "test_cases_justifications",
        component: Dashboard
      },
      {
        path: "test_configurations",
        name: "test_configurations",
        component: Dashboard
      },
      {
        path: "misra",
        name: "MISRA",
        component: Dashboard
      },
      {
        path: "code_metrics",
        name: "code_metrics",
        component: Dashboard
      },
      {
        path: "runtime_coverage",
        name: "runtime_coverage",
        component: Dashboard
      },
      {
        path: "memory_resources",
        name: "memory_resources",
        component: Dashboard
      }
    ]
  }
];

export default routes;
