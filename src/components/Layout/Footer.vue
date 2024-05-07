<template>
  <el-footer>
    <div class="left">
      © 2024 河南工业大学人工智能与大数据学院
    </div>
    <div class="right">
      <i class="el-icon-message"></i> liyh0703@gmail.com
    </div>
  </el-footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.el-footer {
  background-color: rgb(244,244,244);
  color: #333;
  text-align: center;
  line-height: 60px;
  /*居于底部*/
  position: fixed;
  bottom: -10px;
  width: 100%;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>