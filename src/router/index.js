import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import TimelineView from "@/views/TimelineView.vue";
import AccountView from "@/views/AccountView.vue";

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
            path: '/account',
            name: 'account',
            component: AccountView,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            redirect: {name: 'home'},
        },
    ],
})

export default router