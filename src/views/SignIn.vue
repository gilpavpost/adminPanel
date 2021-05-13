<template>
  <div class="auth animated fadeInDown">
    <b-card class="auth-box">
      <div class="logo text-center mb-4">
        <logo></logo>
      </div>

      <div class="auth-box">
        <b-form
          id="sign-in-form"
          @keydown="form.errors.clear()"
          @submit.prevent="onSubmit"
          @reset.prevent="onReset"
          novalidate
        >
          <b-form-group>
            <b-form-input
              type="email"
              size="lg"
              v-model="form.email"
              :state="form.isValid('email')"
              required
              :placeholder="$t('login.labels.email')"
            >
            </b-form-input>

            <b-form-invalid-feedback
              :style="{
                display: form.isValid('email') == null ? 'none' : 'block',
              }"
              v-text="form.errors.get('email')"
            >
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group>
            <b-form-input
              type="password"
              size="lg"
              v-model="form.password"
              :state="form.isValid('password')"
              required
              :placeholder="$t('login.labels.password')"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('password')"
            ></b-form-invalid-feedback>
          </b-form-group>

          <p class="text-center">
            <b-link class="text-muted" to="/forgot">
              {{ $t("login.forgot") }}
            </b-link>
          </p>

          <b-button
            :disabled="form.errors.any()"
            type="submit"
            class="btn-p-blue"
            block
          >
            {{ $t("login.signIn") }}
          </b-button>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
import Form from "@/utils/Form";
import Logo from "@/components/Logo";
import { AUTH_REQUEST } from "@/store/modules/auth/actions";
import { USER_REQUEST } from "@/store/modules/user/actions";

export default {
  components: {
    Logo,
  },
  data() {
    return {
      phone: "",
      translationsOptions: {
        countrySelectorLabel: this.$t("users.account.countryCode"),
        phoneNumberLabel: this.$t("users.account.phoneNumber"),
        example: this.$t("users.account.phoneExample"),
      },
      form: new Form({
        email: "",
        password: "",
      }),
    };
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch(AUTH_REQUEST, this.form.data);

        if (this.$store.getters.isAuthenticated) {
          await this.$store.dispatch(USER_REQUEST);

          if (
            this.$store.getters.hasOnlyClient ||
            this.$store.getters.withoutRight
          ) {
            this.$router.push({
              name: "user",
              params: { id: this.$store.getters.getProfile.id },
            });
          } else {
            this.$router.push({ name: "orders" });
          }
        }
      } catch (error) {
        this.form.onFail(error.response.data);
      }
    },
    onReset() {
      this.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.country-list {
  height: 160px !important;
}
</style>