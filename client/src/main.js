import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI, { TableColumn } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(ElementUI);
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'normalize.css'
// require styles
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )
import { Loading, Button, Select, MenuItem, MenuItemGroup, Row, Col, Radio, RadioButton, RadioGroup } from 'element-ui';
let element = [Loading, Button, Select, MenuItem, MenuItemGroup, Row, Col, Radio, RadioButton, RadioGroup];
import VueElementExtends from 'vue-element-extends'
import 'vue-element-extends/lib/index.css'
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import VueLoalStorage from 'vue-localstorage'
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(VueLoalStorage);
Vue.use(VueElementExtends)
element.forEach(item => {
    Vue.use(item);
})
Vue.prototype.$axios = axios;
router.beforeEach((to, form, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        next()
    } else {
        next();
    }
})
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.start();
NProgress.done();
NProgress.configure({ easing: 'ease', speed: 1500 });


import VueSession from 'vue-session'
Vue.use(VueSession)

let _ = require("lodash");


new Vue({
    router,
    store,
    VueAxios,
    axios,
    render: h => h(App)
}).$mount("#app");