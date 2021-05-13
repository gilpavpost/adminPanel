<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-ap">
  
      <div class="col-12 pl-0 pr-0">
        <h1>{{ $t("banners.page_title") }}</h1>
        <div class="search-form">
          <b-row>
            <b-col order-lg="2" lg="auto">
              <b-button
                @click="openCreateModal"
                v-text="$t('banners.create')"
                block
              >
              </b-button>
            </b-col>
            <b-col order-md="1" col>
              <search ref="searchForm" @search="search"> </search>
            </b-col>
          </b-row>
        </div>

        <v-server-table
          ref="bannersTable"
          :url="apiUrl"
          :columns="tableColumns"
          :options="tableOptions"
          @row-click="handleView"
        >
          <template v-slot:prev_img="{ row }">
            <b-img v-if="row.img !== null" :src="imgUrl(row)"></b-img>
          </template>
          <template v-slot:parent_id="{ row }">
            {{ row.parentTitle }}
          </template>
          <template v-slot:type="{ row }">
            {{ row.typeTitle }}
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
          <form-banner
            ref="bannersForm"
            :internalId="formModal.id"
            @updated="updated"
            @created="created"
          ></form-banner>
        </b-modal>
      </div>
  
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/banners";
import Search from "@/components/banners/Search";
import FormBanner from "@/components/banners/Form";
import TableActionButtons from "@/components/TableActionButtons";

export default {
  name: "banners",
  components: {
    FormBanner,
    Search,
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
          id: this.$t("banners.id"),
          title: this.$t("banners.title"),
          status: this.$t("banners.status"),
          actions: "",
        },
        sortable: ["id", "title", "status"],
        columnsClasses: {
          id: "id",
          actions: "actions",
          img: "img",
          header_img: "header_img",
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
      this.$refs.bannersTable.getData();
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("banners.create");
    },
    openUpdateModal(row) {
      this.formModal.id = row.id;
      this.formModal.show = true;
      this.formModal.title = this.$t("banners.update");
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.bannersForm.submit();
    },
    resetForm() {
      this.formModal.id = null;
    },
    async handleDelete(id, name) {
      const result = await this.$_notification_confirmDelete(
        this.$t("main.confirm.delete"),
        this.$t("banners.to_delete"),
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
