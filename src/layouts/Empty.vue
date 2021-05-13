<template>
    <router-view></router-view>
</template>

<script>
    export default {
        mounted() {
            document.body.classList.add('empty');
        },
        destroyed() {
            document.body.classList.remove('empty');
        }
    }
</script>

<style lang="scss">
    body.empty {
        background-color: #eaedf4;
    }
</style>