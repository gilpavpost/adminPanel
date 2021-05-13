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
        <b-form-group
          :label="$t('vacancy.labels.title')"
          label-for="titleInput"
        >
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
        <b-form-group :label="$t('vacancy.labels.content')">
          <editor :content="form.content" @content="setContent" />
          <b-form-invalid-feedback
            v-text="form.errors.get('content')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('vacancy.labels.order')"
          label-for="orderInput"
        >
          <b-form-input
            :state="form.isValid('order')"
            v-model="form.order"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('order')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('vacancy.labels.status')"
          label-for="statusInput"
        >
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
import Api from "@/api/v1/vacancy";
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
      statusSelect: null,
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
        content: "",
        img: "",
        order: "",
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
  },
  methods: {
    setContent(content) {
      this.form.content = content;
    },
    async load(id) {
      const response = await Api.getModel(id);
      this.form.load(response.data);
      this.statusSelect = this.statuses.find(
        (x) => String(x.id) === String(this.form.status)
      );
    },
    async filtersLoad() {
      const response = await Api.getFilters();
      this.statuses = response.data.statuses;
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
    }
    this.loading = false;
  },
};
</script>
