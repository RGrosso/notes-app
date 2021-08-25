import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/Home.vue");
const Notes = () => import("@/views/Notes.vue");
const NoteAddEdit = () => import("@/views/AddEditNoteView.vue");

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: "Home",
        },
    },
    {
        path: "/notes",
        name: "Notes",
        component: Notes,
        meta: {
            title: "All Notes",
        },
        children: [
            {
                path: "new",
                name: "New Note",
                component: NoteAddEdit,
                meta: {
                    title: "Create note",
                    onClose: () => router.push({ name: "Notes" }),
                },
            },
            {
                beforeEnter: () => {
                    console.log("Before Note Edit Enter (Per-Route)");
                },
                name: "Edit Note",
                meta: {
                    title: "Edit note",
                    onClose: () => router.push({ name: "Notes" }),
                },
                path: "edit/:id",
                component: NoteAddEdit,
                props: (route) => ({ id: route.params.id }),
            },
        ],
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
