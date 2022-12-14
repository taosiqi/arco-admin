import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        // 是可选的
        title?: string
        // 每个路由都必须声明
        moduleName?: string
        keepAlive?: boolean
    }
}

export const customRouter: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {title: '工作台'}
    },
    {
        path: '/',
        redirect: '/user',
        meta: {title: '用户中心'},
        children: [
            {
                path: '/user',
                name: 'UserList',
                component: () => import('@/views/user/index.vue'),
                meta: {title: '个人中心'}
            },
            {
                path: '/user/edit',
                name: 'UserEdit',
                component: () => import('@/views/user/edit.vue'),
                //子页面加上父页面的url<moduleName>，方便做鉴权
                meta: {title: '修改个人信息', moduleName: '/user'}
            },
        ]
    },
]
const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/',
        redirect: '/home',
        name: 'Layout',
        component: () => import('@/layout/index.vue'),
        children: [
            ...customRouter,
            {
                path: '/error-page/:id',
                name: 'ErrorPage',
                component: () => import('@/views/error/404.vue'),
                meta: {title: '异常页'}
            },
            {
                path: "/:catchAll(.*)",
                component: () => import('@/views/error/404.vue'),
                meta: {hidden: true}
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),//你的网站根目录地址
    routes,
    scrollBehavior: () => ({left: 0, top: 0})
})

/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/') {
        next()
    } else {
        next();
    }
});

/**
 * 路由错误回调
 */
router.onError((handler) => {
    console.log("error:", handler);
});

export default router;
