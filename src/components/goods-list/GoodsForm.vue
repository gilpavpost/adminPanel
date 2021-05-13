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
          :label="$t('goodsList.labels.title')"
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
          :label="$t('goodsList.labels.title_short')"
          label-for="title_shortInput"
        >
          <b-form-input
            :state="form.isValid('title_short')"
            v-model="form.title_short"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('title_short')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('goodsList.labels.sid')" label-for="sidInput">
          <b-form-input :state="form.isValid('sid')" v-model="form.sid">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('sid')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <!-- Не вывожу т.к. составной -->
    <!-- <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('goodsList.labels.alias')"
          label-for="aliasInput"
        >
          <b-form-input :state="form.isValid('alias')" v-model="form.alias">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('alias')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row> -->

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('goodsList.labels.article')"
          label-for="articleInput"
        >
          <b-form-input :state="form.isValid('article')" v-model="form.article">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('article')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('goodsList.labels.category_id')"
          label-for="category_idInput"
        >
          <multiselect
            v-model="categorySelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="filteredCategories()"
            :searchable="true"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="firstLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('category_id')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('goodsList.labels.discription')">
          <editor :content="form.description" @content="setContent" />
          <b-form-invalid-feedback
            v-text="form.errors.get('discription')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <!-- SEO BLOCK START -->
    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('goodsList.labels.seo_title')"
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
        <b-form-group :label="$t('goodsList.labels.img')">
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

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('goodsList.labels.seo_discription')"
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
          :label="$t('goodsList.labels.seo_keywords')"
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
    <!-- SEO BLOcK END -->
    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('goodsList.labels.price')"
          label-for="priceInput"
        >
          <b-form-input :state="form.isValid('price')" v-model="form.price">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('price')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('goodsList.labels.price_old')"
          label-for="price_oldInput"
        >
          <b-form-input
            :state="form.isValid('price_old')"
            v-model="form.price_old"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('price_old')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('goodsList.labels.quantity')"
          label-for="quantityInput"
        >
          <b-form-input
            :state="form.isValid('quantity')"
            v-model="form.quantity"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('quantity')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('goodsList.labels.type')"
          label-for="typeInput"
        >
          <multiselect
            v-model="typesSelect"
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

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('goodsList.labels.group')"
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
        <b-form-group
          :label="$t('goodsList.labels.status')"
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
import Api from "@/api/v1/goods-list";
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
  data: function () {
    return {
      loading: false,
      statuses: [],
      types: [],
      categories: [],
      statusSelect: null,
      typesSelect: null,
      categorySelect: null,
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
        title_short: "",
        alias: "",
        sid: "",
        article: "",
        category_id: "",
        img: "",
        description: "",
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
        price: "",
        price_old: "",
        quantity: "",
        type: "",
        group: "",
        // related: "",
        status: "0",
      }),
    };
  },
  watch: {
    statusSelect(newValue) {
      if (newValue !== undefined) {
        this.form.status = newValue.id;
      }
    },
    typesSelect(newValue) {
      if (newValue !== undefined) {
        this.form.type = newValue.id;
      }
    },
    categorySelect(newValue) {
      if (newValue !== undefined) {
        this.form.category_id = newValue.id;
      }
    },
  },
  methods: {
    filteredCategories() {
      return this.categories.filter((el) => el !== this.categorySelect);
    },
    setImg(content) {
      (this.Form.img = content), (this.form.img = content.src);
    },
    setContent(content) {
      this.form.description = content;
    },
    async load(id) {
      const response = await Api.getModel(id);
      this.form.load(response.data);
      this.statusSelect = this.statuses.find(
        (x) => String(x.id) === String(this.form.status)
      );
      this.typesSelect = this.types.find(
        (x) => String(x.id) === String(this.form.type)
      );
      this.categorySelect = this.categories.find(
        (x) => String(x.id) === String(this.form.category_id)
      );
    },
    async filtersLoad() {
      const response = await Api.getFilters();
      this.statuses = response.data.statuses;
      this.types = response.data.types;
      this.categories = response.data.categories;
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
      this.categorySelect = this.categories[0];
      this.typesSelect = this.types[0];
    }
    this.loading = false;
  },
};
</script>
