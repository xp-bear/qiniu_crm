<template>
  <div class="TopBar">
    <div class="logo" @click="toHome"><img src="../assets/logo.png" alt="" /></div>
    <div class="log">
      <el-button type="danger" @click="toList" style="background-color: #fd4c5d; font-size: 16px; box-sizing: border-box; height: 40px">
        <i class="iconfont icon-ziliaoku"></i> <span>个人空间 Space</span>
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopBar",
  data() {
    return {};
  },
  methods: {
    toList() {
      this.$router.push({
        path: "/",
      });
    },
    toHome() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.TopBar {
  width: 830px;
  margin: 0 auto;
  height: 80px;
  padding: 10px 0;

  box-sizing: border-box;
  // border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    height: 100%;
    img {
      height: 100%;
    }
  }
  .log {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #999;
  }
}
</style>
