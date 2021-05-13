<template>
  <div id="app">
    <notifications classes="vue-notification carrot" position="bottom left"></notifications>
    <vue-progress-bar></vue-progress-bar>
    <component v-bind:is="layout"></component>
  </div>
</template>

<script>
    import '@/scss/main.scss'
    import SimpleLayout from './layouts/Simple.vue'
    import EmptyLayout from './layouts/Empty.vue'
    import PrintLayout from './layouts/Print.vue'
    import {USER_REQUEST} from '@/store/modules/user/actions'

    export default {
        computed: {
            layout () {
                return this.$store.getters.layout + '-layout'
            }
        },
        components: {
            SimpleLayout,
            EmptyLayout,
            PrintLayout,
        },
        mounted () {
            //  [App.vue specific] When App.vue is finish loading finish the progress bar
            this.$Progress.finish()
        },
        created: function () {
            if (this.$store.getters.isAuthenticated) {
                this.$store.dispatch(USER_REQUEST)
            }
        },

    }
</script>

<style lang="scss">
  .vue-notification.carrot {
    font-size: 0.8rem;
  }

  .multiselect__single {
    position: relative;
    display: inline-block;
    min-height: calc(1.5em + 0.75rem + 2px)/2;
    line-height: calc(1.5em + 0.75rem + 2px)/2;
    border: none;
    border-radius: 0.25rem;
    background: none;
    padding: 0;
    padding-left: 0px;
    width: calc(100%);
    -webkit-transition: border 0.1s ease;
    transition: border 0.1s ease;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: top;
  }
</style>
