import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import TimelineView from "../views/TimelineView.vue";
import NoteView from "../views/NoteView.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/timeline",
            name: "timeline",
            component: TimelineView,
        },
        {
            path: "/home",
            name: "home",
            component: HomeView,
        },
        {
            path: "/notes",
            name: "notes",
            component: NoteView,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notFound",
            redirect: { name: "home" },
        },
    ],
});

export default router;
