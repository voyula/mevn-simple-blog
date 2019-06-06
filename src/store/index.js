import Vue from 'vue'
import Vuex from 'vuex'
import PostsService from '@/services/PostsService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    fetchPosts({commit}) {
      return new Promise((resolve, reject) => {
        PostsService.fetchPosts().then((response) => {
          commit('setPosts', response.data.posts)
          resolve()
        })
      })
    },

    addPost({commit}, payload) {
      return new Promise((resolve, reject) => {
        PostsService.addPost({
          title: payload.title,
          description: payload.description
        }).then(() => {
          this.dispatch('fetchPosts')
          resolve()
        })
      })
    },

    editPost({commit}, payload) {
      return new Promise((resolve, reject) => {
        return PostsService.updatePost({
          id: payload.id,
          title: payload.title,
          description: payload.description
        }).then(() => {
          this.dispatch('fetchPosts')
          resolve()
        })
      })
    },

    removePost({commit}, payload) {
      return PostsService.deletePost(payload.id).then(() => {
        this.dispatch('fetchPosts')
      })
    }
  },
  getters: {}
})
