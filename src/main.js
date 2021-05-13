import Vue from 'vue'
import App from './App.vue'

import VueSweetalert2 from 'vue-sweetalert2'
import Notifications from 'vue-notification'
import VueSidebarMenu from './sidebar'
import VueHtmlToPaper from 'vue-html-to-paper';

import Authorization from './authorisation'
import router from './router'
import store from './store'
import i18n from './i18n'
import './bootstrapVue'
import './icons'
import './progress'
import './loading'
import './table'
import './registerServiceWorker'

Vue.config.productionTip = false;

const optionsVueHtmlToPaper = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://unpkg.com/kidlat-css/css/kidlat.css'
    ]
};

Vue.directive('dateFormat', {
    bind(el) {
        el.oninput = function (e) {
            if (!e.isTrusted) {
                return;
            }
            let x = this.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
            if (x[1] && x[2] && x[3]) {
                this.value = x[1] + '-' + x[2] + '-' + x[3];
            } else if (x[1] && x[2]) {
                this.value = x[1] + '-' + x[2];
            } else {
                this.value = x[1];
            }

            el.dispatchEvent(new Event('input'));
        }
    }
});


Vue.use(VueSweetalert2);
Vue.use(Notifications);
Vue.use(Authorization);
Vue.use(VueSidebarMenu);
Vue.use(VueHtmlToPaper);

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
