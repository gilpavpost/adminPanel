import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from './actions'
import api from '@/api/v1/user'
import token from '@/utils/token'

const state = {
    token: token.get() || '',
    status: '',
    hasLoadedOnce: false,
};

const getters = {
    token: state => state.token,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
};

const actions = {
    [AUTH_REQUEST]: async ({commit}, user) => {
        commit(AUTH_REQUEST);
        try {
            const response = await api.auth(user);
            const token = response.data.token;
            commit(AUTH_SUCCESS, token);
        } catch (error) {
            commit(AUTH_ERROR, error);
            throw error;
        }
    },
    [AUTH_LOGOUT]: async ({commit}) => {
        commit(AUTH_LOGOUT);
    }
};

const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success';
        state.token = token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error';
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = ''
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}