import data from '~/config/mock.json';

const state = {
    postsList: []
}

const mutations = {
    AddPosts: function (state, data) {
        state.postsList = data;
    }
}

const actions = {
    setPosts: function ({ commit }) {
        commit('AddPosts', data.posts);
    }
}

const getters = {
    getPosts: state => state.postsList,
}

export default {
    state,
    mutations,
    actions,
    getters
};
