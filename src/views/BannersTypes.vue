<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-ap">
    <div class="row-ap">
      <div class="col-12 pl-0 pr-0">
        <h1>{{ $t("bannersTypes.page_title") }}</h1>

        <div class="search-form">
          <b-row>
            <b-col order-lg="2" lg="auto">
              <b-button
                @click="openCreateModal"
                v-text="$t('bannersTypes.create')"
                block
              >
              </b-button>
            </b-col>
            <b-col order-md="1" col>
              <banners-types-search ref="searchForm" @search="search">
              </banners-types-search>
            </b-col>
          </b-row>
        </div>

        <v-server-table
          ref="bannersTypesTable"
          :url="apiUrl"
          :columns="tableColumns"
          :options="tableOptions"
          @row-click="handleView"
        >
          <template v-slot:type="{ row }">
            {{ row.typeTitle }}
          </template>
          <template v-slot:banner_id="{ row }">
            {{ row.banner_title }}
          </template>
          <template v-slot:status="{ row }">
            {{ row.statusTitle }}
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
          <banners-types-form
            ref="categoriesForm"
            :internalId="formModal.id"
            @updated="updated"
            @created="created"
          >
          </banners-types-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/banners-types";
import BannersTypesSearch from "@/components/banners-types/BannersTypesSearch";
import BannersTypesForm from "@/components/banners-types/BannersTypesForm";
import TableActionButtons from "@/components/TableActionButtons";

export default {
  name: "bannersTypes",
  components: {
    BannersTypesForm,
    BannersTypesSearch,
    TableActionButtons,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      statuses: [],
      apiUrl: Api.baseUrl,
      tableOptions: {
        perPage: 10,
        headings: {
          id: this.$t("bannersTypes.id"),
          title: this.$t("bannersTypes.title"),
          banner_id: this.$t("bannersTypes.banner_id"),
          sort: this.$t("bannersTypes.sort"),
          type: this.$t("bannersTypes.type"),
          status: this.$t("bannersTypes.status"),
          actions: "",
        },
        sortable: ["id", "title", "banner_id", "status", "type", "sort"],
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
      return ["id", "title", "banner_id", "type", "sort", "status", ...actions];
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
      this.$refs.bannersTypesTable.getData();
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("bannersTypes.create");
    },
    openUpdateParentModal(id) {
      this.formModal.id = id;
      this.formModal.show = true;
      this.formModal.title = this.$t("bannersTypes.update");
    },
    openUpdateModal(row) {
      this.formModal.id = row.id;
      this.formModal.show = true;
      this.formModal.title = this.$t("bannersTypes.update");
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.categoriesForm.submit();
    },
    resetForm() {
      this.formModal.id = null;
    },
    async handleDelete(id, name) {
      const result = await this.$_notification_confirmDelete(
        this.$t("main.confirm.delete"),
        this.$t("bannersTypes.to_delete"),
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
