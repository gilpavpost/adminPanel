<template>
  <div class="auth animated fadeInDown">
    <b-card class="auth-box">
      <div class="logo text-center mb-4">
        <logo></logo>
      </div>

      <h1 v-t="'forgot.passwordRecovery'"></h1>

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

          <p class="text-center">
            <b-link class="text-muted" to="/login">
              {{ $t("forgot.login") }}
            </b-link>
          </p>

          <b-button
            :disabled="form.errors.any()"
            type="submit"
            class="btn-p-blue"
            block
          >
            {{ $t("forgot.send") }}
          </b-button>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
import Form from "@/utils/Form";
import Api from "@/api/v1/user";
import Logo from "@/components/Logo";

export default {
  components: {
    Logo,
  },
  data() {
    return {
      form: new Form({
        email: "",
      }),
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await Api.forgot(this.form.data);

        if (Number(response.status) == 200) {
          this.$swal(this.$t("forgot.waitForInstruction"));

          this.$router.push("/reset");
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
