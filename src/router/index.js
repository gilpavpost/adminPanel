import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import i18n from "../i18n";

import SimpleHeader from "../layouts/SimpleHeader";

import Main from "../views/Main";
import News from "../views/News";
import MainNews from "../views/MainNews";
import CategoriesGoods from "../views/CategoriesGoods";
import GoodsList from "../views/GoodsList";
import Vacancy from "../views/Vacancy";
import Partners from "../views/Partners";
import Ourworks from "../views/Ourworks";
import Settings from "../views/Settings";
import Employees from "../views/Employees";
import Manufacturers from "../views/Manufacturers";
import SignIn from "../views/SignIn";
import Forgot from "../views/Forgot";
import Reset from "../views/Reset";
import Users from "../views/Users";
import Banners from "../views/Banners";
import KnowledgebaseCategories from "../views/KnowledgebaseCategories";
import Knowledgebase from "../views/Knowledgebase";
import BannersTypes from "../views/BannersTypes";
import Services from "../views/Services";
import Agreement from "../views/Agreement";
import Policy from "../views/Policy";
import Pages from "../views/Pages";
import Menu from "../views/Menu";
import MenuItem from "../views/MenuItem";
import Sales from "../views/Sales";

Vue.use(Router);

const isNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/siteakrato",
      beforeEnter() {
        location.href = "http://akrato.com";
      },
    },
    {
      path: "/mailakrato",
      beforeEnter() {
        location.href = "mailto:client@akrato.com";
      },
    },
    {
      path: "/",
      name: "main",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.company.title"),
      },
      components: {
        default: Main,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/news",
      name: "news",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.news"),
      },
      components: {
        default: News,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/main-news",
      name: "main-news",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.main-news"),
      },
      components: {
        default: MainNews,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/categories-goods",
      name: "categoriesGoods",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.categoriesGoods"),
      },
      components: {
        default: CategoriesGoods,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/goods-list",
      name: "goods-list",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.goodsList"),
      },
      components: {
        default: GoodsList,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/manufacturers",
      name: "manufacturers",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.manufacturers"),
      },
      components: {
        default: Manufacturers,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/vacancy",
      name: "vacancy",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.vacancy"),
      },
      components: {
        default: Vacancy,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/employees",
      name: "employees",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.employees"),
      },
      components: {
        default: Employees,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/partners",
      name: "partners",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.partners"),
      },
      components: {
        default: Partners,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/ourworks",
      name: "ourworks",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.ourworks"),
      },
      components: {
        default: Ourworks,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/settings",
      name: "settings",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.settings"),
      },
      components: {
        default: Settings,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/pages",
      name: "pages",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.pages"),
      },
      components: {
        default: Pages,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/sales",
      name: "sales",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.sales"),
      },
      components: {
        default: Sales,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/banners",
      name: "banners",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.banners"),
      },
      components: {
        default: Banners,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/banners-types",
      name: "banners-types",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.banners"),
      },
      components: {
        default: BannersTypes,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/knowledgebase-categories",
      name: "knowledgebase-categories",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.knowledgebase-categories"),
      },
      components: {
        default: KnowledgebaseCategories,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/knowledgebase",
      name: "knowledgebase",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.knowledgebase"),
      },
      components: {
        default: Knowledgebase,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/menu",
      name: "menu",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.menu"),
      },
      components: {
        default: Menu,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/menu-item-create",
      name: "menu-item-create",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.menuItem"),
      },
      components: {
        default: MenuItem,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/menu-item/:id",
      props: true,
      name: "menu-item",
      meta: {
        requiresAuth: true,
        title: i18n.t("main.meta.menuItem"),
      },
      components: {
        default: MenuItem,
        navbar: SimpleHeader,
      },
    },
    {
      path: "/users",
      name: "users",
      meta: {
        requiresAuth: true,
        onlyWorker: true,
        title: i18n.t("main.meta.clients"),
        layout: "simple",
      },
      components: {
        default: Users,
        navbar: SimpleHeader,
      },
    },

    {
      path: "/login",
      name: "sign-in",
      meta: {
        layout: "empty",
        title: i18n.t("main.meta.login"),
      },
      component: SignIn,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/SignIn.vue'),
      beforeEnter: isNotAuthenticated,
    },
    {
      path: "/forgot",
      name: "forgot",
      meta: {
        layout: "empty",
        title: i18n.t("main.meta.forgot"),
      },
      component: Forgot,
      beforeEnter: isNotAuthenticated,
    },
    {
      path: "/reset",
      name: "reset",
      meta: {
        layout: "empty",
        title: i18n.t("main.meta.reset"),
      },
      component: Reset,
      beforeEnter: isNotAuthenticated,
    },

    {
      path: "/agreement",
      name: "agreement",
      meta: {
        layout: "simple",
      },
      component: Agreement,
    },
    {
      path: "/services",
      name: "services",
      meta: {
        layout: "simple",
      },
      component: Services,
    },
    {
      path: "/policy",
      name: "policy",
      meta: {
        layout: "simple",
      },
      component: Policy,
    },

    {
      path: "*",
      redirect: "/error",
    },
  ],
});

router.beforeEach((to, from, next) => {
  //Set layout
  let layout = to.meta.layout || "simple";
  if (layout !== store.getters.layout) {
    store.commit("SET_LAYOUT", layout);
  }

  //Set page title
  let pageTitle = to.meta.title ? `${to.meta.title} | ` : "";
  document.title = `${pageTitle}Admin panel`;

  next();
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
      return;
    }
    next();
    return;
  }
  next();
});

export default router;
