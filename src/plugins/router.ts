import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import TimelineView from "../views/TimelineView.vue";
import NoteView from "../views/NoteView.vue";
import TestView from "../views/TestView.vue";

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
            path: "/test",
            name: "test",
            component: TestView,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notFound",
            redirect: { name: "home" },
        },
    ],
});

export default router;
