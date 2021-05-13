<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-ap">
    <div class="row-ap">
      <div class="col-12 pl-0 pr-0">
        <h1>{{ $t("vacancy.page_title") }}</h1>
        <div class="search-form">
          <b-row>
            <b-col order-lg="2" lg="auto">
              <b-button
                @click="openCreateModal"
                v-text="$t('vacancy.create')"
                block
              >
              </b-button>
            </b-col>
            <b-col order-md="1" col>
              <vacancy-search ref="searchForm" @search="search">
              </vacancy-search>
            </b-col>
          </b-row>
        </div>

        <v-server-table
          ref="vacancyTable"
          :url="apiUrl"
          :columns="tableColumns"
          :options="tableOptions"
          @row-click="handleView"
        >
          <template v-slot:img="{ row }">
            <b-img v-if="row.img !== null" :src="imgUrl(row)"></b-img>
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
          <vacancy-form
            ref="vacancyForm"
            :internalId="formModal.id"
            @updated="updated"
            @created="created"
          >
          </vacancy-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/vacancy";
import VacancySearch from "@/components/vacancy/VacancySearch";
import VacancyForm from "@/components/vacancy/VacancyForm";
import TableActionButtons from "@/components/TableActionButtons";

export default {
  name: "vacancy",
  components: {
    VacancyForm,
    VacancySearch,
    TableActionButtons,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      baseUrl: process.env.VUE_APP_API,
      apiUrl: Api.baseUrl,
      img_size: "?w=80&h=80",
      tableOptions: {
        perPage: 10,
        headings: {
          id: this.$t("vacancy.id"),
          title: this.$t("vacancy.title"),
          img: this.$t("vacancy.img"),
          status: this.$t("vacancy.status"),
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
      return ["id", "title", "img", "status", ...actions];
    },
  },
  methods: {
    imgUrl(rowItem) {
      return this.baseUrl + rowItem.img.src + this.img_size;
    },
    searchRefresh() {
      this.$refs.searchForm.fetchFilters();
    },
    search(searchForm) {
      this.$set(this.tableOptions, "params", searchForm);
      this.$_table_debouncedRefresh();
    },
    refreshTable() {
      this.$refs.vacancyTable.getData();
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("vacancy.create");
    },
    openUpdateModal(row) {
      this.formModal.id = row.id;
      this.formModal.show = true;
      this.formModal.title = this.$t("vacancy.update");
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.vacancyForm.submit();
    },
    resetForm() {
      this.formModal.id = null;
    },
    async handleDelete(id, name) {
      const result = await this.$_notification_confirmDelete(
        this.$t("main.confirm.delete"),
        this.$t("vacancy.to_delete"),
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
