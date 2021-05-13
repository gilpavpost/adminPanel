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

            <h1>{{ $t('controlUsers.form.title.status') }}</h1>

            <b-form-row>
                <b-col md="4">
                    <b-form-group>
                        <b-dropdown
                                class="m-2"
                                split
                                v-model="form.status"
                                :text="form.status ? $t('controlUsers.active') : $t('controlUsers.not_active')"
                                >
                            <b-dropdown-item @click="form.status = 1">Активен</b-dropdown-item>
                            <b-dropdown-item @click="form.status = 0">Не активен</b-dropdown-item>
                        </b-dropdown>
                    </b-form-group>
                </b-col>
            </b-form-row>

            <h1>{{ $t('controlUsers.form.title.profile') }}</h1>

            <b-form-row>
                <b-col md="4">
                    <b-form-group
                            :label="$t('controlUsers.form.labels.addSurname')"
                            label-for="surnameInput">
                        <b-form-input
                                id="surnameInput"
                                :state="form.isValid('surname')"
                                v-model.trim="form.surname">
                        </b-form-input>
                        <b-form-invalid-feedback v-text="form.errors.get('surname')"></b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group
                            :label="$t('controlUsers.form.labels.addName')"
                            label-for="nameInput">
                        <b-form-input
                                id="nameInput"
                                :state="form.isValid('name')"
                                v-model.trim="form.name">
                        </b-form-input>
                        <b-form-invalid-feedback v-text="form.errors.get('name')"></b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <b-form-group
                            :label="$t('controlUsers.form.labels.addPatronymic')"
                            label-for="patronymicInput">
                        <b-form-input
                                id="patronymicInput"
                                :state="form.isValid('patronymic')"
                                v-model.trim="form.patronymic">
                        </b-form-input>
                        <b-form-invalid-feedback v-text="form.errors.get('patronymic')"></b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
            </b-form-row>

            <h1>{{ $t('controlUsers.form.title.contact') }}</h1>

            <b-form-row>
            <b-col md="4">
                <b-form-group
                        :label="$t('controlUsers.form.labels.addEmail')"
                        label-for="emailInput">
                    <b-form-input
                            id="emailInput"
                            type="email"
                            :state="form.isValid('email')"
                            v-model.trim="form.email">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('email')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group
                        :label="$t('controlUsers.form.labels.addPhone')"
                        label-for="phoneInput">
                    <b-form-input
                            id="phoneInput"
                            :state="form.isValid('phone')"
                            v-model.trim="form.phone">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('phone')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>

            <h1>{{ $t('controlUsers.form.title.security') }}</h1>

            <b-form-row>
                <b-col md="4">
                    <b-form-group
                            :label="$t('controlUsers.form.labels.addPwd')"
                            label-for="pwdInput">
                        <b-form-input
                                id="pwdInput"
                                type="password"
                                :state="form.isValid('password')"
                                v-model.trim="form.password">
                        </b-form-input>
                        <b-form-invalid-feedback v-text="form.errors.get('password')"></b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
            </b-form-row>


        </b-form>
</template>

<script>
  import Form from '@/utils/Form'
  import Api from '@/api/v1/controlUsers'

  export default {
    props: {
      usersId: {
        default: null,
      },
    },
    data: function () {
      return {
        loading: false,
        form: new Form({
          id: null,
          name: '',
          surname: '',
          patronymic: '',
          phone: '',
          email: '',
          password: null,
          status: 1,
        }),
      }
    },
    methods: {
      async load (id) {
        const response = await Api.getModel(id);
        this.form.load(response.data);
        this.form.id = id;
      },
      async submit() {
        try {
          if (this.form.id) {
            await Api.updateModel(this.form.id, this.form.data);
            this.$emit('updated');
          } else {
            await Api.createModel(this.form.data);
            this.$emit('created');
          }
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
      if (this.usersId) {
        await this.load(this.usersId);
      }
      this.loading = false;
    },
  }
</script>