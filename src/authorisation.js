export default {
    install(Vue) {
        Vue.prototype.$can = function (permission) {
            return this.$store.getters.hasPermission(permission);
        };
        Vue.prototype.$cannot = function (permission) {
            return !this.$store.getters.hasPermission(permission);
        }
    }
};