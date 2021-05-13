<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-ap">
    <div class="row-ap">
      <div class="col-12 pl-0 pr-0">
        <h1>{{ $t("pages.page_title") }}</h1>

        <div class="search-form">
          <b-row>
            <b-col order-lg="2" lg="auto">
              <b-button
                @click="openCreateModal"
                v-text="$t('pages.create')"
                block
              >
              </b-button>
            </b-col>
            <b-col order-md="1" col>
              <pages-search ref="searchForm" @search="search"> </pages-search>
            </b-col>
          </b-row>
        </div>

        <v-server-table
          ref="pagesTable"
          :url="apiUrl"
          :columns="tableColumns"
          :options="tableOptions"
          @row-click="handleView"
        >
          <template v-slot:status="{ row }">
            {{ row.status_title }}
          </template>

          <template v-slot:actions="{ row }">
            <table-action-buttons
              :update-visible="true"
              :delete-visible="true"
              @update="openUpdateModal(row)"
              @delete="handleDelete(row.id, row.title)"
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
          <pages-form
            ref="pagesForm"
            :internalId="formModal.id"
            @updated="updated"
            @created="created"
          >
          </pages-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/pages";
import PagesSearch from "@/components/pages/PagesSearch";
import PagesForm from "@/components/pages/PagesForm";
import TableActionButtons from "@/components/TableActionButtons";

export default {
  name: "pages",
  components: {
    PagesForm,
    PagesSearch,
    TableActionButtons,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      statuses: [],
      baseUrl: process.env.VUE_APP_API,
      img_size: "?w=80&h=80",
      apiUrl: Api.baseUrl,
      tableOptions: {
        perPage: 10,
        headings: {
          id: this.$t("pages.id"),
          title: this.$t("pages.title"),
          status: this.$t("pages.status"),
          actions: "",
        },
        sortable: ["id", "title", "status"],
        columnsClasses: {
          id: "id",
          actions: "actions",
          status: "status",
        },
        params: {},
      },
      formModal: {
        id: null,
        show: false,
        title: "",
      },
    };
  },
  computed: {
    tableColumns() {
      const actions = ["actions"];
      return ["id", "title", "status", ...actions];
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
      this.$refs.pagesTable.getData();
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("pages.create");
    },
    openUpdateModal(row) {
      this.formModal.id = row.id;
      this.formModal.show = true;
      this.formModal.title = this.$t("pages.update");
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.pagesForm.submit();
    },
    resetForm() {
      this.formModal.id = null;
    },
    async handleDelete(id, name) {
      const result = await this.$_notification_confirmDelete(
        this.$t("main.confirm.delete"),
        this.$t("pages.to_delete"),
        name
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
