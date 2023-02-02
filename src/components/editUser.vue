<template>
  <div class="editUser">
    <div class="box">
      <div class="edit-avatar">
        <span>我的头像</span>
        <div>
          <img src="http://cdn.xxoutman.cn/logo.jpg" alt="" />
          <p>修改头像</p>
          <input type="file" class="file" />
        </div>
      </div>
      <div>
        <span>我的昵称</span>
        <div style="width: 400px">
          <el-input v-model="nickname"></el-input>
        </div>
      </div>
      <div>
        <span>注册时间</span>
        <p style="padding-left: 15px; color: #6a6e66">2021年10月8日 (星期五) 20时45分</p>
      </div>
      <div>
        <span>个性签名</span>
        <div style="width: 400px">
          <el-input v-model="sign" type="textarea" placeholder="请输入个性签名"></el-input>
        </div>
      </div>
    </div>
    <el-button type="primary" style="width: 20%" @click="confirmEdit">确认修改</el-button>
  </div>
</template>

<script>
export default {
  name: "editUser",
  data() {
    return {
      nickname: "",
      sign: "",
    };
  },
  methods: {
    confirmEdit() {
      this.$emit("changeComponent", "UserBanner");
    },
  },
};
</script>

<style lang="less" scoped>
.editUser {
  padding-top: 10px;
  .box > div {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .box > div > span {
    width: 86px;
    margin-right: 20px;
  }
  .edit-avatar {
    position: relative;
    .file {
      position: absolute;
      width: 102px;
      height: 102px;
      left: 105px;
      opacity: 0;
    }
    img {
      width: 102px;
      height: 102px;
    }
    p {
      position: absolute;
      width: 102px;
      height: 26px;
      line-height: 26px;
      background-color: rgba(204, 204, 204, 0.6);
      color: rgb(255, 255, 255);
      font-size: 12px;
      text-align: center;
      box-sizing: border-box;
      bottom: 0;
      margin: 0;
    }
  }
}
</style>
