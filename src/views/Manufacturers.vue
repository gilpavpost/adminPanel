<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-ap">
    <div class="row-ap">
      <div class="col-12 pl-0 pr-0">
        <h1>{{ $t("manufacturers.manufacturers") }}</h1>

        <div class="search-form">
          <b-row>
            <b-col v-if="$can('manufacturers/create')" order-lg="2" lg="auto">
              <b-button
                @click="openCreateModal"
                v-text="$t('manufacturers.create')"
                block
              >
              </b-button>
            </b-col>
            <b-col order-md="1" col>
              <manufacturers-search ref="searchForm" @search="search">
              </manufacturers-search>
            </b-col>
          </b-row>
        </div>

        <v-server-table
          ref="manufacturersTable"
          :url="apiUrl"
          :columns="tableColumns"
          :options="tableOptions"
          @row-click="handleView"
        >
          <template v-slot:title="{ row }">
            {{ row.title }}
          </template>
          <template v-slot:actions="{ row }">
            <table-action-buttons
              :update-visible="$can('manufacturers/update')"
              :delete-visible="$can('manufacturers/delete')"
              @update="openUpdateModal(row)"
              @delete="handleDelete(row.id)"
            >
            </table-action-buttons>
          </template>
        </v-server-table>

        <b-modal
          lazy
          v-model="formModal.show"
          modal-class="modal-left"
          size="sm"
          :title="formModal.title"
          :okTitle="$t('main.save')"
          :cancelTitle="$t('main.cancel')"
          @ok="handleSave"
          @hidden="resetForm"
        >
          <manufacturers-form
            ref="manufacturersForm"
            :internalId="formModal.id"
            :categoryId="formModal.category_id"
            @updated="updated"
            @created="created"
          >
          </manufacturers-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/manufacturers";
import ManufacturersSearch from "@/components/manufacturers/ManufacturersSearch";
import ManufacturersForm from "@/components/manufacturers/ManufacturersForm";
import TableActionButtons from "@/components/TableActionButtons";

export default {
  name: "manufacturers",
  components: {
    ManufacturersForm,
    ManufacturersSearch,
    TableActionButtons,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      apiUrl: Api.baseUrl,
      tableOptions: {
        perPage: 10,
        headings: {
          id: this.$t("manufacturers.id"),
          title: this.$t("manufacturers.title"),
          categoryTitle: this.$t("manufacturers.categoryTitle"),
          actions: "",
        },
        sortable: ["id", "title", "categoryTitle"],
        params: {},
      },
      formModal: {
        id: null,
        category_id: null,
        show: false,
        title: "",
      },
    };
  },
  computed: {
    tableColumns() {
      const actions =
        this.$can("manufacturers/delete") || this.$can("manufacturers/update")
          ? ["actions"]
          : [];
      return ["id", "title", "categoryTitle", ...actions];
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
    refreshTable() {
      this.$refs.manufacturersTable.getData();
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("manufacturers.create");
    },
    openUpdateModal(row) {
      this.formModal.id = row.id;
      this.formModal.category_id = row.category_id;
      this.formModal.show = true;
      this.formModal.title = this.$t("manufacturers.update");
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.manufacturersForm.submit();
    },
    resetForm() {
      this.formModal.id = null;
    },
    async handleDelete(id) {
      const result = await this.$_notification_confirmDelete(
        this.$t("main.confirm.delete")
      );
      if (result.value) {
        await Api.deleteModel(id);
        this.$_notification_notify(this.$t("main.notifications.deleted"));
        this.searchRefresh();
        this.refreshTable();
      }
    },
    created() {
      this.$_notification_notify(this.$t("main.notifications.created"));
      this.saved();
    },
    updated() {
      this.$_notification_notify(this.$t("main.notifications.updated"));
      this.saved();
    },
    async saved() {
      this.formModal.show = false;
      this.searchRefresh();
      this.refreshTable();
    },
    handleView({ row }) {
      this.openUpdateModal(row);
    },
  },
};
</script>
