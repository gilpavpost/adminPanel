import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './messages'

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'ru',
    messages: messages,
    silentTranslationWarn: process.env.NODE_ENV === 'development'
});

export default i18n;