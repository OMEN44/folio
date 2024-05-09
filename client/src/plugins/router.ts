import { createRouter, createWebHistory } from "vue-router";

import HomeView from '../views/HomeView.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/timeline',
            name: 'timeline',
            component: HomeView,
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/notes',
            name: 'notes',
            component: HomeView,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            redirect: { name: 'home' },
        },
    ]
})

export default router