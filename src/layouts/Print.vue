<template>
    <router-view></router-view>
</template>

<script>
    export default {
        mounted() {
            document.body.classList.add('print');
        },
        destroyed() {
            document.body.classList.remove('print');
        }
    }
</script>

<style lang="scss">
    body.print {
        background-color: #FFF;
    }
</style>