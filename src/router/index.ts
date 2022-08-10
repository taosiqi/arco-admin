import {createRouter, createWebHistory} from 'vue-router';
import {useMenuStore} from '@/store/modules/menu';
import {h, resolveComponent} from 'vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {title: '登录页', keepAlive: false}
    },
    {
        path: '/',
        redirect: '/home',
        name: 'Layout',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/home/index.vue'),
                meta: {title: '工作台', keepAlive: false}
            },
            {
                path: '/user',
                redirect: '/user/list',
                name: 'User',
                meta: {title: '用户中心', keepAlive: false},
                // component:()=>h(resolveComponent("router-view")),
                children: [
                    {
                        path: '/user/list',
                        name: 'UserList',
                        component: () => import('@/views/user/index.vue'),
                        meta: {title: '个人中心', keepAlive: false}
                    },
                    {
                        path: '/user/edit',
                        name: 'UserEdit',
                        component: () => import('@/views/user/edit.vue'),
                        meta: {title: '修改信息', keepAlive: false}
                    },
                ]
            },
            {
                path: '/error-page/:id',
                name: 'ErrorPage',
                component: () => import('@/views/error/404.vue'),
                meta: {title: '异常页', keepAlive: false}
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
