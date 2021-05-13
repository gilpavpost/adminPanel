<template>
  <b-form>
    <b-form-row>



<b-col md="1">
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.id"
            :placeholder="$t('settingsSite.search.id')"
          ></b-form-input>
        </b-input-group>
      </b-col>

      <b-col>
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.title"
            :placeholder="$t('settingsSite.search.title')"
          ></b-form-input>
        </b-input-group>
      </b-col>

     <b-col>
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.group"
            :placeholder="$t('settingsSite.search.group')"
          ></b-form-input>
        </b-input-group>
      </b-col>
     

            <b-col>
        <multiselect
          v-model="searchType"
          track-by="id"
          label="title"
          :placeholder="$t('settingsSite.search.types')"
          :options="types"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.type !== ''"
              @mousedown.prevent.stop="
                clearField('type', 'searchType')
              "
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
import Api from "@/api/v1/settings-site";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      loaded: false,
      searchType: null,
      types: [],
      type: "",
      search: {
        id: "",
        title: "",
        group: "",
        type: "",
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
    },
    clearField(field, searchField) {
      this.search[field] = "";
      this[searchField] = null;
    },
  },
  watch: {
    searchType(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.type = newValue.id;
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
