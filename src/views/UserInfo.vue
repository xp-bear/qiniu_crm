<template>
  <div class="UserInfo">
    <div class="top">
      <div class="logo" @click="toHome"><img src="../assets/logo.png" alt="" /></div>
      <div class="log">
        <el-button type="danger" @click="loginOut" style="background-color: #fd4c5d; font-size: 16px; box-sizing: border-box; height: 40px">
          <i class="el-icon-switch-button"></i>
          <span>退出登录</span>
        </el-button>
      </div>
    </div>
    <div class="box">
      <div class="nav">
        <ul>
          <li @click="changeNav(0)" :class="isNavNumber == 0 ? 'active' : ''"><i class="iconfont icon-iconzhucetouxiang"></i> 首页</li>
          <li @click="changeNav(1)" :class="isNavNumber == 1 ? 'active' : ''"><i class="iconfont icon-weibiaoti--"></i> 关注动态</li>
          <li @click="changeNav(2)" :class="isNavNumber == 2 ? 'active' : ''"><i class="iconfont icon-lishijilu"></i> 历史记录</li>
          <li @click="changeNav(3)" :class="isNavNumber == 3 ? 'active' : ''"><i class="iconfont icon-shoucangjia"></i> 收藏夹</li>
          <li @click="changeNav(4)" :class="isNavNumber == 4 ? 'active' : ''"><i class="iconfont icon-shezhi"></i> 设置</li>
        </ul>
      </div>
      <div class="member">
        <!-- <UserBanner :is="comName"></UserBanner>
        <editUser :is="comName"></editUser> -->
        <keep-alive>
          <component :is="comName" @changeComponent="changeComponent"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import UserBanner from "@/components/UserBanner";
import editUser from "@/components/editUser.vue";
export default {
  name: "UserInfo",
  data() {
    return {
      isNavNumber: 0,
      comName: "UserBanner", //动态组件的切换 editUser
    };
  },
  mounted() {
    let data = "";
    data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      // 保存用户信息到vuex中
      this.$store.commit("getUser", data);
    }
  },
  methods: {
    // 跳转图床
    toHome() {
      this.$router.push({
        path: "/",
      });
    },
    // 退出登录
    loginOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$message({
        message: "退出登录成功！",
        type: "success",
        duration: 1000,
      });
      setTimeout(() => {
        this.$router.push({
          path: "/login",
        });
      }, 1000);
    },
    // 切换nav
    changeNav(index) {
      this.isNavNumber = index;
    },
    changeComponent(name) {
      this.comName = name;
    },
  },
  components: {
    TopBar,
    editUser,
    UserBanner,
  },
};
</script>

<style lang="less" scoped>
.UserInfo {
  height: 100vh;
  background-color: #fafafa;
  .active {
    color: #fd4c5d;
  }
  .top {
    width: 1100px;
    margin: 0 auto;
    height: 80px;
    padding: 10px 0;
    box-sizing: border-box;
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
  .box {
    display: flex;
    width: 1100px;
    height: 600px;
    margin: 0 auto;
    justify-content: space-between;
    .nav {
      width: 200px;
      height: 100%;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        li {
          width: 100%;
          height: 48px;
          font-size: 16px;
          padding: 12px 20px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          border-radius: 5px;
          &:hover {
            background: #e5e5e5;
          }
          i {
            font-size: 20px;
            margin-right: 10px;
          }
        }
      }
    }
    .member {
      width: 870px;
    }
  }
}
</style>
