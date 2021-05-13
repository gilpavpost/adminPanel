<template>
  <div class="auth animated fadeInDown">
    <b-card class="auth-box">
      <div class="logo text-center mb-4">
        <logo></logo>
      </div>

      <h1 v-t="'reset.resetPassword'"></h1>

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
              v-model="form.code"
              :state="form.isValid('code')"
              required
              :placeholder="$t('reset.labels.code')"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('code')"
            ></b-form-invalid-feedback>
          </b-form-group>

          <b-form-group>
            <b-form-input
              type="password"
              v-model="form.password"
              :state="form.isValid('password')"
              required
              :placeholder="$t('reset.labels.password')"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('password')"
            ></b-form-invalid-feedback>
          </b-form-group>

          <b-form-group>
            <b-form-input
              type="password"
              v-model="form.passwordRepeat"
              :state="form.isValid('passwordRepeat')"
              required
              :placeholder="$t('reset.labels.passwordRepeat')"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('passwordRepeat')"
            ></b-form-invalid-feedback>
          </b-form-group>

          <b-button
            :disabled="form.errors.any()"
            type="submit"
            class="btn-p-blue"
            block
          >
            {{ $t("reset.reset") }}
          </b-button>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
import Form from "@/utils/Form";
import Logo from "@/components/Logo";
import Api from "@/api/v1/user";

export default {
  components: {
    Logo,
  },
  data() {
    return {
      form: new Form({
        code: "",
        password: "",
        passwordRepeat: "",
      }),
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await Api.reset(this.form.data);
        if (Number(response.status) == 200) {
          this.$router.push("/login");
          this.$notify({
            type: "success",
            title: this.$t("main.notifications.title"),
            text: this.$t("main.notifications.passwordChanged"),
          });
        }
      } catch (error) {
        if (400 === error.response.status) {
          this.$router.push("/forgot");
        } else {
          this.form.onFail(error.response.data);
        }
      }
    },
    onReset() {
      this.form.reset();
    },
  },
};
</script>
