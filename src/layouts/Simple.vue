<template>
  <div id="wrapper" class="wrapper">
    <div class="navbar-ap">
      <b-navbar type="light">
        <div class="container-ap">
          <div class="row-ap">
            <span class="navbar-brand" @click="handleMenu">
              <span class="micon micon__menu"></span>
            </span>
            <router-link class="navbar-brand brand" to="/">
              <div class="logo">
                <logo></logo>
              </div>
            </router-link>

            <b-navbar-toggle target="nav-collapse"> </b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav class="ml-auto" v-if="isAuthenticated()">
                <b-nav-item-dropdown right>
                  <template v-slot:button-content>
                    <em>{{ profile.name }}</em>
                  </template>
                  <b-dropdown-item @click="goUsers">
                    {{ $t("main.menu.users") }}
                  </b-dropdown-item>
                  <b-dropdown-item @click="goProfile">
                    {{ $t("main.menu.profile") }}
                  </b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item @click="logout">
                    {{ $t("main.menu.logout") }}
                  </b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>

            <header
              class="header-navigation d-none d-sm-block"
              v-if="isCanShowNavigate() && isAuthenticated()"
            >
              <router-view name="navbar"></router-view>
              <!-- <simple-header></simple-header> -->
            </header>

            <!-- <b-navbar-nav class="d-none d-sm-block">
        <b-nav-item href="#" @click="openHelpModal()">
          help
        </b-nav-item>
      </b-navbar-nav> -->
          </div>
        </div>
      </b-navbar>
    </div>

    <div class="app-page">
      <transition :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <footer-component></footer-component> 

<div v-show="formModal.show" class="closeModalWindow item" @click="handleMenu">
      <span :class="`micon micon__close`"></span>
    </div>
    <b-modal
      lazy
      v-model="formModal.show"
      modal-class="modal-left wrap"
      hide-header
      hide-footer
      size="sm"
    >
      <navbar @onLinkClick="handleMenu"> </navbar>
    </b-modal>
  </div>
</template>

<script>
// import SimpleHeader from "./SimpleHeader";
import FooterComponent from "@/layouts/FooterComponent";
import Navbar from "@/components/Navbar";
import { AUTH_LOGOUT } from "@/store/modules/auth/actions";
import { mapGetters } from "vuex";
import Logo from "@/components/Logo";

export default {
  name: "Simple",
  components: {
    // SimpleHeader,
    FooterComponent,
    Navbar,
    Logo,
  },
  data() {
    return {
      transitionName: "slide-right",

      formModal: {
        show: false,
      },
      formModalHelp: {
        id: null,
        show: false,
        title: this.$t("main.help"),
      },
    };
  },
  computed: {
    ...mapGetters({ profile: "getProfile" }),
  },
  methods: {
    closeModalParent() {
      this.formModalHelp.show = false;
    },
    // openHelpModal() {
    //   this.formModalHelp.show = true;
    // },
    handleMenu() {
      this.formModal.show = !this.formModal.show;
    },

    handleClose(event) {
      event.preventDefault();
      this.formModalHelp.show = false;
    },

    isWorker() {
      return (
        !this.$store.getters.hasOnlyClient && !this.$store.getters.withoutRight
      );
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    goProfile() {
      this.$router.push({ name: "user", params: { id: this.profile.id } });
    },
    goUsers() {
      this.$router.push({ name: "users" });
    },
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push("/login");
      });
    },

    isCanShowNavigate() {
      return true;
      // return (
      //   this.$can("userPermissionEdit") ||
      //   this.$can("manageUsersParams") ||
      //   this.$can("manageEducation") ||
      //   this.$can("managePlacesLessons") ||
      //   this.$can("manageLessonFormats") ||
      //   this.$can("managePaymentMethods")
      // );
    },
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    },
  },
};
</script>

<style lang="scss">
.app-content {
  position: relative;
  padding-top: 0;
  padding-left: 220px;
  transition: padding-left 0.3s;
}

.app-content.full {
  padding-left: 50px;
}

.navbar-brand {
  padding-top: 0;
  padding-bottom: 0;

  img {
    max-height: 45px;
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease;
}

.slide-right-enter,
.slide-right-leave-to,
.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
}

.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(50px);
}

.slide-right-enter,
.slide-left-leave-to {
  transform: translateX(-50px);
}
</style>
