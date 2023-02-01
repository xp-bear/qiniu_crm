<template>
  <div class="Upload">
    <TopBar></TopBar>
    <UploadImg></UploadImg>
  </div>
</template>

<script>
import UploadImg from "@/components/UploadImg.vue";
import TopBar from "@/components/TopBar.vue";
export default {
  name: "Upload",
  components: {
    UploadImg,
    TopBar,
  },
};
</script>
<style lang="less">
.Upload {
  height: 100vh;
  background-color: #fafafa;
}
</style>
