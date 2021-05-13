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
        <b-form-group :label="$t('menuItem.labels.title')" label-for="titleInput">
          <b-form-input :state="form.isValid('title')" v-model="form.title">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('title')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

   <b-form-row v-if="externalId = 0">
      <b-col md="12">
        <b-form-group :label="$t('menuItem.labels.source_url')" label-for="source_urlInput">
          <b-form-input :state="form.isValid('source_url')" v-model="form.source_url">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('source_url')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>


    <b-form-row v-if="externalId <=0">
      <b-col md="12">
        <b-form-group :label="$t('menuItem.labels.source_title')" label-for="source_titleInput">
          <b-form-input :state="form.isValid('source_title')" v-model="form.source_title">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('source_title')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

        <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('menuItem.labels.menu_id')" label-for="menu_idInput">
          <b-form-input :state="form.isValid('source_title')" v-model="form.menu_id">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('menu_id')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>


    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('menuItem.labels.parent_id')"
          label-for="parent_idInput"
        >
          <multiselect
            v-model="parent_idSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="parent_id"
            :searchable="true"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="firstLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('parent_id')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

        <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('menuItem.labels.sort')" label-for="sortInput">
          <b-form-input :state="form.isValid('sort')" v-model="form.sort">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('sort')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>


    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('menuItem.labels.in_new_window')" label-for="windowInput">
          <multiselect
            v-model="windowSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="in_new_window"
            :searchable="false"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('in_new_window')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>


    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('menuItem.labels.status')" label-for="statusInput">
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
import Api from "@/api/v1/menu-item";
import Multiselect from "vue-multiselect";
// import editor from "@/components/editor";

export default {
  components: {
    Multiselect,
    // editor,
  },
  props: {
    externalId: {
      default: null,
    },
    internalId: {
      default: null,
    },
  },
  data: function () {
    return {
      loading: false,
      statuses: [],
      types: [],
      in_new_window: [],
      menus: [],
      statusSelect: null,
      typeSelect: null,
      windowSelect: null,
      menuSelect: null,
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
        source_url: "",
        source_title: "",
        source_id: "",
        menu_id: "",
        parent_id: "",
        sort: "",
        in_new_window: "",
        image: "",
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
        this.form.type = newValue.id;
      }
    },
        menuSelect(newValue) {
      if (newValue !== undefined) {
        this.form.menu = newValue.id;
      }
    },
        windowSelect(newValue) {
      if (newValue !== undefined) {
        this.form.in_new_window = newValue.id;
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
