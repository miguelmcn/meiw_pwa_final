import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "tasksHome",
        component: () => import("@/views/Tasks/Tasks.vue"),
        meta: {
            rule: "user"
        },
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
              next();
            } else {
              next('/login');
            }
          },
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue")
    },
    {
        path: "/task/:taskId",
        name: "editTask",
        component: () => import("@/views/Tasks/Task.vue"),
        meta: {
            rule: "user"
        },
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
              next();
            } else {
              next('/login');
            }
          },
    },
    {
        path: "/tasks",
        name: "tasks",
        component: () => import("@/views/Tasks/Tasks.vue"),
        meta: {
            rule: "user"
        },
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
              next();
            } else {
              next('/login');
            }
          },
    },
    {
        path: "/groups",
        name: "groups",
        component: () => import("@/views/Groups/Groups.vue"),
        meta: {
            rule: "user"
        },
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
              next();
            } else {
              next('/login');
            }
          },
    },
    {
        path: "/group/:groupId",
        name: "group",
        component: () => import("@/views/Groups/Group.vue"),
        meta: {
            rule: "user"
        },
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
              next();
            } else {
              next('/login');
            }
          },
    },
    // Redirect to 404 page, if no match found
    {
        path: "*",
        component: () => import("@/views/Error404.vue"),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
              next();
            } else {
              next('/login');
            }
          },
    }
];

function isLoggedIn() {    
    return localStorage.STORAGE_ACCESS_TOKEN;
  }

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
