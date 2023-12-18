import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import TimelineView from "@/views/TimelineView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/timeline',
            name: 'timeline',
            component: TimelineView,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            redirect: {name: 'home'},
        },
    ],
})

export default router