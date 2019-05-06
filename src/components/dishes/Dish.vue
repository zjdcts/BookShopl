<template>
  <div class="xx">
    <DishSwipe></DishSwipe>
    <DishNavBar></DishNavBar>
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
  }
};
</script>

<style>
</style>
