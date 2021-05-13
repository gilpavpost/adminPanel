<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform" :key="index">
  <div class="container-ap">
    <div class="row-ap">
      <div class="col-12 pl-0 pr-0">
        <div v-show="!isCreate">
          <template>
            <h1>
              {{ $t("menuItem.page_title_create") }}
            </h1></template
          >
        </div>
        <div v-show="isCreate">
          <h1>
            {{ $t("menuItem.page_title") + ` ` + this.tableData.title }}
          </h1>
        </div>

        <menu-item-form
          ref="pagesForm"
          @updated="updated"
          @created="created"
          v-bind:isCreate="isCreate"
        >
        </menu-item-form>

        <div v-show="this.isCreate">
          <div class="search-form">
            <b-form-row class="mb-3">
              <b-col md="6">
                <multiselect
                  v-model="typeSelect"
                  track-by="id"
                  label="title"
                  :placeholder="$t('main.pickAValue')"
                  :options="types"
                  :searchable="false"
                  :allow-empty="false"
                  v-bind="selectOptions"
                >
                  <template slot="singleLabel" slot-scope="{ option }">{{
                    option.title
                  }}</template>
                </multiselect>
              </b-col>
              <b-col md="6">
                <b-button
                  @click="openCreatePointModal"
                  v-text="$t('menuItem.create')"
                >
                </b-button>
              </b-col>

              <b-col md="6">
                <b-form-invalid-feedback
                  v-text="form.errors.get('type')"
                ></b-form-invalid-feedback>
              </b-col>
            </b-form-row>

            <menu-item-search ref="searchForm" @search="search">
            </menu-item-search>
          </div>

          <v-server-table
            ref="MenuTable"
            :url="apiUrl"
            :columns="tableColumns"
            :options="tableOptions"
            @row-click="handleView"
          >
            <template v-slot:parent_id="{ row }">
              {{ row.parent_title }}
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
        </div>

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
          <menu-item-modal-form
            ref="mainMenuItemForm"
            :externalId="this.type"
            :internalId="formModal.id"
            @updated="updated"
            @created="created"
          >
          </menu-item-modal-form>
        </b-modal>
        <b-modal
          lazy
          v-model="formPreModal.show"
          modal-class="modal-left"
          size="sm"
          :title="formModal.title"
          :okTitle="$t('main.save')"
          :cancelTitle="$t('main.cancel')"
          @ok="handleSave"
          @hidden="resetForm"
        >
          <menu-pre-form
            ref="mainMenuItemPreForm"
            :externalId="this.type"
            :endpointApi="this.formPreModal.endpointApi"
            :internalId="formModal.id"
            @selectSourceId="selectSourceId"
          >
          </menu-pre-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "@/utils/Form";
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/menu-item";
import MenuItemSearch from "@/components/menu-item/MenuSearch";
import MenuItemForm from "@/components/menu-item/MenuForm";
import MenuItemModalForm from "@/components/menu-item/MenuFormModal";
import MenuPreForm from "@/components/menu-item/MenuFormPreModal";
import TableActionButtons from "@/components/TableActionButtons";
import Multiselect from "vue-multiselect";

export default {
  name: "menuItem",
  components: {
    MenuItemForm,
    MenuItemModalForm,
    MenuItemSearch,
    MenuPreForm,
    TableActionButtons,
    Multiselect,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      isCreate: null,
      tableData: [],
      types: [],
      type: null,
      typeSelect: null,
      apiUrl: Api.baseUrl + `/item-index/${this.$route.params.id}`,
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
          parent_id: this.$t("menuItem.parent_id"),
          image: this.$t("menuItem.image"),
          sort: this.$t("menuItem.sort"),
          actions: "",
        },
        sortable: ["id", "title", "status", "sort", "parent_id"],
        columnsClasses: {
          id: "id",
          image: "img",
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
      formPreModal: {
        id: null,
        show: false,
        endpointApi: null,
        title: "",
      },
      form: new Form({
        id: null,
        title: "",
        alias: "",
        status: "",
      }),
    };
  },
  created() {
    this.$route.params.id ? (this.isCreate = true) : (this.isCreate = false);
    if (this.isCreate) {
      this.getMenuItems();
    }
  },
  computed: {
    tableColumns() {
      const actions = ["actions"];
      return [
        "id",
        "title",
        "parent_id",
        "image",
        "sort",
        "status",
        ...actions,
      ];
    },
  },
  watch: {
    typeSelect(newValue) {
      if (newValue !== undefined) {
        this.type = newValue.id;
      }
    },
  },
  methods: {
    async getMenuItems() {
      const response = await Api.getMenuItem(this.$route.params.id);
      const responseFilter = await Api.getItemFilters();
      this.types = responseFilter.data.types;
      this.tableData = response.data;
    },
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
    openCreatePointModal(source_id) {
      switch (this.type) {
        case 0:
          this.formPreModal.formModal.show = true;
          this.formPreModal.title = this.$t("menuItem.create");
          break;
        case 1:
          this.formPreModal.endpointApi = "main-news";
          this.formPreModal.source_id = source_id;
          this.formPreModal.show = true;
          this.formModal.title = this.$t("menuItem.create");
          break;
        case 2:
          this.formPreModal.endpointApi = "news";
          this.formPreModal.source_id = source_id;
          this.formPreModal.show = true;
          this.formModal.title = this.$t("menuItem.create");
          break;
        case 3:
          this.formPreModal.endpointApi = "pages";
          this.formPreModal.source_id = source_id;
          this.formPreModal.show = true;
          this.formModal.title = this.$t("menuItem.create");
          break;
        case 4:
          this.formPreModal.endpointApi = "categories";
          this.formPreModal.source_id = source_id;
          this.formPreModal.show = true;
          this.formPreModal.title = this.$t("menuItem.create");
          break;
        default:
          this.$_notification_notify(this.$t("main.error.noSelect"));
      }
    },
    openUpdateModal(row) {
      this.formModal.id = row.id;
      this.formModal.show = true;
      this.formModal.title = this.$t("menuItem.update");
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
        this.$t("menuItem.to_delete"),
        name
      );
      if (result.value) {
        await Api.deleteModel(id);
        this.$_notification_notify(this.$t("main.notifications.deleted"));
        this.searchRefresh();
        this.refreshTable();
      }
    },
    selectSourceId(source_id) {
      this.formPreModal.id = null;
      this.formPreModal.show = false;
      this.formModal.show = true;
      this.$_notification_notify(this.$t("main.notifications.created"));
      this.openCreatePointModal(source_id);
    },
    created(id) {
      this.$_notification_notify(this.$t("main.notifications.created"));
      this.isCreate = true;
      // this.saved();
      this.$router.push({ name: "menu-item", params: { id: id } });
      this.getMenuItems();
    },
    updated() {
      this.$_notification_notify(this.$t("main.notifications.updated"));
      this.saved();
    },
    async saved() {
      this.searchRefresh();
      this.refreshTable();
    },
    handleView({ row }) {
      this.openUpdateModal(row);
    },
  },
};
</script>
