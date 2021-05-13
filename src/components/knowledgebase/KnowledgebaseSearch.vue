<template>
  <b-form>
    <b-form-row>
      <b-col md="1">
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.id"
            :placeholder="$t('knowledgebase.search.id')"
          ></b-form-input>
        </b-input-group>
      </b-col>

      <b-col>
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.title"
            :placeholder="$t('knowledgebase.search.title')"
          ></b-form-input>
        </b-input-group>
      </b-col>

      <b-col md="4">
        <multiselect
          v-model="searchCategoryTitle"
          track-by="id"
          label="title"
          :placeholder="$t('knowledgebase.search.category_title')"
          :options="categories"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.category_title !== ''"
              @mousedown.prevent.stop="
                clearField('category_title', 'searchCategoryTitle')
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
          :placeholder="$t('knowledgebase.search.status')"
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

    </b-form-row>
  </b-form>
</template>

<script>
import Multiselect from "vue-multiselect";
import Api from "@/api/v1/knowledgebase";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      loaded: false,
      searchCategoryTitle: null,
      searchStatus: null,
      categories: [],
      statuses: [],
      status: "",
      categorySelect: "",
      search: {
        status: "",
        category_title: "",
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
      this.statuses = response.data.statuses;
    },
    clearField(field, searchField) {
      this.search[field] = "";
      this[searchField] = null;
    },
  },
  watch: {
    searchCategoryTitle(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.category_title = newValue.id;
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
