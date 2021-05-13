<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-ap">
    <div class="row-ap">
      <div class="col-12 pl-0 pr-0">
        <h1>{{ $t("knowledgebase.page_title") }}</h1>

        <div class="search-form">
          <b-row>
            <b-col order-lg="2" lg="auto">
              <b-button
                @click="openCreateModal"
                v-text="$t('knowledgebase.create')"
                block
              >
              </b-button>
            </b-col>
            <b-col order-md="1" col>
              <categories-search ref="searchForm" @search="search">
              </categories-search>
            </b-col>
          </b-row>
        </div>

        <v-server-table
          ref="categoriesTable"
          :url="apiUrl"
          :columns="tableColumns"
          :options="tableOptions"
          @row-click="handleView"
        >
          <template v-slot:prev_img="{ row }">
            <b-img v-if="row.img !== null" :src="imgUrl(row)"></b-img>
          </template>
          <template v-slot:category_id="{ row }">
            <a href="#" @click="openUpdateParentModal(row.category_id)">
              {{ row.category_title }}</a
            >
          </template>
          <template v-slot:status="{ row }">
            {{ row.status_title }}
          </template>
          <template v-slot:is_product="{ row }">
            {{ row.is_product_title }}
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
          <categories-form
            ref="categoriesForm"
            :internalId="formModal.id"
            @updated="updated"
            @created="created"
          >
          </categories-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/knowledgebase";
import CategoriesSearch from "@/components/knowledgebase/KnowledgebaseSearch";
import CategoriesForm from "@/components/knowledgebase/KnowledgebaseForm";
import TableActionButtons from "@/components/TableActionButtons";

export default {
  name: "knowledgebase",
  components: {
    CategoriesForm,
    CategoriesSearch,
    TableActionButtons,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      statuses: [],
      baseUrl: process.env.VUE_APP_API,
      apiUrl: Api.baseUrl,
      img_size: "?w=80&h=80",
      tableOptions: {
        perPage: 10,
        headings: {
          id: this.$t("knowledgebase.id"),
          title: this.$t("knowledgebase.title"),
          category_title: this.$t("knowledgebase.category_title"),
          prev_img: this.$t("knowledgebase.prev_img"),
          status: this.$t("knowledgebase.status"),
          actions: "",
        },
        sortable: ["id", "title", "category_title", "status"],
        columnsClasses: {
          id: "id",
          actions: "actions",
          prev_img: "prev_img",
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
      return [
        "id",
        "title",
        "category_title",
        "prev_img",
        "status",
        ...actions,
      ];
    },
  },
  methods: {
    imgUrl(rowItem) {
      return this.baseUrl + rowItem.prev_img.src + this.img_size;
    },
    searchRefresh() {
      this.$refs.searchForm.fetchFilters();
    },
    search(searchForm) {
      this.$set(this.tableOptions, "params", searchForm);
      this.$_table_debouncedRefresh();
    },
    refreshTable() {
      this.$refs.categoriesTable.getData();
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("knowledgebase.create");
    },
    openUpdateParentModal(id) {
      this.formModal.id = id;
      this.formModal.show = true;
      this.formModal.title = this.$t("knowledgebase.update");
    },
    openUpdateModal(row) {
      this.formModal.id = row.id;
      this.formModal.show = true;
      this.formModal.title = this.$t("knowledgebase.update");
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
        this.$t("knowledgebase.to_delete"),
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
