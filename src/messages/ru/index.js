import users from './users.js'
import departments from './departments.js'
import categoriesGoods from './categories-goods.js'
import goodsList from './goods-list'
import vacancy from './vacancy'
import employees from './employees'
import partners from './partners'
import ourworks from './ourworks'
import settingsSite from './settings-site'
import banners from './banners'
import knowledgebaseCategories from './knowledgebase-categories'
import knowledgebase from './knowledgebase'
import bannersTypes from './banners-types'
import news from './news'
import mainNews from './main-news'
import pages from './pages'
import menu from './menu'
import menuItem from './menu-item'
import sales from './sales'

export default {
  users,
  departments,
  categoriesGoods,
  sales,
  goodsList,
  vacancy,
  employees,
  partners,
  ourworks,
  settingsSite,
  banners,
  bannersTypes,
  news,
  mainNews,
  knowledgebaseCategories,
  knowledgebase,
  pages,
  menu,
  menuItem,

  company: {
    title: 'AkratoPRIME CMS',
    address: 'г. Киров',
    phone: 'тел: 8 800',
  },

  permissions: {
    title: 'Настройка прав доступа'
  },
  login: {
    welcome: 'Добро пожаловать в AkratoPRIME CMS',
    signIn: 'Вход',
    signUp: 'Регистрация',
    forgot: 'Забыли пароль?',
    labels: {
      email: 'Электронная почта',
      name: 'Имя',
      surname: 'Фамилия',
      password: 'Пароль',
      passwordRepeat: 'Повторите пароль',
      acceptTerms: 'Принимаю условия соглашения',
    },
  },
  forgot: {
    passwordRecovery: 'Восстановление пароля',
    login: 'Вход в систему',
    send: 'Восстановить',
    waitForInstruction: 'На ваш почтовый ящик отправлены инструкции по восстановлению пароля',
  },
  reset: {
    resetPassword: 'Сброс пароля',
    reset: 'Изменить',
  },
  main: {
    toHome: 'На главную',
    noData: 'Нет данных',
    back: 'Назад',
    cancel: 'Отмена',
    close: 'Закрыть',
    save: 'Сохранить',
    noResults: 'Не найдено',
    startTyping: 'Начните печатать...',
    pickAValue: 'Выберите значение',
    deselectAValue: 'Удалите значение',
    selectedLabel: 'Выбрано',
    pickAValues: 'Выберите значения',
    searchOrPickAValues: 'Ищите или выберие значения',
    selectLimitText: 'и еще {count}',
    print: 'Печать',
    specification: 'Спецификация',
    load_img: 'Выбрать файл для загрузки.',
    seo_title: "SEO title",
    seo_discription: "SEO description",
    seo_keywords: "SEO keywords",
    og_site_name: "OG site name",
    og_title: "OG title",
    og_type: "OG type",
    og_image: "OG image",
    og_url: "OG url",
    og_discription: "OG discription",
    notFound: "Ничего не найдено",
    menu: {
      logout: 'Выход',
      doors: 'Типы дверей',
      users: 'Пользователи',
      profile: 'Профиль',
    },
    sideMenu: {
      lists: {
        main: 'Главная страница',
      },

    },
    meta: {
      login: 'Вход',
      forgot: 'Забыли пароль',
      reset: 'Сброс пароля',
      error: 'Ошибка',
      print: 'Печать',
    },
    confirm: {
      title: 'Вы уверены?',
      delete: 'будет удален без возможности восстановления',
      yes: 'Да',
      no: 'Нет',
    },
    notifications: {
      title: 'Уведомление AkratoPRIME CMS',
      saved: 'Данные успешно сохранены',
      created: 'Запись успешно добавлена',
      updated: 'Данные успешно изменены',
      deleted: 'Запись успешна удалена',
      passwordChanged: 'Пароль успешно изменен',
      timeout: 'Превышено время ожидания ответа сервера',
      taskQueued: 'Задача поставлена в очередь и будет выполнена в ближайшее время',
    },
    error: {
      serverError: 'Возникла ошибка сервера',
      accessDenied: 'Недостаточно прав для выполнения данного действия',
      occurred: 'Возникла ошибка',
      contactUs: 'Сообщите администратору об ошибке. Спасибо.',
      notFound: 'Страница не найдена',
      noInformation: 'Нет данных',
      noSelect: 'Значение не выбранно. Выберите значение',
    },
  },
  table: {
    loading: 'Загрузка ...',
    count: 'Записи с {from} по {to} из {count}|Всего записей: {count}|Одна запись',
    noResults: 'Записи не найдены',
    first: 'Первая',
    last: 'Последняя',
    filter: 'Фильтр:',
    filterPlaceholder: 'Введите запрос ...',
    limit: 'Записей:',
    page: 'Страница:',
    filterBy: 'Фильтровать по {column}',
    defaultOption: 'Выбрать {column}',
    columns: 'Столбцы',
  },
}