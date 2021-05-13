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
      <b-col md="6">
        <b-form-group
            :label="$t('users.account.phone')"
            label-for="phoneInput">

          <VuePhoneNumberInput
              v-model="phone"
              id="phoneInput"
              @update="phoneFormatted"
              :error="(form.isValid('phone') == null ? false : true) "
              :only-countries="['RU', 'BY', 'UA', 'KZ', 'KG']"
              :translations="translationsOptions"
              :no-example="true"
              default-country-code="RU"/>

          <b-form-invalid-feedback
              :style="{display: (form.isValid('phone') == null ? 'none' : 'block')}"
              v-text="form.errors.get('phone')">
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="6">
        <b-form-group
            :label="$t('users.account.email')"
            label-for="emailInput">
          <b-form-input
              id="emailInput"
              :state="form.isValid('email')"
              v-model="form.email">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('email')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="3">
        <b-form-group
            :label="$t('users.account.password')"
            label-for="passwordInput">
          <b-form-input
              id="passwordInput"
              :state="form.isValid('new_password')"
              type="password"
              v-model="form.new_password">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('new_password')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col md="3">
        <b-form-group
            :label="$t('users.account.passwordRepeat')"
            label-for="passwordRepeatInput">
          <b-form-input
              id="passwordRepeatInput"
              :state="form.isValid('new_password_repeat')"
              type="password"
              v-model="form.new_password_repeat">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('new_password_repeat')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
  import Form from '@/utils/Form'
  import Api from '@/api/v1/users'
  import VuePhoneNumberInput from 'vue-phone-number-input';
  import 'vue-phone-number-input/dist/vue-phone-number-input.css';

  export default {
    components: {
      VuePhoneNumberInput,
    },
    props: {
      userId: {
        default: null,
      },
    },
    data: function () {
      return {
        destination: 'account',
        loading: false,
        phone: '',
        translationsOptions: {
          countrySelectorLabel: this.$t('users.account.countryCode'),
          phoneNumberLabel: this.$t('users.account.phoneNumber'),
          example: this.$t('users.account.phoneExample'),
        },
        form: new Form({
          id: null,
          phone: '',
          email: '',
          new_password: '',
          new_password_repeat: '',
        }),
      }
    },
    methods: {
      phoneFormatted(event) {
        this.form.phone = event.e164 !== undefined ? event.e164 : '';
      },
      async load(id) {
        const response = await Api.getModel(id);
        this.form.load(response.data);
        this.form.id = id;

        this.phone = this.form.phone;
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

<style lang="scss">
  .vue-phone-number-input .select-country-container {
    width: 90px;
    min-width: 90px;
    max-width: 90px
  }

  .country-selector.has-value .field-input[data-v-ee0323ae] {
    padding-top: 14px;
    padding-left: 33px
  }

  .field.vue-input-ui .field-label[data-v-6250583d] {
    left: 5px;
  }
</style>