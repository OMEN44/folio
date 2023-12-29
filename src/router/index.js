import { createRouter, createWebHistory } from "vue-router";
import store from '../store';

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
            meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next({ name: 'account' });
    } else {
        next();
    }
})

export default router