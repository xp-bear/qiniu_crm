<template>
  <div class="editUser">
    <div class="box">
      <div class="edit-avatar">
        <span>我的头像</span>
        <div>
          <div v-show="!selectImage">
            <img :src="$store.state.userObjStore.avatar" alt="" />
            <p>修改头像</p>
          </div>
          <!-- 选择头像 -->
          <input type="file" class="file" id="file" @change="showPhoto" />
          <div v-show="selectImage">
            <img :src="this.url" alt="" />
          </div>
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
        <p style="padding-left: 15px; color: #6a6e66">{{ dateOne($store.state.userObjStore.create_time) }}</p>
      </div>
      <div>
        <span>个性签名</span>
        <div style="width: 400px">
          <el-input v-model="sign" type="textarea" placeholder="请输入个性签名"></el-input>
        </div>
      </div>
    </div>
    <el-button type="danger" style="width: 20%" @click="confirmEdit">确认修改</el-button>
    <el-button type="warning" style="width: 20%" @click="backEdit">返回</el-button>
  </div>
</template>

<script>
import { getObjectURL } from "@/utils/upload";
import { dateOne } from "@/utils/time_format";
import { getQiNiuTokenApi, updateUserInfoApi, fileEditNameApi } from "@/api/index";
import * as qiniu from "qiniu-js";
export default {
  name: "editUser",
  data() {
    return {
      nickname: this.$store.state.userObjStore.username, //昵称
      sign: this.$store.state.userObjStore.sign, //签名
      url: this.$store.state.userObjStore.avatar, //头像链接
      selectImage: false, //选择图片状态
      fileImgDetail: "", //头像文件信息
      qiniu_token: "", //七牛token信息
      file_name: `user.${this.$store.state.userObjStore.id}.png`,
    };
  },
  methods: {
    dateOne,
    // 切换动态组件
    backEdit() {
      // 返回用户展示界面
      this.$emit("changeComponent", "UserBanner");
    },
    confirmEdit() {
      // 做一个数据的提交
      this.$confirm("是否要修改用户信息, 是否继续?", "熊仔图床提示您", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          setTimeout(async () => {
            // 保存数据到数据库
            let userData = { avatar: this.url, username: this.nickname, sign: this.sign, user_id: this.$store.state.userObjStore.id };
            await updateUserInfoApi(userData);
            // 修改vuex的数据
            this.$store.commit("updateUserInfo", userData);
            // 修改和localstorage的的数据
            let user = JSON.parse(localStorage.getItem("user"));
            user.avatar = this.url;
            user.username = this.nickname;
            user.sign = this.sign;
            localStorage.setItem("user", JSON.stringify(user));

            // 修改完之后 ,还要修改文件表的file_user_name
            await fileEditNameApi({ file_user_name: this.nickname, file_user_id: this.$store.state.userObjStore.id });

            this.$message({
              message: "用户信息修改成功",
              type: "success",
              duration: 1000,
            });

            setTimeout(() => {
              this.$emit("changeComponent", "UserBanner");
            }, 1000);
          }, 300);
        })
        .catch(() => {
          this.$message({
            message: "用户取消修改！",
            type: "info",
            duration: 1000,
          });
        });
    },
    // 选择图片,获得临时链接
    async showPhoto() {
      let type = document.getElementById("file").files[0].name; //上传文件类型
      if (type.includes(".jpg") || type.includes(".png") || type.includes(".jpeg") || type.includes(".webp") || type.includes(".ico") || type.includes(".gif")) {
        let link = getObjectURL(document.getElementById("file").files[0]);
        this.url = link;
        this.selectImage = true;
        this.fileImgDetail = document.getElementById("file").files[0];

        //上传图片到七牛云
        let that = this; //拿到外面的this
        // 获取token
        let params = {
          space: "cookies",
          name: this.file_name,
        };
        let res = await getQiNiuTokenApi(params);
        this.qiniu_token = res.uploadToken;
        // 这里要进行文件的上传操作
        const putExtra = {
          mimeType: null,
        };
        const config = {
          useCdnDomain: true,
          region: qiniu.region.z2,
        };
        let observable = qiniu.upload(this.fileImgDetail, that.file_name, this.qiniu_token, putExtra, config);
        let observer = {
          next(res) {},
          error(err) {},
          complete(res) {
            let key = encodeURIComponent(res.key);
            let base_url = "http://cdn.xxoutman.cn/";
            that.url = base_url + key + "?" + Date.now();
            // console.log("上传成功: ", that.url);
          },
        };
        observable.subscribe(observer); // 上传over
      } else {
        this.$message({
          message: "请选择图片格式文件！",
          type: "error",
          duration: 2000,
        });
      }
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
      top: 0;
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
