const Foo = { template: '<div>foo</div>' }
const Test = () => import("@/views/test/index.vue")

const routes = [
    { path: '/foo', component: Foo },
    { path: '/test', component: Test },
]

export default routes