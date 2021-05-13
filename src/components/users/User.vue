<template>
  <div class="container-fluid user">
    <div class="row">
      <div class="col-8 col-sm-3 col-md-2 offset-2 offset-sm-0">
        <div class="avatar">
          <img src="/img/user.png" alt="" />
          <span class="avatar-status bg-danger"></span>
        </div>
      </div>

      <div class="col-12 col-md-10">
        <p class="display-4">{{ $t("users.view.profileTitle") }}</p>

        <b-row>
          <!-- profile -->
          <b-col cols="12" sm="12" md="6">
            <div class="wrap-card">
              <b-card class="separately" :title="$t('users.view.profile')">
                <b-card-sub-title>
                  <a
                    v-if="isCanChange('profile')"
                    @click.prevent="openUpdateModal('profile')"
                  >
                    {{
                      userIdLocal
                        ? $t("users.view.change")
                        : $t("users.view.create")
                    }}
                  </a>
                </b-card-sub-title>
                <b-row>
                  <b-col v-if="profile.fullName" cols="12">{{
                    profile.fullName
                  }}</b-col>
                  <b-col v-if="profile.birthday" cols="12"
                    >{{ profile.birthday }} ({{ profile.age }})
                  </b-col>
                  <b-col v-if="profile.sex" cols="12">{{
                    profile.sexString
                  }}</b-col>

                  <b-col
                    v-if="
                      !profile.fullName && !profile.birthday && !profile.sex
                    "
                    cols="12"
                  >
                    {{ $t("main.noData") }}
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>

          <!-- address -->
          <b-col
            cols="12"
            sm="12"
            md="6"
            v-if="address.fullAddress || isCanChange('profile')"
          >
            <div class="wrap-card">
              <b-card class="separately" :title="$t('users.view.address')">
                <b-card-sub-title>
                  <a
                    v-if="userIdLocal && isCanChange('profile')"
                    @click.prevent="openUpdateModal('address')"
                    >{{ $t("users.view.change") }}</a
                  >
                </b-card-sub-title>
                <b-row>
                  <b-col v-if="address.fullAddress" cols="12">{{
                    address.fullAddress
                  }}</b-col>

                  <b-col v-if="!address.fullAddress" cols="12">
                    {{ $t("main.noData") }}
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>

          <!-- account -->
          <b-col cols="12" sm="12" md="6">
            <div class="wrap-card">
              <b-card class="separately" :title="$t('users.view.account')">
                <b-card-sub-title>
                  <a
                    v-if="userIdLocal && isCanChange('contact')"
                    @click.prevent="openUpdateModal('account')"
                    >{{ $t("users.view.change") }}</a
                  >
                </b-card-sub-title>
                <b-row>
                  <b-col v-if="email" cols="12">{{ email }}</b-col>
                  <b-col v-if="phone" cols="12">{{ phone }}</b-col>

                  <b-col v-if="!email && !phone" cols="12">
                    {{ $t("main.noData") }}
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>

          <!-- userRole -->
          <!-- <b-col cols="12" sm="12" md="6" v-if="!isOnlyClient()">
            <div class="wrap-card">
              <b-card class="separately" :title="$t('users.view.roles')">
                <b-card-sub-title>
                  <a
                    v-if="userIdLocal && isCanChange('profile')"
                    @click.prevent="openUpdateModal('roles')"
                    >{{ $t("users.view.change") }}</a
                  >
                </b-card-sub-title>
                <b-row v-for="role in roles">
                  <b-col cols="12">
                    {{ role.roleString }}
                  </b-col>
                </b-row>

                <b-row>
                  <b-col v-if="isEmpty(roles)" cols="12">
                    {{ $t("main.noData") }}
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col> -->

          <!-- userRight -->
          <b-col cols="12" sm="12" md="6" v-if="!isOnlyClient()">
            <div class="wrap-card">
              <b-card class="separately" :title="$t('users.view.permissions')">
                <b-card-sub-title>
                  <a
                    v-if="userIdLocal && isCanChange('permissions')"
                    @click.prevent="openUpdateModal('userRight')"
                    >{{ $t("users.view.change") }}</a
                  >
                </b-card-sub-title>
                <!-- <b-row v-for="permission in permissions">
                  <b-col
                    cols="12"
                    v-if="
                      permission.item_name !== 'accountant' &&
                      permission.item_name !== 'administrator' &&
                      permission.item_name !== 'employee' &&
                      permission.item_name !== 'manager' &&
                      permission.item_name !== 'receptionist'
                    "
                  >
                    {{ permission.description }}
                  </b-col>
                </b-row> -->

                <b-row>
                  <b-col v-if="isEmpty(permissions)" cols="12">
                    {{ $t("main.noData") }}
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>

          <!-- workCard -->
          <b-col
            md="12"
            lg="6"
            v-if="
              workCard.company ||
              workCard.address ||
              workCard.position ||
              isCanChange('workCard')
            "
          >
            <div class="wrap-card">
              <b-card class="separately" :title="$t('users.view.workCard')">
                <b-card-sub-title>
                  <a
                    v-if="userIdLocal && isCanChange('workCard')"
                    @click.prevent="openUpdateModal('workCard')"
                    >{{ $t("users.view.change") }}</a
                  >
                </b-card-sub-title>
                <dl
                  class="row"
                  v-if="
                    workCard.company || workCard.address || workCard.position
                  "
                >
                  <dt v-if="workCard.company" class="col-sm-3 text-truncate">
                    {{ $t("users.workCard.label.company") }}
                  </dt>
                  <dd v-if="workCard.company" class="col-sm-9">
                    {{ workCard.company }}
                  </dd>

                  <dt v-if="workCard.address" class="col-sm-3 text-truncate">
                    {{ $t("users.workCard.label.address") }}
                  </dt>
                  <dd v-if="workCard.address" class="col-sm-9">
                    {{ workCard.address }}
                  </dd>

                  <dt v-if="workCard.position" class="col-sm-3 text-truncate">
                    {{ $t("users.workCard.label.position") }}
                  </dt>
                  <dd v-if="workCard.position" class="col-sm-9">
                    {{ workCard.position }}
                  </dd>
                </dl>

                <b-row
                  v-if="
                    !workCard.company && !workCard.address && !workCard.position
                  "
                >
                  <b-col cols="12">
                    {{ $t("main.noData") }}
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>

          
        </b-row>
      </div>
    </div>

    <b-modal
      lazy
      modal-class="modal-left"
      size="md"
      v-model="formModal.show"
      :title="formModal.title"
      :okTitle="$t('main.save')"
      :cancelTitle="$t('main.cancel')"
      @ok="handleSave"
    >
      <profile-form
        ref="profileForm"
        @updated="updated"
        @created="created"
        v-if="formModal.destination == 'profile'"
        :userId="formModal.id"
      >
      </profile-form>

      <account-form
        ref="accountForm"
        @updated="updated"
        v-if="formModal.destination == 'account'"
        :userId="formModal.id"
      >
      </account-form>

     
      <address-form
        ref="addressForm"
        @updated="updated"
        v-if="formModal.destination == 'address'"
        :userId="formModal.id"
      >
      </address-form>

      <!-- <roles-form
        ref="rolesForm"
        @updated="updated"
        v-if="formModal.destination == 'roles'"
        :userId="formModal.id"
      >
      </roles-form> -->

      <user-right-form
        ref="userRightForm"
        @updated="updated"
        v-if="formModal.destination == 'userRight'"
        :userId="formModal.id"
      >
      </user-right-form>

    </b-modal>
  </div>
