<template>
    <div class="sidenav" :class="{open: value}">
        <div class="logo">
            <router-link to="/">
                AkratoPRIME CMS
            </router-link>
        </div>

        <ul class="app-sidenav">
            <router-link
                    v-for="link in links"
                    :key="link.url"
                    tag="li"
                    active-class="active"
                    :to="link.url"
                    :exact="link.exact"
            >
                <a href="#" class="">{{link.title}}</a>
            </router-link>
        </ul>
    </div>
</template>

<script>
    // import localizeFilter from '@/filters/localize.filter'
    import i18n from '../../i18n'

    export default {
        props: ['value'],
        data: () => ({
            links: [
                {title: i18n.t('main.sideMenu.lists.main'), url: '/', exact: true},
                {title: i18n.t('main.sideMenu.lists.doorsTypes'), url: '/doors', exact: true},
            ]
        })
    }
</script>



