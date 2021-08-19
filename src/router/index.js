import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
        meta: {
            title: "Home",
        },
    },
    {
        path: "/notes",
        name: "Notes",
        component: () => import("../views/Notes.vue"),
        meta: {
            title: "Notes",
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

const DEFAULT_TITLE = "Notes App";

router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
