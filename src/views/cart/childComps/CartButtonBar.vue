<template>
  <div class="bottom-bar">
    <div class="check-content">
    <check-button :is-checked='isSelectAll' 
                  class="check-button"
                  @click.native="checkClick"/>
    <span>全选</span>
    </div>    

    <div class="price">
      合计： {{totalPrice}}
    </div>

    <div class="calculate" @click="calClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import { mapGetters } from 'vuex'
  export default {
    name: "CartButtonBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false
        // 1.使用filter
        // return !(this.cartList.filter(item => !item.checked).length)

        // 3.普通遍历
        for (let item of this.cartList) {
          if(!item.checked) {
            return false
          }
        }

        return true
        // 2.使用find
        // if (this.cartList.length === 0) return false
        // return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        // console.log('111111');
        // let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

        if (this.isSelectAll) { //全部选中
          this.cartList.forEach(item => item.checked = false)
        } else { //部分或全部不选中
          this.cartList.forEach(item => item.checked = true)
        }

        // this.cartList.forEach(item => item.checked = !this.isSelectAll)
      },
      calClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择购买的商品', 2000)

        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 50px;
    display: flex;
    background-color: #eee;
    position: fixed;
    bottom: 40px;
    left: 0;
    right: 0;
  }

  .check-content {
    width: 60px;
    display: flex;
    line-height: 50px;
    align-items: center;
    margin-left: 10px;
    margin-right: 5px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
  }

  .price {
    line-height: 50px;
    margin-left: 40px;
    flex: 1;
  }

  .calculate{
    width: 80px;
    line-height: 50px;
    background-color: deeppink;
    color: #fff;
    text-align: center;
  }
</style>