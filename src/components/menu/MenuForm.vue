<template>
  <b-form
    autocomplete="off"
    @keydown="form.errors.clear()"
    @submit.prevent="submit"
    @reset="reset"
  >
    <loading :active="loading" :is-full-page="false"> </loading>

    <b-form-row>
      <b-col md="12">
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
      <b-col md="12">
        <b-form-group
          :label="$t('menu.labels.alias')"
          label-for="categoryInput"
        >
          <multiselect
            v-model="aliasSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="aliases"
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
      <b-col md="12">
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
  </b-form>
</template>

<script>
import Form from "@/utils/Form";
import Api from "@/api/v1/menu";
import Multiselect from "vue-multiselect";
import editor from "@/components/editor";

export default {
  components: {
    Multiselect,
    editor,
  },
  props: {
    internalId: {
      default: null,
    },
  },
  data: function() {
    return {
      loading: false,
      statuses: [],
      aliases: [],
      statusSelect: null,
      aliasSelect: null,
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
    aliasSelect(newValue) {
      if (newValue !== undefined) {
        this.form.alias = newValue.id;
      }
    },
  },
  methods: {
    async load(id) {
      const response = await Api.getModel(id);
      this.form.load(response.data);
      this.statusSelect = this.statuses.find(
        (x) => String(x.id) === String(this.form.status)
      );
      this.aliasSelect = this.aliases.find(
        (x) => String(x.id) === String(this.form.alias)
      );
    },
    async filtersLoad() {
      const response = await Api.getFilters();
      this.statuses = response.data.statuses;
      this.aliases = response.data.aliases;
    },
    async submit() {
      try {
        if (this.form.id) {
          await Api.updateModel(this.form.id, this.form.data);
          this.$emit("updated");
        } else {
          await Api.createModel(this.form.data);
          this.$emit("created");
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
    if (this.internalId) {
      await this.load(this.internalId);
    } else {
      this.isNewForm = true;
      this.statusSelect = this.statuses[0];
      this.aliasSelect = this.aliases[0];
    }
    this.loading = false;
  },
};
</script>
