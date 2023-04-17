import { createRouter, createWebHistory, RouterView } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Tr from "@/i18n/translation";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/:locale?", // <--- 2
      component: RouterView, // <--- 3
      beforeEnter: Tr.routeMiddleware,
      children: [
        // <--- 4
        {
          path: "", // <--- 5
          name: "home",
          component: HomeView,
        },
        {
          path: "about", // <--- 6
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
      ],
    },
  ],
});

export default router;

// 2. Add a new parent path. The :locale is an optional parameter so we add the ? postfix. It means that all of the following routes are correct: /en/about, /ru/, /about. If the locale is not explicitly set, we’ll try to “guess” it using the method defined previously.
// 3. We will use the RouterView to display our views.
// 4. All other routes will be within the children property.
// 5. This path changes from '/' to just '' because it’s a child route.
// 6. Same change here; remove the forward slash.
