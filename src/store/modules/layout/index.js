import {SET_LAYOUT} from './actions'

const state = {
    layout: 'simple',
};

const getters = {
    layout: state => state.layout
};

const mutations = {
    [SET_LAYOUT]: (state, payload) => state.layout = payload,
};

export default {
    state,
    getters,
    mutations,
}