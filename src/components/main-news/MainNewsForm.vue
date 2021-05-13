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
        <b-form-group :label="$t('mainNews.labels.title')" label-for="titleInput">
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
        <b-form-group :label="$t('mainNews.labels.img')">
          <b-form-file
            v-model="setImg"
            :state="true"
            :placeholder="$t('main.load_img')"
          ></b-form-file>
          <b-form-invalid-feedback
            v-text="form.errors.get('og_image')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <!-- SEO blOck START -->

    <button
      class="btn btn-link mb-3"
      @click.prevent="isSeoFieldsShown = !isSeoFieldsShown"
    >
      Дополнительные поля для SEO
    </button>
    <div v-if="isSeoFieldsShown">
      <b-form-row>
        <b-col md="12">
          <b-form-group
            :label="$t('main.seo_title')"
            label-for="seo_titleInput"
          >
            <b-form-input
              :state="form.isValid('seo_title')"
              v-model="form.seo_title"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('seo_title')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col md="12">
          <b-form-group
            :label="$t('main.seo_discription')"
            label-for="seo_discriptionInput"
          >
            <b-form-input
              :state="form.isValid('seo_discription')"
              v-model="form.seo_discription"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('seo_discription')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col md="12">
          <b-form-group
            :label="$t('main.seo_keywords')"
            label-for="seo_keywordsInput"
          >
            <b-form-input
              :state="form.isValid('seo_keywords')"
              v-model="form.seo_keywords"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('seo_keywords')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col md="12">
          <b-form-group :label="$t('main.og_type')" label-for="og_typeInput">
            <b-form-input
              :state="form.isValid('og_type')"
              v-model="form.og_type"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('og_type')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col md="12">
          <b-form-group
            :label="$t('main.og_discription')"
            label-for="og_discriptionInput"
          >
            <b-form-input
              :state="form.isValid('og_discription')"
              v-model="form.og_discription"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('og_discription')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col md="12">
          <b-form-group :label="$t('main.og_url')" label-for="og_urlInput">
            <b-form-input :state="form.isValid('og_url')" v-model="form.og_url">
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('og_url')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col md="12">
          <b-form-group
            :label="$t('main.og_site_name')"
            label-for="seo_discriptionInput"
          >
            <b-form-input
              :state="form.isValid('og_site_name')"
              v-model="form.og_site_name"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('og_site_name')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col md="12">
          <b-form-group :label="$t('main.og_image')">
            <b-form-file
              v-model="setImg"
              :state="true"
              :placeholder="$t('main.load_img')"
            ></b-form-file>
            <b-form-invalid-feedback
              v-text="form.errors.get('og_image')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col md="12">
          <b-form-group :label="$t('main.og_title')" label-for="og_titleInput">
            <b-form-input
              :state="form.isValid('og_title')"
              v-model="form.og_title"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('og_title')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </div>
    <!-- SEO END -->

    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('mainNews.labels.status')" label-for="statusInput">
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
import Api from "@/api/v1/main-news";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  props: {
    internalId: {
      default: null,
    },
  },
  data: function() {
    return {
      loading: false,
      isSeoFieldsShown: false,
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
        img: "",
        status: "",
        //SEO FIELDS
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
        og_site_name: "",
        og_title: "",
        og_type: "website",
        og_image: "",
        og_url: "",
        og_description: "",
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
    setImg(content) {
      (this.Form.img = content), (this.form.img = content.src);
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
