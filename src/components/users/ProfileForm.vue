<template>
  <b-form
    autocomplete="off"
    @keydown="form.errors.clear()"
    @submit.prevent="submit"
    @reset="reset"
  >
    <loading :active="loading" :is-full-page="false"> </loading>

    <!-- <b-form-row>
      <b-col md="2">
        <b-form-group :label="$t('users.profile.avatar')" label-for="avatar">
          <upload-image
            class="avatar-upload"
            ref="avatarInput"
            :image="form.avatar"
            :imageUrl="avatarUrl"
            :placeholder="avatarPlaceholder"
            @upload="uploadAvatar"
            @delete="deleteAvatar"
          >
          </upload-image>
        </b-form-group>
      </b-col>
    </b-form-row> -->

    <b-form-row>
      <b-col md="4">
        <b-form-group
          :label="$t('users.profile.surname')"
          label-for="surnameInput"
        >
          <b-form-input
            id="surnameInput"
            :state="form.isValid('surname')"
            v-model="form.surname"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('surname')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group :label="$t('users.profile.name')" label-for="nameInput">
          <b-form-input
            id="nameInput"
            :state="form.isValid('name')"
            v-model="form.name"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('name')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group
          :label="$t('users.profile.patronymic')"
          label-for="patronymicInput"
        >
          <b-form-input
            id="patronymicInput"
            :state="form.isValid('patronymic')"
            v-model="form.patronymic"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('patronymic')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="4">
        <b-form-group
          :label="$t('users.profile.birthday')"
          label-for="birthdayInput"
        >
          <b-form-input
            id="birthdayInput"
            :state="form.isValid('birthdayFormatted')"
            v-dateFormat
            placeholder="dd-mm-yyyy"
            v-model="form.birthdayFormatted"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('birthdayFormatted')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group :label="$t('users.profile.sex')" label-for="sexInput">
          <multiselect
            id="sexInput"
            v-model="sexIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="sexOptions"
            :searchable="false"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('sex')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
import Form from "@/utils/Form";
import Api from "@/api/v1/users";
import Multiselect from "vue-multiselect";
import ak from "@/utils/account";
// import UploadImage from "../UploadImage.vue";

export default {
  components: {
    Multiselect,
    // UploadImage,
  },
  props: {
    userId: {
      default: null,
    },
    avatarPlaceholder: {
      type: String,
      default: "/img/placeholder-image.png",
    },
  },
  data: function () {
    return {
      account: ak,
      destination: "profile",
      loading: false,
      sexOptions: [],
      sexIdSelect: null,
      birthdaySelect: null,
      selectOptions: {
        multiple: false,
        showNoOptions: false,
        showNoResults: false,
        selectLabel: "",
        selectedLabel: "",
        deselectLabel: "",
        openDirection: "bottom",
      },
      avatarUrl: "",
      form: new Form({
        id: null,
        avatar: "",
        avatarUrl: "",
        name: "",
        surname: "",
        patronymic: "",
        sex: "",
        birthdayFormatted: "",
      }),
    };
  },
  watch: {
    sexIdSelect(newValue) {
      if (newValue !== undefined) {
        this.form.sex = newValue.id;
      }
    },
    birthdaySelect(date) {
      if (date !== undefined) {
        this.form.birthdayFormatted = date.valueOf() / 1000;
      }
    },
  },
  methods: {
    uploadFile(file) {
      let form = new FormData();
      form.append("file", file);

      return Api.uploadFile("safe-image", form);
    },
    async uploadAvatar(fileList) {
      let file = fileList[0];
      let response = await this.uploadFile(file);
      this.form.avatar = response.data.name;
      this.avatarUrl = response.data.url;
      this.clearAvatarInput();
    },
    clearAvatarInput() {
      // this.$refs.avatarInput.clearInput();
    },
    deleteAvatar() {
      this.form.avatar = "";
      this.avatarUrl = "";
    },
    downloadAvatar() {
      const link = document.createElement("a");
      link.href = this.avatarUrl;
      link.setAttribute("download", this.form.avatar);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    },
    async load(id) {
      const response = await Api.getModel(id, { expand: this.destination });
      this.form.load(response.data[this.destination]);
      this.form.id = id;
      this.sexIdSelect = this.sexOptions.find((x) => x.id === this.form.sex);
      this.form.birthdayFormatted = response.data.profile.birthday;

      if (this.form.avatarUrl != "" && this.form.avatarUrl != null) {
        this.avatarUrl = this.account.host(this.form.avatarUrl);
        this.clearAvatarInput();
      }
    },
    async filtersLoad() {
      const response = await Api.getFilters();
      this.sexOptions = response.data.sex;
    },
    async submit() {
      try {
        if (this.userId != null) {
          await Api.updateDestModel(
            this.userId,
            this.destination,
            this.form.data
          );
          this.$emit("updated");
        } else {
          const user = await Api.createModel(this.form.data);
          this.$emit("created", user.data.id);
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
    await this.filtersLoad();
    if (this.userId) {
      await this.load(this.userId);
    }
    this.loading = false;
  },
};
</script>