<template>
  <div class="xx">
    <van-row span="24">
      <van-nav-bar
              title="菜品列表"
              left-text="返回"
              right-text="回首页"
              fixed
              left-arrow
              @click-left="onClickLeft"
              @click-right="onClickRight"
      />
      <DishSwipe></DishSwipe>
      <DishNavBar></DishNavBar>
    </van-row>
  </div>
</template>

<script>
import DishSwipe from "./DishSwipe.vue";
import DishNavBar from "./DishNavBar";
export default {
  name: "Dish",
  components: {
    DishNavBar,
    DishSwipe
  },
  methods: {
    onClickLeft: function () {
      this.$router.go(-1);
      // eslint-disable-next-line no-console
      //console.log(1);
    },
    onClickRight: function () {
      this.$router.push('/');
      this.$emit("titleChanged","1");
      // eslint-disable-next-line no-console
      //console.log(1);
    },
  }
};
</script>

<style scoped>

</style>
