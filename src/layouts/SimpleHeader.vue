<template>
  <section>
    <b-navbar toggleable="sm">
      <b-navbar-toggle target="top-menu"></b-navbar-toggle>

      <b-collapse is-nav id="top-menu">
        <b-navbar-nav class="ml-auto">
          <b-dropdown squared variant="link" class="my-nav" right no-caret>
            <template v-slot:button-content>
              <span class="micon micon__settings"></span>
            </template>

            <b-dropdown-item @click="openUpdateModal('users.permissions')">
              Права доступа
            </b-dropdown-item>
            <b-dropdown-item @click="openUpdateDepratmentsModal()">
              Отделы
            </b-dropdown-item>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal
      lazy
      ok-only
      v-model="formModalPermission.show"
      modal-class="modal-left"
      size="md"
      :title="formModalPermission.title"
      :okTitle="$t('main.cancel')"
      @ok="handleClose"
      okVariant="secondary"
    >
      <permissions-form
        ref="permissionsForm"
        @updated="updated"
      >
      </permissions-form>
    </b-modal>

  </section>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/modules/auth/actions";
import { mapGetters } from "vuex";
// import notificationMixin from "@/mixins/notification";
import PermissionsForm from "@/components/users/PermissionsForm";

export default {
  name: "SimpleHeader",
  components: {
    // notificationMixin,
    PermissionsForm,
  },
  data() {
    return {
      formModalPermission: {
        id: null,
        show: false,
        destination: null,
      },
      formModalDepartments: {
        id: null,
        show: false,
      },
    };
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push("/login");
      });
    },
    // eslint-disable-next-line
    openUpdateModal(destination) {
      this.formModalPermission.show = true;
      this.formModalPermission.title = this.$t(`permissions.title`);
    },
    handleClose(event) {
      event.preventDefault();
      this.formModal.show = false;
    },
    openUpdateDepratmentsModal() {
      this.formModalDepartments.show = true;
      this.formModalDepartments.title = this.$t(`departments.title`);
    },
    handleCloseDepartments(event) {
      event.preventDefault();
      this.formModalDepartments.show = false;
    },
    resetForm() {
      this.formModal.id = null;
    },
    updated() {
      this.$_notification_notify(this.$t("main.notifications.updated"));
      // this.saved();
    },
  },
  computed: {
    ...mapGetters({ profile: "getProfile" }),
  },
};
</script>

<style lang="scss">
.my-nav {
  .btn {
    padding: 0 !important;
  }
}
</style>