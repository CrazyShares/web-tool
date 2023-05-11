import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import '@/index.less'

const app = new Vue({
    router,
    el: '#app',
    render: h => h(App)
})