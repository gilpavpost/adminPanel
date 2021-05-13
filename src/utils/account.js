import store from '@/store'

const accountKey = 'user-account';

export default {
    host(url) {
        return process.env.VUE_APP_PROTOKOL + '://' + store.getters.account + '.' + process.env.VUE_APP_ACCOUNT_DOMAIN + url
    },
    get() {
        return localStorage.getItem(accountKey);
    },
    set(token) {
        localStorage.setItem(accountKey, token);
    },
    unset() {
        localStorage.removeItem(accountKey);
    }
};