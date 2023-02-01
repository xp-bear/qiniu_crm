<template>
  <div class="List">
    <!-- 头部顶部栏 -->
    <div class="top">
      <img src="../assets/logo.png" alt="" />
      <div class="logo">
        <el-button type="primary" style="height: 40px; margin-top: 10px; margin-right: 10px" @click="toUpLoad"><i class="el-icon-document-remove"></i> 上传文件 Go</el-button>

        <div v-if="!userObj" class="login-register" @click="toLogin">登录/注册</div>
        <div v-else class="avatar">
          <img :src="userObj.avatar" alt="" />
          <span>{{ userObj.username }}</span>
        </div>
      </div>
    </div>

    <!-- 数据展示页面 -->
    <div class="datas">
      <div class="card" @click="openMark" v-for="item in 20" :style="`background:url('http://cdn.xxoutman.cn/logo.jpg') no-repeat;background-size:cover;`">
        <!-- 角标 -->
        <div class="tag"><img src="../assets/types/0.png" alt="" /></div>
      </div>
    </div>
    <el-dialog style="padding: 0" top="1vh" :visible.sync="dialogVisible" width="80%" :destroy-on-close="true">
      <span slot="title" class="Gradual">文件预览</span>
      <div class="dialog">
        <div class="d-file" @click.stop="toPicBig">
          <!-- <el-tooltip class="item" effect="light" content="点击文件，进入全屏预览。" placement="top"> -->
          <!-- <img style="width: 100%" src="http://cdn.xxoutman.cn/1.png?1675128221892" alt="" /> -->
          <video style="width: 100%" autoplay loop src="http://cdn.xxoutman.cn/2.mp4?1"></video>
          <!-- </el-tooltip> -->
        </div>

        <div class="d-info">
          <ul style="margin: 0; padding: 0">
            <li>文件名称: <el-tag>1.mp4</el-tag></li>
            <li>文件尺寸: <el-tag type="success">1.23MB</el-tag></li>
            <li>文件链接: <el-tag type="warning">http://cdn.xxoutman.cn/1.mp4</el-tag></li>
            <li>文件所属者: <el-tag>熊仔</el-tag></li>
            <li>地理位置: <el-tag type="warning">武汉</el-tag></li>
            <li>文件浏览量: <el-tag type="danger">66</el-tag></li>
            <li>
              文件备注信息: <code>dasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdas</code>
              <!-- <el-tag type="success">这是一张图片</el-tag> -->
            </li>
          </ul>
          <!-- 下载按钮 -->
          <el-button type="danger">下载资源</el-button>
        </div>
      </div>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      dialogVisible: false, //文件展示弹出层
      userObj: "",
    };
  },
  mounted() {
    // 判断用户有没有登录。
    this.userObj = JSON.parse(localStorage.getItem("user"));
    console.log(this.userObj);
  },

  methods: {
    // 跳转上传页面。
    toUpLoad() {
      this.$router.push({
        path: "/upload",
      });
    },
    // 打开遮罩层
    openMark() {
      this.dialogVisible = true;
    },
    // 打开图片大图
    toPicBig() {
      console.log(11);
    },
    //跳转到登录页面。
    toLogin() {
      this.$router.push({
        path: "/login",
      });
    },
  },
  components: {},
};
</script>
<style lang="less" scoped>
.List {
  /deep/.el-dialog__headerbtn .el-dialog__close {
    font-size: 30px;
    background: linear-gradient(92.05deg, #d2a8ff 12.09%, #f778ba 42.58%, #ff7b72 84.96%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: rgba(0, 0, 0, 0);
    font-weight: 700;
  }
  /deep/.el-dialog__headerbtn {
    top: 18px;
  }
  width: 1200px;
  margin: 0 auto;
  .top {
    width: 100%;
    height: 80px;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    img {
      height: 100%;
    }
    .logo {
      display: flex;

      .avatar {
        display: flex;
        align-items: center;
        padding: 0 5px;
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          border: 1px solid #66b1ff;
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        span {
          font-size: 18px;
          margin-left: 5px;
          background: linear-gradient(92.05deg, #d2a8ff 12.09%, #f778ba 42.58%, #ff7b72 84.96%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: rgba(0, 0, 0, 0);
          font-weight: 700;
        }
      }
      .login-register {
        display: flex;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          color: #fd4c5d;
        }
      }
    }
  }
  .datas {
    display: flex;
    flex-wrap: wrap;
    .card {
      width: 160px;
      height: 90px;
      background-color: rebeccapurple;
      margin-bottom: 10px;
      margin-right: 10px;
      position: relative;
      cursor: pointer;
      box-sizing: border-box;
      border: 2px solid transparent;
      &:hover {
        transition: all 0.3s;
        border: 2px solid #409eff;
      }
      img {
        width: 100%;
      }
      .tag {
        position: absolute;
        width: 20px;
        height: 20px;
        top: -5px;
        left: -5px;
        img {
          width: 100%;
          border-radius: 50%;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
  .dialog {
    display: flex;
    // background-color: pink;
    .d-file {
      width: 70%;
      box-sizing: border-box;
      overflow-y: auto;
      // box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.1);
      // background-color: #409eff;
      height: 80vh;
      img {
        vertical-align: middle;
      }
    }

    .d-info {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
      font-size: 16px;
      // background-color: rebeccapurple;
      overflow: hidden;
      ul {
        li {
          list-style: none;
          margin-bottom: 20px;
        }
      }
    }
  }
  .d-title {
    background: linear-gradient(92.05deg, #d2a8ff 12.09%, #f778ba 42.58%, #ff7b72 84.96%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: rgba(0, 0, 0, 0);
    font-size: 18px;
  }
}
</style>
