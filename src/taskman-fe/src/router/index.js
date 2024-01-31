import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "tasks",
        component: () => import("@/views/Tasks/Tasks.vue"),
        meta: {
            rule: "user"
        }
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
        }
    },
    {
        path: "/tasks",
        name: "tasks",
        component: () => import("@/views/Tasks/Tasks.vue"),
        meta: {
            rule: "user"
        }
    },
    {
        path: "/groups",
        name: "groups",
        component: () => import("@/views/Groups/Groups.vue"),
        meta: {
            rule: "user"
        }
    },
    {
        path: "/groups/:groupId",
        name: "group",
        component: () => import("@/views/Groups/Group.vue"),
        meta: {
            rule: "user"
        }
    },
    // Redirect to 404 page, if no match found
    {
        path: "*",
        component: () => import("@/views/Error404.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
