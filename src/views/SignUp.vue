<template>
    <div class="auth-wrapper animated fadeInDown">
        <h1 v-t="'login.signUp'"></h1>

        <div class="auth-box">
            <b-form id="sign-up-form" @submit.prevent="onSubmit" @reset.prevent="onReset">
                <b-form-group>
                    <b-form-input type="email"
                                  v-model="form.email"
                                  size="sm"
                                  required
                                  :placeholder="$t('login.labels.email')">
                    </b-form-input>
                </b-form-group>

                <b-form-group>
                    <b-form-input type="text"
                                  v-model="form.surname"
                                  size="sm"
                                  required
                                  :placeholder="$t('login.labels.surname')">
                    </b-form-input>
                </b-form-group>

                <b-form-group>
                    <b-form-input type="text"
                                  v-model="form.name"
                                  size="sm"
                                  required
                                  :placeholder="$t('login.labels.name')">
                    </b-form-input>
                </b-form-group>

                <b-form-group>
                    <b-form-input type="password"
                                  v-model="form.password"
                                  size="sm"
                                  required
                                  :placeholder="$t('login.labels.password')">
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="password"
                                  v-model="form.repeatPassword"
                                  size="sm"
                                  required
                                  :placeholder="$t('login.labels.repeatPassword')">
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-checkbox>{{ $t("login.labels.acceptTerms") }}</b-form-checkbox>
                </b-form-group>
                <b-button type="submit" variant="success" block>{{ $t("login.signUp") }}</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    import Form from '@/utils/Form'

    export default {
        components: {
            TelInput,
        },
        data () {
            return {
                form: new Form({
                    email: '',
                    name: '',
                    surname: '',
                    password: '',
                    repeatPassword: '',
                    terms: false,
                }),
            }
        },
        methods: {
            onSubmit () {
                this.form.post('/user/register')
                    .then(() => alert('done!'))
                    .catch(() => alert('error'));
            },
            onReset () {
                /* Reset our form values */
                this.form.reset();
            }
        }
    }
</script>