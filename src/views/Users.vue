<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="users">
    <div class="container-ap">
      <div class="row-ap">
        <div class="col-12 pl-0 pr-0">
          <div class="search-form">
            <b-row>
              <b-col order-lg="2" lg="auto">
                <b-button
                  @click="openCreateModal"
                  v-text="$t('users.create.user')"
                  block
                >
                </b-button>
              </b-col>
              <b-col order-md="1" col> </b-col>
            </b-row>
          </div>

          <v-server-table
            ref="usersTable"
            :url="apiUrl"
            @loaded="onLoaded"
            :columns="tableColumns"
            :options="tableOptions"
          >
            <template v-slot:profile.fullName="{ row }">
              <div @click="handleView({ row })">
                {{ row.profile.fullName }}
              </div>
              <div @click="handleView({ row })" class="small text-muted" v-if="!isEmpty(row.rights)">
                <span class="mr-2">
                  {{ $t("users.rights") }}:
                </span>
                <span class="mr-2" :key="i" v-for="(right, i) in row.rights">
                  {{ right.description }}
                </span>
              </div>
              <div @click="handleView({ row })" class="small text-muted" v-if="!isEmpty(row.departments)">
                <span class="mr-2">
                  {{ $t("users.departments") }}:
                </span>
                <span
                  class="mr-2"
                  :key="i"
                  v-for="(department, i) in row.departments"
                >
                  {{ department.department.title }}
                </span>
              </div>
            </template>

            <template v-slot:contacts="{ row }">
              <div @click="handleView({ row })" v-if="row.email">
                {{ row.email }}
              </div>
              <div @click="handleView({ row })" v-if="row.phone">
                {{ row.phone }}
              </div>
            </template>

            <template v-slot:actions="{ row }">
              <table-action-buttons
                :update-visible="false"
                :delete-visible="true"
                @delete="handleDelete(row.id)"
              >
              </table-action-buttons>
            </template>
          </v-server-table>
        </div>
      </div>
    </div>

    <b-modal
      lazy
      :ok-only="okOnly"
      v-model="formModal.show"
      :modal-class="getClassFormModal()"
      :size="getSizeFormModal()"
      :title="formModal.title"
      content-class="content-wrap"
      :okTitle="formModal.okTitle"
      :cancelTitle="$t('main.cancel')"
      @ok="wrapperHandlers"
    >
      <user @updated="updated" :userId="formModal.id"> </user>
    </b-modal>

    <b-modal
      lazy
      modal-class="modal-left"
      size="md"
      v-model="formModalProfile.show"
      :title="formModalProfile.title"
      :okTitle="$t('main.save')"
      :cancelTitle="$t('main.cancel')"
      @ok="handleSave"
    >
      <profile-form ref="profileForm" @updated="updated" @created="created">
      </profile-form>
    </b-modal>
  </div>
</template>

<script>
import Form from "@/utils/Form";
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/users";
import User from "@/components/users/User";
import TableActionButtons from "@/components/TableActionButtons";
import ProfileForm from "@/components/users/ProfileForm";

export default {
  name: "users",
  components: {
    User,
    TableActionButtons,
    ProfileForm,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      apiUrl: Api.baseUrl + "?expand=rights,departments.department",
      tableOptions: {
        perPage: 50,
        skin: "table table-sm table-hover",
        columnsClasses: {},
        headings: {
          "profile.fullName": this.$t("users.fullName"),
          contacts: this.$t("users.contacts"),
          actions: "",
        },
        params: {},
      },
      form: new Form(),
      okOnly: false,
      formModal: {
        id: null,
        show: false,
        name: "",
        surname: "",
        patronymic: "",
        okTitle: "",
      },
      formModalProfile: {
        show: false,
        title: "",
      },
    };
  },
  computed: {
    tableColumns() {
      const actions = ["actions"];
      return ["profile.fullName", "contacts", ...actions];
    },
  },
  methods: {
    isEmpty(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    },
    getClassFormModal() {
      const width = window.innerWidth;
      if (width < 768) {
        return "modal";
      } else {
        return "modal-left";
      }
    },
    getSizeFormModal() {
      const width = window.innerWidth;
      if (width >= 768 && width <= 991) {
        return "xl";
      } else {
        return "lg";
      }
    },

    onLoaded() {},
    wrapperHandlers() {},
    handleSearch() {
      this.okOnly = false;

      this.openUpdateModal(
        null,
        this.$t("users.search.title"),
        this.$t("main.search")
      );
    },
    handleAddUser() {
      this.okOnly = true;

      this.openUpdateModal(
        null,
        this.$t("users.view.title"),
        this.$t("main.cancel")
      );
    },
    // searchRefresh() {
    //   this.$refs.searchForm.fetchFilters();
    // },
    search(searchForm) {
      this.form = searchForm;
    },
    handleSearchUsers() {
      this.$set(this.tableOptions, "params", this.form.data);
      this.$_table_debouncedRefresh();
    },
    refreshTable() {
      this.$refs.usersTable.getData();
      this.selectAllPages = false;
      this.selectAll = false;
    },
    openCreateModal() {
      this.formModalProfile.show = true;
      this.formModalProfile.title = this.$t("users.create.title");
    },
    openUpdateModal(id, title = "", okTitle = "") {
      this.formModal.id = id;
      this.formModal.show = true;
      this.formModal.okTitle = okTitle;

      if (title == "") {
        this.formModal.title = "";
      } else {
        this.formModal.title = title;
      }
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.profileForm.submit();
    },
    handleClose(event) {
      event.preventDefault();
      this.formModal.show = false;
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
        this.refreshTable();
      }
    },
    created(id) {
      this.formModalProfile.show = false;
      this.openUpdateModal(
        id,
        this.$t("users.view.title"),
        this.$t("main.cancel")
      );

      this.$_notification_notify(this.$t("main.notifications.created"));
      this.saved();
    },
    updated() {
      // this.$_notification_notify(this.$t('main.notifications.updated'));
      this.saved();
    },
    giveTicketSave() {
      this.$_notification_notify(this.$t("main.notifications.updated"));
    },
    async saved() {
      this.refreshTable();
    },
    handleView({ row }) {
      this.okOnly = true;

      this.openUpdateModal(
        row.id,
        this.$t("users.view.title"),
        this.$t("main.cancel")
      );
    },
  },
  async beforeCreate() {},
};
</script>
