import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import TimelineView from "@/views/TimelineView.vue";
import AccountView from "@/views/AccountView.vue";
import NotesView from "@/views/NotesView.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/timeline',
            name: 'timeline',
            component: TimelineView,
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/account',
            name: 'account',
            component: AccountView,
        },
        {
            path: '/notes',
            name: 'notes',
            component: NotesView,
            /*meta: { requiresAuth: true },*/
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            redirect: { name: 'timeline' },
        },
    ],
})

// router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
//         next({ name: 'account' });
//     } else {
//         next();
//     }
// })

export default router