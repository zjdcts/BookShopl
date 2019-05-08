<template>
  <div>
    <van-row class="swipeSection">
      <van-swipe :autoplay="6000" indicator-color="yellow">
        <van-swipe-item v-for="(image, index) in imges" :key="index">
          <img class="swipeImg" :src="image.img">
        </van-swipe-item>
      </van-swipe>
    </van-row>
  </div>
</template>
<script>
export default {
  name: "dishSwipe",
  data() {
    return {
      imges: [
        {img: require("./picture/1.jpg")},
        {img: require("./picture/2.jpg")},
        {img: require("./picture/3.jpg")},
        {img: require("./picture/4.jpg")}
      ]
    };
  }
};
</script>

<style scoped>
.swipeSection {
  height: 40%;
  padding-top: 10px;
}
.swipeImg {
  width: 100%;
  height: 100%;
}
</style>