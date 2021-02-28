import {debounce} from 'common/util'
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
  const refresh = debounce(this.$refs.scroll.refresh, 500);
    
  this.itemImgListener = () => {
     refresh()
  }

  this.$bus.$on('itemImgLoad', this.itemImgListener)
  // console.log('wwwwwwww');
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      //  console.log('bbb');

      this.$refs.scroll.scrollTo(0, 0);

      // console.log(this.$refs.Scroll.Scroll.message);
    },
   listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  }
}