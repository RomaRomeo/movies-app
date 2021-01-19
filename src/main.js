import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify, {
    iconfont: 'mdi'
})

Vue.config.productionTip = false;


new Vue({
    vuetify: new Vuetify(),
    render: h => h(App),
    Vuetify,
    router,
}).$mount('#app')
