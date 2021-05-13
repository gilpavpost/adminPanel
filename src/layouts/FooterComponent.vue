<template>
  <footer class="footer">
    <div class="container-ap">
      <div class="row-ap">
        <div class="col-sm-12 col-md-6 footer-custom">
          <ul class="">
            <li>
              <a target="_blank" rel="noopener noreferrer" href="/mailakrato"
                >client@akrato.com</a
              >
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" href="/siteakrato"
                >akrato.com</a
              >
            </li>
            <li></li>
          </ul>
        </div>

        <div class="col-xs-6 col-md-6 footer-contacts">
          <span>&copy; AkratoPRIME CMS {{ year }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  props: {
    isSimple: {
      default: false,
    },
  },
  data() {
    return {
      year: "",
      menu: [
        {
          href: "client@akrato.com",
          title: "client@akrato.com",
        },
        {
          href: "akrato.com",
          title: "akrato.com",
        },
      ],
    };
  },
  methods: {
    handleClickMenu(href) {
      this.$router.push(href);
      // this.$router.push({ name: "users" });
    },
  },
  created() {
    let d = new Date();
    this.year = d.getFullYear();
  },
};
</script>
