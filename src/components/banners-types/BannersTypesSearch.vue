<template>
  <b-form>
    <b-form-row>
      <b-col md="1">
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.id"
            :placeholder="$t('bannersTypes.search.id')"
          ></b-form-input>
        </b-input-group>
      </b-col>

      <b-col>
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.title"
            :placeholder="$t('bannersTypes.search.title')"
          ></b-form-input>
        </b-input-group>
      </b-col>

      <b-col md="4">
        <multiselect
          v-model="searchBanners"
          track-by="id"
          label="title"
          :placeholder="$t('bannersTypes.search.banners')"
          :options="banners"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.banner_id !== ''"
              @mousedown.prevent.stop="
                clearField('banner_id', 'searchBanners')
              "
            >
              <font-awesome-icon icon="times"></font-awesome-icon>
            </div>
          </template>
        </multiselect>
      </b-col>

      <b-col>
        <multiselect
          v-model="searchTypes"
          track-by="id"
          label="title"
          :placeholder="$t('bannersTypes.search.type')"
          :options="types"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.type !== ''"
              @mousedown.prevent.stop="clearField('type', 'searchTypes')"
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
          :placeholder="$t('bannersTypes.search.status')"
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
import Api from "@/api/v1/banners-types";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      loaded: false,
      searchBanners: null,
      searchTypes: null,
      searchStatus: null,
      searchMenus: null,
      types: [],
      banners: [],
      menus: [],
      statuses: [],
      search: {
        type: "",
        status: "",
        title: "",
        menus: "",
        banner_id: "",
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
      this.types = response.data.types;
      this.statuses = response.data.statuses;
      this.menus = response.data.menus;
      this.banners = response.data.banners;
    },
    clearField(field, searchField) {
      this.search[field] = "";
      this[searchField] = null;
    },
  },
  watch: {
    searchBanners(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.banner_id = newValue.id;
      }
    },
    searchTypes(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.type = newValue.id;
      }
    },
    searchStatus(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.status = newValue.id;
      }
    },
    searchMenus(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.menus = newValue.id;
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
