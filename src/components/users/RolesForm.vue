<template>
    <b-form
            autocomplete="off"
            @keydown="form.errors.clear()"
            @submit.prevent="submit"
            @reset="reset">
        <loading
                :active="loading"
                :is-full-page="false">
        </loading>

        <b-form-row v-for="role in rolesList">
            <b-col md="3">
                <b-form-checkbox v-model="rolesIds[role.value]">
                    {{ role.label }}
                </b-form-checkbox>
            </b-col>
        </b-form-row>
    </b-form>
</template>

<script>
    import Form from '@/utils/Form'
    import Api from '@/api/v1/users'

    export default {
        props: {
            userId: {
                default: null,
            },
        },
        data: function () {
            return {
                destination: 'roles',
                loading: false,
                selectOptions: {
                    multiple: false,
                    showNoOptions: false,
                    showNoResults: false,
                    selectLabel: '',
                    selectedLabel: '',
                    deselectLabel: '',
                    clearOnSelect: '',
                    openDirection: 'bottom',
                },

                roles: [], //load массив
                rolesIds: {}, //результат
                rolesList: [], //входные данные filters

                form: new Form({
                    id: null,
                    rolesIds: [],
                }),
            }
        },
        methods: {
            async load(id) {
                const response = await Api.getModel(id, {expand: this.destination});
                this.form.load(response.data);
                this.form.id = id;
                this.roles = response.data.roles;

                for (let key in this.roles) {
                    this.rolesIds[this.roles[key].role] = true;
                }
            },
            async filtersLoad() {
                const response = await Api.getFilters();
                this.rolesList = response.data.roles;
            },
            async submit() {
                try {
                    this.form.rolesIds = [];

                    for (let key in this.rolesIds) {
                        if(this.rolesIds[key]) {
                            this.form.rolesIds.push(key);
                        }
                    }

                    await Api.updateDestModel(this.userId, this.destination, this.form.data);
                    this.$emit('updated');
                    this.form.onSuccess();
                } catch (error) {
                    this.form.onFail(error.response.data);
                }
            },
            reset() {
                this.form.reset();
            },
        },
        async created() {
            this.loading = true;
            await this.filtersLoad();

            if (this.userId) {
                await this.load(this.userId);
            }
            this.loading = false;
        },
    }
</script>