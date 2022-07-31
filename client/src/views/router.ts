import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'welcome', component: () => import('./WelcomeView.vue')},
        {path: '/room', name: 'room', component: () => import('./RoomView.vue')}
    ]
});

export default router
