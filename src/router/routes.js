const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "card", component: () => import("pages/CardPage.vue") },
      { path: "camera", component: () => import("pages/CameraPage.vue") },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "calendar", component: () => import("pages/CalendarPage.vue") },
      { path: "map", component: () => import("pages/mapClick.vue") },
    ],
  },
  { path: "/trip", component: () => import("pages/TripPage.vue") },
  {
    path: "/trip_details",
    component: () => import("pages/TripDetailsPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
