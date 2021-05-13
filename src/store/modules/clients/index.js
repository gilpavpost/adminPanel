import {
    FETCH_CLIENTS,
    LOAD_CLIENT,
    CREATE_CLIENT,
    UPDATE_CLIENT,
    DELETE_CLIENT,
    CLIENT_FILTERS,
    CLIENT_BRANDS,
    FIND_CLIENT,
} from "./actions";
import {
    LOAD_CLIENT_REQUEST,
    LOAD_CLIENT_SUCCESS,
    LOAD_CLIENT_ERROR,
    FETCH_CLIENTS_REQUEST,
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_ERROR
} from "./mutations";
import api from '@/api/v1/clients'
import StateModel from '@/store/StateModel';

const state = {
    clients: new StateModel(),
    client: new StateModel(),
};

const getters = {
    isClientLoading: state => state.client.loading,
};

const actions = {
    async [FETCH_CLIENTS]({commit}, payload) {
        commit(FETCH_CLIENTS_REQUEST);
        try {
            const response = await api.getModels(payload);
            commit(FETCH_CLIENTS_SUCCESS);
            return response;
        } catch (error) {
            commit(FETCH_CLIENTS_ERROR, error);
            throw error;
        }
    },
    async [LOAD_CLIENT]({commit}, clientId) {
        commit(LOAD_CLIENT_REQUEST);
        try {
            const response = await api.getModel(clientId, {expand: 'updatedAt,updatedBy'});
            commit(LOAD_CLIENT_SUCCESS);
            return response;
        } catch (error) {
            commit(LOAD_CLIENT_ERROR, error);
            throw error;
        }
    },
    [CLIENT_BRANDS](context, clientId) {
        return api.getBrands(clientId);
    },
    [FIND_CLIENT](context, clientName) {
        return api.getModels({name: clientName})
    },
    [CLIENT_FILTERS]() {
        return api.getFilters();
    },
    [CREATE_CLIENT](context, client) {
        return api.createModel(client);
    },
    [UPDATE_CLIENT](context, client) {
        return api.updateModel(client.id, client);
    },
    [DELETE_CLIENT](context, clientId) {
        return api.deleteModel(clientId);
    }
};

const mutations = {
    [LOAD_CLIENT_REQUEST](state) {
        state.client.request();
    },
    [LOAD_CLIENT_SUCCESS](state) {
        state.client.success();
    },
    [LOAD_CLIENT_ERROR](state, error) {
        state.client.fail(error);
    },
    [FETCH_CLIENTS_REQUEST](state) {
        state.clients.request();
    },
    [FETCH_CLIENTS_SUCCESS](state) {
        state.clients.success();
    },
    [FETCH_CLIENTS_ERROR](state, error) {
        state.clients.fail(error);
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}