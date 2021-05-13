<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-ap">
    <div class="row-ap">
      <div class="col-12 pl-0 pr-0">
        <h1>{{ $t("menu.page_title") }}</h1>

        <div class="search-form">
          <b-row>
            <b-col order-lg="2" lg="auto">
              <b-button
                @click="openCreateModal"
                v-text="$t('menu.create')"
                block
              >
              </b-button>
            </b-col>
            <b-col order-md="1" col>
              <menu-search ref="searchForm" @search="search"> </menu-search>
            </b-col>
          </b-row>
        </div>

        <v-server-table
          ref="MenuTable"
          :url="apiUrl"
          :columns="tableColumns"
          :options="tableOptions"
          @row-click="handleView"
        >
          <template v-slot:alias="{ row }">
            {{ row.alias_title }}
          </template>
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
          <menu-form
            ref="MenuForm"
            :internalId="formModal.id"
            @updated="updated"
            @created="created"
          >
          </menu-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/menu";
import MenuSearch from "@/components/menu/MenuSearch";
import MenuForm from "@/components/menu/MenuForm";
import TableActionButtons from "@/components/TableActionButtons";

export default {
  name: "menu",
  components: {
    MenuForm,
    MenuSearch,
    TableActionButtons,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {

      statuses: [],
      aliases: [],
      apiUrl: Api.baseUrl,
      tableOptions: {
        perPage: 10,
        headings: {
          id: this.$t("menu.id"),
          title: this.$t("menu.title"),
          alias: this.$t("menu.alias"),
          status: this.$t("menu.status"),
          actions: "",
        },
        sortable: ["id", "title", "alias", "status"],
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
      return ["id", "title", "alias", "status", ...actions];
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
      this.$refs.MenuTable.getData();
    },
    openCreateModal() {
      this.$router.push("/menu-item-create");
      // this.formModal.title = this.$t("menu.create");
    },
    openUpdateModal(row) {
      // this.formModal.id = row.id;
         this.$router.push({ name: 'menu-item', params: { id: row.id }});
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.MenuForm.submit();
    },
    resetForm() {
      this.formModal.id = null;
    },
    async handleDelete(id, name) {
      const result = await this.$_notification_confirmDelete(
        this.$t("main.confirm.delete"),
        this.$t("menu.to_delete"),
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
