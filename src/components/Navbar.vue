<template>
  <div class="container-fluid">
    <div class="row menuAccardion">
      <div class="container">
        <div v-for="(group, index) of groups" :key="index">
          <div class="row">
            <span class="item">
              <span :class="`micon micon__${group.icon}`"></span>
            </span>
            <a
              class="menu_title"
              @click="group.open = !group.open"
              v-text="group.name"
            >
            </a>
            <span :class="`micon micon__chevron${group.open}`"></span>
          </div>

          <ul v-show="group.open">
            <li v-for="(item, index) in group.items" :key="index">
              <div class="item" @click="handleMenuItem(item.href)">
                <span class="title">{{ item.title }}</span>
              </div>
            </li>
          </ul>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Simple",
  components: {},
  data() {
    return {
      groups: {
        main: {
          name: "Главная",
          open: false,
          icon: "door",
          items: [
            {
              href: "/",
              title: "Перейти на главную",
            },
          ],
        },
        content: {
          name: "Контент",
          open: true,
          icon: "basket",
          items: [
            {
              href: "/menu",
              title: "Меню",
            },
            {
              href: "/main-news",
              title: "Категории статей",
            },
            {
              href: "/news",
              title: "Статьи",
            },
            {
              href: "/pages",
              title: "Страницы",
            },
            {
              href: "/banners-types",
              title: "Виды баннеров",
            },
            {
              href: "/banners",
              title: "Баннеры",
            },
          ],
        },
        magazine: {
          name: "Магазин",
          open: false,
          icon: "factory",
          items: [
            {
              href: "/sales",
              title: "Акции",
            },
            {
              href: "/categories-goods",
              title: "Каталог товаров",
            },
            {
              href: "/goods-list",
              title: "Товары",
            },
          ],
        },
        about: {
          name: "О компании",
          open: false,
          icon: "storage",
          items: [
            {
              href: "/vacancy",
              title: "Вакансии",
            },
            {
              href: "/employees",
              title: "Сотрудники",
            },
            {
              href: "/partners",
              title: "Партнеры",
            },
          ],
        },
        gallery: {
          name: "Галерея",
          open: false,
          icon: "user",
          items: [
            {
              href: "/ourworks",
              title: "Все галереи",
            },
          ],
        },
        faq: {
          name: "База знаний",
          open: false,
          icon: "basket",
          items: [
            {
              href: "/knowledgebase-categories",
              title: "Категории",
            },
            {
              href: "/knowledgebase",
              title: "Статьи",
            },
          ],
        },
        settings: {
          name: "Настройки сайта",
          open: false,
          icon: "door-directions",
          items: [
            {
              href: "/settings",
              title: "Настройки",
            },
          ],
        },
      },
    };
  },

  methods: {
    handleCloseButton() {
      this.$emit("onLinkClick");
      this.$emit("handleClose");
    },
    handleMenuItem(href) {
      this.$router.push(href);
      this.$emit("onLinkClick");
    },
  },
};
</script>
