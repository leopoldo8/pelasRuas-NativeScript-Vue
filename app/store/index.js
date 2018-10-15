import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import posts from './modules/posts'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    posts
  },
  strict: (TNS_ENV === 'debug'),
});

Vue.prototype.$store = store;

export default store;
