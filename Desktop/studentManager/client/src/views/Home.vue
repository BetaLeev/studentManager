<template>
  <div class="home">
    <HeaderNav />
    <swiper :options="swiperOption">
      <swiper-slide>
        <img src="/img/logo.svg"
          alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="/img/table.svg"
          alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderNav from "@/components/HeaderNav.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "home",

  components: {
    swiper,
    swiperSlide,
    HeaderNav
  },
  data() {
    return {
      swiperOption: {
        // autoplay: true,
        loop: true
        // effect: "fade"
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
.home {
  height: 600px;
  max-height: 800px;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  & img {
    height: 100%;
    width: 100%;
    opacity: 0.4;
    filter: blur(3px);
  }
}
</style>


