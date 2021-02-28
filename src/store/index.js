import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  // : {
    // mutations唯一的目的就是修改state中状态
    // mutations中的每个方法尽可能完成的事件比较单一一点
    // addCart(state, payload) {
    // payload新添加的商品
    // 方法一
    // let oldProduct = null;
    // for(let item of state.cartList){
    //   if(item.iid === payload.iid){
    //   oldProduct = item;
    //   }
    // }
    // // 2.判断oldProduct
    // if (oldProduct) {
    //   oldProduct.count += 1
    // } else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }

    // 方法二
    // let index = state.cartList.indexOf(payload)

    // if (index === -1) {
    //   let oldProduct = state.cartList[index]
    //   oldProduct.count += 1
    // } else {
    //   payload.count = 1;
    //   state.cartList.push(payload)
    // }

    // 方法三
    // 1.查找之前数组中是否有该商品
    // let oldProduct = state.cartList.find(function (item) {
    //   return item.iid === payload.iid 
    // })

    // // 2判断oldoldProduct
    // if (oldProduct) {
    //   oldProduct.count += 1
    // } else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }
  // },
  actions,
  getters
})

// 3.挂载到Vue实例上
export default store