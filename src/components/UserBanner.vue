<template>
  <div class="UserBanner">
    <div class="avatar-info">
      <div class="left">
        <img :src="$store.state.userObjStore.avatar" alt="" />
        <el-tag type="info" size="small" class="editinfo" @click="toeditUser">编辑资料</el-tag>
      </div>
      <div class="center">
        <span class="title">{{ $store.state.userObjStore.username }} </span>
        <p>{{ $store.state.userObjStore.sign }}</p>
        <div class="money">
          <img src="../assets/bananer.png" alt="" />
          <span>{{ $store.state.userObjStore.banana_num }}</span>
        </div>
      </div>
      <div class="right">
        <div class="right-num">
          <div class="right-info">
            <div>6</div>
            <div>关注</div>
          </div>
          <div class="right-info">
            <div>6399</div>
            <div>粉丝</div>
          </div>
          <div class="right-info">
            <div>52</div>
            <div>文件</div>
          </div>
        </div>
        <button class="qiandao" @click="insertBanana">
          <img src="//ali-imgs.acfun.cn/kos/nlav10360/static/img/sign.cf4133ff.svg" alt="" />
          <span>签到得香蕉</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { insertBananaApi } from "@/api/index";
import { getNextDate } from "@/utils/time_format";
export default {
  name: "UserBanner",
  data() {
    return {
      isBananaState: false, //今天是否签到
    };
  },
  mounted() {
    // let timer = new Date();
    //   let Y = timer.getFullYear(); //年
    //   let M = timer.getMonth() + 1; //月
    //   let D = timer.getDate(); //日
    // console.log(getNextDate(`${Y}-${M}-${D}`));
    console.log();
  },
  methods: {
    getNextDate,
    toeditUser() {
      this.$emit("changeComponent", "editUser");
    },
    // 增加香蕉接口
    insertBanana() {
      // console.log(localStorage.getItem("time"));
      if (!localStorage.getItem("time")) {
        // 判断是不是今天

        // 在localstorage保存今天的日期
        let timer = new Date();
        let Y = timer.getFullYear(); //年
        let M = timer.getMonth() + 1; //月
        let D = timer.getDate(); //日
        localStorage.setItem("time", getNextDate(`${Y}-${M}-${D}`));

        // 修改vuex的值
        this.$store.commit("insertB");
        // 修改localstorage的值
        let datas = JSON.parse(localStorage.getItem("user"));
        datas.banana_num++;
        // console.log(datas);
        localStorage.setItem("user", JSON.stringify(datas));

        insertBananaApi({ user_id: this.$store.state.userObjStore.id }).then((res) => {
          this.$message({
            message: "签到成功！",
            type: "success",
            duration: 1000,
          });
        });
      } else {
        let timer = new Date();
        let Y = timer.getFullYear(); //年
        let M = timer.getMonth() + 1; //月
        M = M < 10 ? "0" + M : M;
        let D = timer.getDate(); //日
        D = D < 10 ? "0" + D : D;
        let local_time = localStorage.getItem("time");
        console.log(local_time, `${Y}-${M}-${D}`);
        if (local_time <= `${Y}-${M}-${D}`) {
          let timer = new Date();
          let Y = timer.getFullYear(); //年
          let M = timer.getMonth() + 1; //月
          let D = timer.getDate(); //日
          localStorage.setItem("time", getNextDate(`${Y}-${M}-${D}`));

          // 修改vuex的值
          this.$store.commit("insertB");
          // 修改localstorage的值
          let datas = JSON.parse(localStorage.getItem("user"));
          datas.banana_num++;
          // console.log(datas);
          localStorage.setItem("user", JSON.stringify(datas));

          insertBananaApi({ user_id: this.$store.state.userObjStore.id }).then((res) => {
            this.$message({
              message: "签到成功！",
              type: "success",
              duration: 1000,
            });
          });
        } else {
          this.$message({
            message: "今天已经签到过！",
            type: "error",
            duration: 1000,
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.UserBanner {
  width: 100%;
  height: 100%;
  .avatar-info {
    width: 100%;
    height: 172px;
    display: flex;
    .left {
      width: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .editinfo {
        cursor: pointer;
        padding: 0 20px;
        box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.1);
        background: #fff;
        &:hover {
          background: #f5f5f5;
        }
      }
      img {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
        border-radius: 50%;
      }
    }
    .center {
      width: 470px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding-left: 20px;
      .title {
        color: rgb(51, 51, 51);
        font-size: 20px;
      }
      p {
        font-size: 14px;
        color: #999999;
      }
      .money {
        display: flex;
        align-items: center;

        img {
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
        span {
          font-family: xp;
          font-size: 24px;
          background: linear-gradient(92.05deg, #b487e4 12.09%, #f778ba 42.58%, #ff7b72 84.96%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: rgba(0, 0, 0, 0);
        }
      }
    }
    .right {
      width: 210px;
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      justify-content: space-between;
      margin-bottom: 25px;
      .right-num {
        display: flex;
        text-align: center;
        justify-content: space-evenly;
        .right-info {
          font-size: 18px;
          color: #333333;
          cursor: pointer;
          &:hover {
            color: #fd4c5d;
          }
          div:nth-child(2) {
            font-size: 14px;
            color: #666666;
          }
        }
      }
      .qiandao {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        height: 52px;
        background: #fff;
        cursor: pointer;
        &:hover {
          background: #e5e5e5;
          border-radius: 5px;
        }
        span {
          height: 24px;
          line-height: 28px;
        }
        img {
          margin-right: 2px;
          vertical-align: baseline;
        }
      }
    }
  }
}
</style>
