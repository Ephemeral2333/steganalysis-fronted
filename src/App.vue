<template>
  <div>
    <div class="mb-5">
      <Header></Header>
    </div>

    <div class="container context">
      <router-view></router-view>
    </div>

    <div class="mt-5">
      <Footer></Footer>
    </div>
  </div>
</template>

<style></style>
<script setup>
import Header from "@/components/Layout/Header.vue";
import Footer from "@/components/Layout/Footer.vue";

</script>

<style>
.el-main {
  color: #333;
  text-align: center;
}
</style>