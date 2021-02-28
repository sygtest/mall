<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <good-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/content/goods/GoodList";


import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";


import { getHomeMultidata, getHomeGoods } from "network/home";
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffSetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {},
  activated() {
    // console.log("111111111");
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log("2222222");
    // 1.保存y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  created() {
    //  1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //  1.图片加载完成的事件监听

    // const refresh = debounce(this.$refs.scroll.refresh, 500);

    // 对监听的事件进行保存
    // this.itemImgListener =  () => {
      // console.log('11111111111');

      // refresh();
      // this.$refs.scroll.refresh()
    // }

    // 3.监听item中图片加载完成
    // this.$bus.$on("itemImageLoad", this.itemImgListener);

    // 2.获取tabControl的offsetTop
    // 所有组件都有一个属性$el: 用于获取组件中的元素的
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  methods: {
    /**
     * 事件监听相关的方法
     */

    tabClick(index) {
      //  console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //  console.log(position);
      // 1.判断BackTop是否显示
      this.listenShowBackTop(position) 

      // 2.决定tabControl是否吸顶（position: fixed）
      // console.log(-position.y);
      // console.log(this.tabOffsetTop);
      this.isTabFixed = -position.y > this.tabOffSetTop;
    },

    loadMore() {
      //  console.log('sha');
      this.getHomeGoods(this.currentType);

      //   this.$refs.scroll.scroll.refresh()
    },

    swiperImageLoad() {
      //  console.log('111111');
      //  console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);

        // let totalNums =[]

        // const nums1 = [209,11,222]
        // const nums2 = [111,201,231]

        // for (let n of nums1) {
        //   totalNums.push(n)
        // }

        // totalNums.push(...nums1)

        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  /* font-weight: 700; */
  color: #fff;

  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
}

/* .tab-control {
    position: sticky;
    top: 43px;
    z-index: 9;
  } */

/* .content {
    /* height: 100%; */
/* height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 51px;
  } */

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
</style>