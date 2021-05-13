<template>
    <b-form>
        <b-form-row>
            <b-col>
                <b-form-group>
                    <b-form-input
                            v-model="search.id"
                            :placeholder="$t('manufacturers.search.id')">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <b-form-input
                            v-model="search.title"
                            :placeholder="$t('manufacturers.search.title')">
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-form-row>
    </b-form>
</template>

<script>
    export default {
        data() {
            return {
                loaded: false,
                search: {
                    title: '',
                    id: '',
                },
            };
        },
        computed: {

        },
        methods: {
            async fetchFilters() {
                this.loaded = true;
            },
            clearField(field) {
                this.search[field] = '';
            },
        },
        watch: {
            search: {
                handler(value) {
                    this.$emit('search', value);
                },
                deep: true,
            },
        },
        created () {
            this.fetchFilters();
        },
    };
</script>