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

        <!-- <b-form-row v-for="role in rolesList">
            <b-col md="3">
                <b-form-checkbox v-model="rightsIds[role.name]">
                    {{ role.description }}
                </b-form-checkbox>
            </b-col>
        </b-form-row> -->


    </b-form>
</template>

<script>
    import Form from '@/utils/Form'
    import Api from '@/api/v1/users'
    import ApiSettings from '@/api/v1/settings'

    export default {
        props: {
            userId: {
                default: null,
            },
        },
        data: function () {
            return {
                destination: 'rights',
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
                rightsIds: {}, //результат
                rolesList: [], //входные данные filters

                form: new Form({
                    id: null,
                    rightsIds: [],
                }),
            }
        },
        methods: {
            async load(id) {
                const response = await Api.getModel(id, {expand: this.destination});
                this.form.load(response.data);
                this.form.id = id;
                this.roles = response.data.rights;

                for (let key in this.roles) {
                    this.rightsIds[this.roles[key].item_name] = true;
                }
            },
            async filtersLoad() {
                const response = await ApiSettings.getRoles();
                this.rolesList = response.data;
            },
            async submit() {
                try {
                    this.form.rightsIds = [];

                    for (let key in this.rightsIds) {
                        if(this.rightsIds[key]) {
                            this.form.rightsIds.push(key);
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