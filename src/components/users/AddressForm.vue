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

        <b-form-row>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.address.index')"
                        label-for="indexInput">
                    <b-form-input
                            id="indexInput"
                            :state="form.isValid('index')"
                            v-model="form.index">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('index')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.address.country')"
                        label-for="countryInput">
                    <b-form-input
                            id="countryInput"
                            :state="form.isValid('country')"
                            v-model="form.country">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('country')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.address.region')"
                        label-for="regionInput">
                    <b-form-input
                            id="regionInput"
                            :state="form.isValid('region')"
                            v-model="form.region">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('region')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.address.city')"
                        label-for="cityInput">
                    <b-form-input
                            id="cityInput"
                            :state="form.isValid('city')"
                            v-model="form.city">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('city')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>

        <b-form-row>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.address.street')"
                        label-for="streetInput">
                    <b-form-input
                            id="streetInput"
                            :state="form.isValid('street')"
                            v-model="form.street">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('street')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.address.house')"
                        label-for="houseInput">
                    <b-form-input
                            id="houseInput"
                            :state="form.isValid('house')"
                            v-model="form.house">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('house')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.address.apartment')"
                        label-for="apartmentInput">
                    <b-form-input
                            id="apartmentInput"
                            :state="form.isValid('apartment')"
                            v-model="form.apartment">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('apartment')"></b-form-invalid-feedback>
                </b-form-group>
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
                destination: 'address',
                loading: false,

                form: new Form({
                    id: null,
                    index: '',
                    country: '',
                    region: '',
                    city: '',
                    street: '',
                    house: '',
                    apartment: '',
                }),
            }
        },
        methods: {
            async load(id) {
                const response = await Api.getModel(id, {expand: this.destination});
                this.form.load(response.data[this.destination]);
                this.form.id = id;
            },
            async submit() {
                try {
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
            if (this.userId) {
                await this.load(this.userId);
            }
            this.loading = false;
        },
    }
</script>