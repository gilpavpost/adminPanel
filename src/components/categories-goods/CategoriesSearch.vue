<template>
  <b-form>
    <b-form-row>
      <b-col md="1">
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.id"
            :placeholder="$t('categoriesGoods.search.id')"
          ></b-form-input>
        </b-input-group>
      </b-col>

      <b-col>
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.title"
            :placeholder="$t('categoriesGoods.search.title')"
          ></b-form-input>
        </b-input-group>
      </b-col>

      <b-col md="4">
        <multiselect
          v-model="searchParent_id"
          track-by="id"
          label="title"
          :placeholder="$t('categoriesGoods.search.parent_id')"
          :options="categories"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.parent_id !== ''"
              @mousedown.prevent.stop="
                clearField('parent_id', 'searchParent_id')
              "
            >
              <font-awesome-icon icon="times"></font-awesome-icon>
            </div>
          </template>
        </multiselect>
      </b-col>

      <b-col>
        <multiselect
          v-model="searchProduct"
          track-by="id"
          label="title"
          :placeholder="$t('categoriesGoods.search.is_product')"
          :options="nomenclature_types"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.is_product !== ''"
              @mousedown.prevent.stop="
                clearField('is_product', 'searchProduct')
              "
            >
              <font-awesome-icon icon="times"></font-awesome-icon>
            </div>
          </template>
        </multiselect>
      </b-col>

      <b-col>
        <multiselect
          v-model="searchStatus"
          track-by="id"
          label="title"
          :placeholder="$t('categoriesGoods.search.status')"
          :options="statuses"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.status !== ''"
              @mousedown.prevent.stop="clearField('status', 'searchStatus')"
            >
              <font-awesome-icon icon="times"></font-awesome-icon>
            </div>
          </template>
        </multiselect>
      </b-col>

      <!-- End form -->
    </b-form-row>
  </b-form>
</template>

<script>
import Multiselect from "vue-multiselect";
import Api from "@/api/v1/categories-goods";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      loaded: false,
      searchParent_id: null,
      searchProduct: null,
      searchStatus: null,
      nomenclature_types: [],
      categories: [],
      statuses: [],
      status: "",
      is_product: "",
      categorySelect: "",
      search: {
        is_product: "",
        status: "",
        parent_id: "",
        title: "",
        id: "",
      },
      selectOptions: {
        multiple: false,
        showNoOptions: false,
        showNoResults: false,
        selectLabel: "",
        selectedLabel: "",
        deselectLabel: "",
        openDirection: "bottom",
      },
    };
  },
  computed: {},
  methods: {
    async fetchFilters() {
      this.loaded = true;
      const response = await Api.getFilters();
      this.categories = response.data.categories;
      this.nomenclature_types = response.data.nomenclature_types;
      this.statuses = response.data.statuses;
    },
    clearField(field, searchField) {
      this.search[field] = "";
      this[searchField] = null;
    },
  },
  watch: {
    searchParent_id(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.parent_id = newValue.id;
      }
    },
    searchProduct(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.is_product = newValue.id;
      }
    },
    searchStatus(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.status = newValue.id;
      }
    },
    search: {
      handler(value) {
        this.$emit("search", value);
      },
      deep: true,
    },
  },
  created() {
    this.fetchFilters();
  },
};
</script>
