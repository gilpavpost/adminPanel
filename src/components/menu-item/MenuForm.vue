<template>
  <b-form
    class="mt-2"
    autocomplete="off"
    @keydown="form.errors.clear()"
    @submit.prevent="submit"
    @reset="reset"
  >
    <!-- <loading :active="loading" :is-full-page="false"> </loading> -->

    <b-form-row>
      <b-col md="6">
        <b-form-group :label="$t('menu.labels.title')" label-for="titleInput">
          <b-form-input :state="form.isValid('title')" v-model="form.title">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('title')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col md="6">
        <b-form-group
          :label="$t('menu.labels.alias')"
          label-for="categoryInput"
        >
          <multiselect
            v-model="typeSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="types"
            :searchable="true"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="firstLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('alias')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="6">
        <b-form-group :label="$t('menu.labels.status')" label-for="statusInput">
          <multiselect
            v-model="statusSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="statuses"
            :searchable="false"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('status')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row v-show="isCreate">
      <b-button @click="update()"> Обновить </b-button>
    </b-form-row>
    <b-form-row v-show="!isCreate">
      <b-button @click="submit()"> Создать </b-button>
    </b-form-row>
  </b-form>
</template>

<script>
import Form from "@/utils/Form";
import Api from "@/api/v1/menu-item";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  props: ["isCreate"],
  data: function () {
    return {
      tableData: [],
      statuses: [],
      types: [],
      menus: [],
      in_new_window: [],
      statusSelect: null,
      typeSelect: null,
      selectOptions: {
        multiple: false,
        showNoOptions: false,
        showNoResults: false,
        selectLabel: "",
        selectedLabel: "",
        deselectLabel: "",
        openDirection: "bottom",
      },

      form: new Form({
        id: null,
        title: "",
        alias: "",
        status: "",
      }),
    };
  },
  watch: {
    statusSelect(newValue) {
      if (newValue !== undefined) {
        this.form.status = newValue.id;
      }
    },
    typeSelect(newValue) {
      if (newValue !== undefined) {
        this.form.alias = newValue.id;
      }
    },
  },
  methods: {
    async load(id) {
      const response = await Api.getMenuItem(id);
      this.form.load(response.data);
      this.statusSelect = this.statuses.find(
        (x) => String(x.id) === String(this.form.status)
      );
      this.typeSelect = this.types.find(
        (x) => String(x.id) === String(this.form.type)
      );
    },
    async filtersLoad() {
      const response = await Api.getFilters();
      this.statuses = response.data.statuses;
      this.types = response.data.aliases;
    },
    async submit() {
      try {
        await Api.createModel(this.form.data).then((res) =>
          this.$emit("created", res.data.id)
        );
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
    await this.filtersLoad();
    this.statusSelect = this.statuses[0];
    this.typeSelect = this.types[0];
  },
  mounted() {
    if (this.isCreate) {
      this.load(this.$route.params.id);
    }
  },
};
</script>
