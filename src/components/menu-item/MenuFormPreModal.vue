<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform" :key="index">
  <div>
    <v-server-table
      class="col-12"
      ref="MenuTable"
      :url="apiUrl"
      :columns="tableColumns"
      :options="tableOptions"
      @row-click="handleView"
    >
      <template v-slot:status="{ row }">
        {{ row.status_title }}
      </template>
    </v-server-table>
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/menuEndpoint";
// import MenuItemSearch from "@/components/menu-item/MenuSearch";

export default {
  name: "menuItem",
  props: ["endpointApi"],
  components: {
    // MenuItemSearch,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],

  data() {
    return {
      isCreate: null,
      tableData: [],
      types: [],
      type: null,
      typeSelect: null,
      apiUrl: Api.baseUrl + this.endpointApi,
      selectOptions: {
        multiple: false,
        showNoOptions: false,
        showNoResults: false,
        selectLabel: "",
        selectedLabel: "",
        deselectLabel: "",
        openDirection: "bottom",
      },

      tableOptions: {
        perPage: 10,
        headings: {
          id: this.$t("menuItem.id"),
          title: this.$t("menuItem.title"),
          status: this.$t("menuItem.status"),
        },
        sortable: ["id", "title", "status"],
        columnsClasses: {
          id: "id",
          status: "status",
        },
        params: {},
      },
    };
  },
  computed: {
    tableColumns() {
      return ["id", "title", "status"];
    },
  },

  methods: {
    searchRefresh() {
      this.$refs.searchForm.fetchFilters();
    },
    search(searchForm) {
      this.$set(this.tableOptions, "params", searchForm);
      this.$_table_debouncedRefresh();
    },

    handleView({ row }) {
      this.$emit("selectSourceId", row.id);
      // this.openUpdateModal(row);
    },
  },
};
</script>
