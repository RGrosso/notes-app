import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/HomeView.vue");
const Notes = () => import("@/views/NotesView.vue");
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
                    displayInNoteModal: true,
                },
            },
            {
                name: "Edit Note",
                meta: {
                    title: "Edit note",
                    displayInNoteModal: true,
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
