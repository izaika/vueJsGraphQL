import Vue from 'vue';
import Vuex from 'vuex';
import { gql } from 'apollo-boost';

import { apolloClient } from '../main';
import { GET_POSTS } from '../queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loaders: [],
  },
  mutations: {
    setPosts: (state, payload) => (state.posts = payload),
    addLoader: (state, payload) => {
      state.loaders.push(payload);
    },
    removeLoader: (state, payload) => {
      state.loaders = state.loaders.filter(loader => loader !== payload);
    },
  },
  actions: {
    getPosts: async ({ commit }) => {
      commit('addLoader', 'getPosts');

      const {
        data: { getPosts },
      } = await apolloClient.query({ query: GET_POSTS });

      commit('removeLoader', 'getPosts');
      commit('setPosts', getPosts);
    },
  },
  modules: {},
  getters: {
    posts: ({ posts }) => posts,
    isLoading: ({ loaders }) => !!loaders.length,
  },
});
