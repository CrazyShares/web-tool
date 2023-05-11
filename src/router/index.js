import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = []
const ignore = ['./index.js']
const requireAll = context => context.keys().filter(key => !ignore.includes(key)).map(context)
// webpack的全部引入的方法 require.context
const routeJs = require.context('./', false, /\.js$/)
const allRoute = requireAll(routeJs)
allRoute.forEach((item) => {
    routes.push(...item.default)
});

const router = new VueRouter({
    routes
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
    next()
})

export default router