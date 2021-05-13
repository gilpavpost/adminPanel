import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import i18n from '@/i18n'
import {AUTH_LOGOUT} from '@/store/modules/auth/actions'

// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_API);
const client = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: process.env.NODE_ENV === 'production' ? 5000 : 0,
});

const getHeaders = () => {
    const token = store.getters.token;
    const authHeader = token ? {'Authorization': `Bearer ${token}`} : {};

    return {
        ...authHeader
    };
};

const processError = (error) => {
    if (error.response) {
        // Запрос обработан сервером, но статус ответа не попадает в интервал успешных (2xx)
        switch (error.response.status) {
            case 401:
                store.dispatch(AUTH_LOGOUT).then(() => router.push('/login'));
                break;
            case 404:
                router.push('/error');
                break;
            case 422:
                break;
            case 403:
                Vue.notify({
                    type: 'error',
                    title: i18n.t('main.notifications.title'),
                    text: i18n.t('main.error.accessDenied')
                });
                break;
            default:
                Vue.notify({
                    type: 'error',
                    title: i18n.t('main.notifications.title'),
                    text: i18n.t('main.error.serverError')
                });
        }
    } else if (error.request) {
        // Запрос отправлен, но нет ответа (например timeout соединения)
        // или проблемы с CORS
        if (error.code === 'ECONNABORTED') {
            Vue.notify({
                type: 'warn',
                title: i18n.t('main.notifications.title'),
                text: i18n.t('main.notifications.timeout'),
            });
        } else {
            router.push('/error');
        }
    } else {
        // Иная причина ошибки (js exception Error)
        // console.log('Error', error.message);
    }
};

client.interceptors.request.use(config => {
    Vue.prototype.$Progress.start();
    return config;
});

client.interceptors.response.use(response => {
    Vue.prototype.$Progress.finish();
    return response;
}, (error) => {
    Vue.prototype.$Progress.fail();
    //Если это не повторный запрос
    if (error.config && !error.config.__isRetryRequest) {
        processError(error);
    }

    return Promise.reject(error);
});

//Wrapper для Axios
export default  {
    async request (method, url, data) {
        let headers = getHeaders();
        return client({
            method,
            url,
            data,
            headers,
        });
    },
    async get(url, params) {
        let headers = getHeaders();
        return client.get(url, {
            params,
            headers,
        });
    },
    async post(url, data) {
        let headers = getHeaders();
        return client.post(url, data, {headers});
    },
    async put(url, data) {
        let headers = getHeaders();
        return client.put(url, data, {headers});
    },
    async delete(url) {
        let headers = getHeaders();
        return client.delete(url, {headers});
    },
    // Загрузка файла на сервер
    async upload(url, formData) {
        let headers = getHeaders();
        return client.post(url, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
            }
        });
    },
    // Загрузка файла с сервера
    async download(url, params) {
        let headers = getHeaders();
        return client.get(url, {
            params,
            headers,
            responseType: 'blob'
        });
    }
}
