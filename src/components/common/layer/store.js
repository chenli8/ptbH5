/**
 * Created by Kirk liu on 2017/6/12.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    msg: ''
  },
  mutations: {
    msg (state,data) {
      state.msg = data.msg
    }
  },
  actions: {
    msg (context,data) {
      context.commit('msg',data)
      setTimeout(()=>{
        context.commit('msg',{mag:''})
      },2000)
    }
  }
})
export default store
