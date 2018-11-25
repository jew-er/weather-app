import Vue from "vue";
import Router from "vue-router";
import Current from "./views/Current.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Current",
      component: Current
    },
    {
      path: "/forecast",
      name: "Forecast",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Forecast.vue")
    },
    { path: "/404", component: NotFound },
    { path: "*", redirect: "/404" }
  ]
});