</template>

<script>
import Api from "@/api/v1/users";
import ak from "@/utils/account";
import notificationMixin from "@/mixins/notification";
import ProfileForm from "@/components/users/ProfileForm";
import AddressForm from "@/components/users/AddressForm";
// import RolesForm from "@/components/users/RolesForm";
import UserRightForm from "@/components/users/UserRightForm";
import AccountForm from "@/components/users/AccountForm";
import Form from "@/utils/Form";

// import { ROLE_PUPIL, ROLE_TEACHER, ROLE_PARENT } from "@/utils/rolesUsers";

export default {
  components: {
    AccountForm,
    ProfileForm,
    AddressForm,
    // RolesForm,
    UserRightForm,
  },
  mixins: [notificationMixin],
  props: {
    userId: {
      default: null,
    },
  },

  data: function () {
    return {
      userIdLocal: this.userId,
      account: ak,
      loading: false,
      email: null,
      phone: null,
      profile: {
        avatarUrl: "/statics/images/user.png",
      },
      socials: {},
      address: {},
      workCard: {},
      roles: {},
      permissions: {},
      departments: {},

      scenarioKinsfolk: null,
      searchUsers: [],
      form: new Form(),

      formModal: {
        id: null,
        destination: null,
        show: false,
      },
      formModalSearch: {
        id: null,
        show: false,
      },
    };
  },
  methods: {
    isCanChange(block) {
      return true;
      // return this.$isAccessChangeData(String(this.userIdLocal), block);
    },
    isCanView(block) {
      return true;

      // return this.$isAccessViewData(String(this.userIdLocal), block);
    },
    isOnlyClient() {
      return false;

      // return this.$store.getters.hasOnlyClient;
    },

    openSearchModal(scenario) {
      this.formModalSearch.id = this.userIdLocal;
      this.formModalSearch.show = true;
      this.scenarioKinsfolk = scenario;
    },
    search(searchForm) {
      this.form = searchForm;
    },
    async handleSearchUsers() {
      const response = await Api.getModels(this.form.data);
      this.searchUsers = response.data;

      this.openUpdateModal(this.scenarioKinsfolk);
    },

    isEmpty(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    },
    async forceRerender() {
      this.userIdLocal = this.userId;
      await this.load(this.userIdLocal);
    },
    async load(id) {
      const response = await Api.getModel(id, {
        expand: "profile,address,workCard,roles,rights,departments.department",
      });
      this.email = response.data.email;
      this.phone = response.data.phone;
      this.profile = response.data.profile;
      this.address = response.data.address;
      this.workCard = response.data.workCard;
      this.roles = response.data.roles;
      this.permissions = response.data.rights;
      this.departments = response.data.departments;
    },

    openUpdateModal(destination) {
      if (this.userIdLocal != null) {
        this.formModal.id = this.userIdLocal;
        this.formModal.title = this.$t(`users.update.${destination}`);
      } else {
        this.formModal.title = this.$t(`users.create.${destination}`);
      }

      this.formModal.destination = destination;
      this.formModal.show = true;
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs[this.formModal.destination + "Form"].submit();
    },
    // handleClose(event) {
    //     event.preventDefault();
    //     this.formModal.show = false;
    // },
    updated() {
      this.$_notification_notify(this.$t("main.notifications.updated"));
      this.saved();
      this.$emit("updated");
    },
    created(id) {
      this.userIdLocal = id;
      // this.load(this.userIdLocal);
      this.$_notification_notify(this.$t("main.notifications.updated"));
      this.saved();
      this.$emit("updated");
    },
    async saved() {
      this.formModal.show = false;
      this.load(this.userIdLocal);
    },
  },
  async created() {
    this.loading = true;
    if (this.userIdLocal) {
      await this.load(this.userIdLocal);
    }
    this.loading = false;
  },
};
</script>