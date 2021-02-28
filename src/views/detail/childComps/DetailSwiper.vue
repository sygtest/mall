<template>
  <div id="detail-swiper">
    <swiper class="Dswiper" >
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper' 


  export default {
   name: 'DetailSwiper',
   components:{
     Swiper,
     SwiperItem

   },
   props: {
     topImages: {
       type: Array,
       default() {
         return []
       }
     }
   } 
  }
</script>

<style scoped>
  .Dswiper {
    height: 300px;
    overflow: hidden;
  }
</style>