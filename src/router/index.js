import { createRouter, createWebHistory, RouterView } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Tr from "@/i18n/translation";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      // Add a new parent path. The :locale is an optional parameter so we add the ? postfix. 
      // It means that all of the following routes are correct: /en/about, /ru/, /about. 
      // If the locale is not explicitly set, we’ll try to “guess” it using the method defined previously.
      path: "/:locale?", 
      component: RouterView, // to display our views
      beforeEnter: Tr.routeMiddleware,
      children: [
        // All other routes will be within the children property
        {
          path: "", // This path changes from '/' to just '' because it’s a child route
          name: "home",
          component: HomeView,
        },
        {
          path: "about", // remove the forward slash
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
      ],
    },
  ],
});

export default router;
