import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import TestView from "../views/TestView.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/timeline",
            name: "timeline",
            component: () => import("../views/TimelineView.vue"),
        },
        {
            path: "/home",
            name: "home",
            component: HomeView,
        },
        {
            path: "/notes/:id?",
            name: "notes",
            component: () => import("../views/NoteView.vue"),
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
