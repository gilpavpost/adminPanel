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
          :label="$t('settingsSite.labels.title')"
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
        <b-form-group
          :label="$t('settingsSite.labels.alias')"
          label-for="aliasInput"
        >
          <b-form-input :state="form.isValid('alias')" v-model="form.alias">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('alias')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('settingsSite.labels.group')"
          label-for="groupInput"
        >
          <b-form-input :state="form.isValid('group')" v-model="form.group">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('group')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group label-for="typeInput">
          <multiselect
            v-model="typeSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="types"
            :searchable="false"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('type')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <template v-if="typeSelect.id == 0">
      <b-form-row>
        <b-col md="12">
          <b-form-group label-for="dataInput">
            <b-form-input :state="form.isValid('data')" v-model="form.content">
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('data')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>
    <template v-if="typeSelect.id == 5">
      <b-form-row>
        <b-col md="12">
          <b-form-group>
            <editor :content="form.content" @content="setContent" />
            <b-form-invalid-feedback
              v-text="form.errors.get('data')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>
    <template v-if="typeSelect.id == 10">
      <b-form-row>
        <b-col md="12">
          <b-form-group label-for="dataInput">
            <b-form-input :state="form.isValid('data')" v-model="form.content">
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('data')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>
    <template v-if="typeSelect.id == 20">
      <b-form-row>
        <b-col md="12">
          <b-form-group label-for="dataInput">
            <b-form-input :state="form.isValid('data')" v-model="form.content">
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('data')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>
    <template v-if="typeSelect.id == 30">
      <b-form-row>
        <b-col md="12">
          <b-form-group label-for="dataInput">
            <b-form-input :state="form.isValid('data')" v-model="form.content">
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('data')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>
    <template v-if="typeSelect.id == 40">
      <b-form-row>
        <b-col md="12">
          <b-form-group :label="$t('settingsSite.labels.img')">
            <b-form-file
              v-model="setImg"
              
              :placeholder="$t('main.load_img')"
            ></b-form-file>
            <b-form-invalid-feedback
              v-text="form.errors.get('img')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>
  </b-form>
</template>

<script>
import Form from "@/utils/Form";
import Api from "@/api/v1/settings-site";
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
      typeSelect: false,
      types: [],
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
        group: "",
        type: "",
        content: "",
      }),
    };
  },
  watch: {
    typeSelect(newValue) {
      if (newValue !== undefined) {
        this.form.type = newValue.id;
      }
    },
  },
  methods: {
    setImg(content) {
      (this.Form.img = content), (this.Form.img.src = content.src);
    },
    setContent(content) {
      this.form.content = content;
    },
    async load(id) {
      const response = await Api.getModel(id);
      this.form.load(response.data);
      this.typeSelect = this.types.find(
        (x) => String(x.id) === String(this.form.type)
      );
    },
    async filtersLoad() {
      const response = await Api.getFilters();
      this.types = response.data.types;
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
    await this.filtersLoad();
    this.loading = true;
    if (this.internalId) {
      await this.load(this.internalId);
    } else {
      this.isNewForm = true;
            this.typeSelect = this.types[0];
    }
    this.loading = false;
  },
};
</script>
