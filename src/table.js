import Vue from 'vue'
import api from '@/api'
import {ServerTable, ClientTable} from 'vue-tables-2'
import i18n from './i18n'

const tableDefaultOptions = {
    skin: 'table table-striped table-bordered table-hover table-sm',
    filterable: false,
    sortable: [],
    filterByColumn: true,
    perPage: 5,
    perPageValues: [],
    requestKeys: {
        query: 'query',
        limit: 'per-page',
        page: 'page',
        orderBy: 'sort',
        ascending: 'ascending',
        byColumn: 'byColumn'
    },
    requestFunction (data) {
        let sort = data.ascending ? data.sort : `-${data.sort}`;
        return api.get(this.url, {
            ...data,
            sort: sort
        }).catch((e) => {
            this.dispatch('error', e);
        });
    },
    responseAdapter(response) {
        return {
            data: response.data,
            count: response.headers['x-pagination-total-count'],
        };
    },
    sortIcon: {
        base: 'fa',
        up: 'fa-sort-up',
        down: 'fa-sort-down',
        is: 'fa-sort'
    },
    texts: {
        count: i18n.t('table.count'),
        loading: i18n.t('table.loading'),
        noResults: i18n.t('table.noResults'),
        first: i18n.t('table.first'),
        last: i18n.t('table.last'),
        filter: i18n.t('table.filter'),
        filterPlaceholder: i18n.t('table.filterPlaceholder'),
        limit: i18n.t('table.limit'),
        page: i18n.t('table.page'),
        filterBy: i18n.t('table.filterBy'),
        defaultOption: i18n.t('table.defaultOption'),
        columns: i18n.t('table.columns')
    }
};

Vue.use(ServerTable, tableDefaultOptions, false, 'bootstrap4');
Vue.use(ClientTable, tableDefaultOptions, false, 'bootstrap4');
