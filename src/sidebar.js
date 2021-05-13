import SidebarMenu from './layouts/sidebar/SidebarMenu.vue'

export default {
  install (Vue) {
    Vue.component('sidebar-menu', SidebarMenu)
  }
}

export { SidebarMenu }
