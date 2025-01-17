const state = {
    requests: []
};

const getters = {
    allRequests(state) {
        return state.requests;
    }
};

const mutations = {
    addRequest(state, payload) {
        state.requests.push(payload);
    }
};

const actions = {
    addRequest({ commit }, payload) {
        commit('addRequest', payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};