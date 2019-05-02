<template>
    <el-container justify="center">
        <el-menu type="flex" justify="center" mode="horizontal" router="true">
            <el-menu-item index="/"><i class="el-icon-s-home"></i>首页</el-menu-item>
            <el-menu-item index="/dishes"><i class="el-icon-food"></i>点餐</el-menu-item>
            <el-menu-item index="/orders"><i class="el-icon-s-order"></i>订单</el-menu-item>
            <el-menu-item index="/profile"><i class="el-icon-s-custom"></i>我的</el-menu-item>
        </el-menu>
    </el-container>
</template>
<script>
    export default {
        name: "LeadBar"
    };
</script>

<style scoped>
    .bar-content {
        text-align: center;
    }
</style>
