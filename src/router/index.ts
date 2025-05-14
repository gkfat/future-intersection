import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/layouts/AppLayout.vue'),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/index/Index.vue'),
            }, {
                path: '/articles/:slug',
                name: 'Article',
                component: () => import('@/views/articles/ArticleContent.vue'),
                props: true,
            },
        ],
    }, {
        path: '/:catchAll(.*)*',
        redirect: '/',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
