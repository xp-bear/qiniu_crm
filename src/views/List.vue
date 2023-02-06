<template>
  <div class="List">
    <!-- 头部顶部栏 -->
    <div class="top">
      <!-- <img v-if="!userObj" src="../assets/data.png" alt="" /> -->
      <img @click="changeState" :src="isLogoState ? require('../assets/logo.png') : require('../assets/data.png')" alt="" />
      <div class="logo">
        <a href="https://github.com/xp-bear" target="_blank"> <div class="github"></div> </a>
        <el-button v-if="userObj?.email == '1693889638@qq.com' || userObj?.email == '2603236601@qq.com'" type="success" style="height: 40px; margin-right: 10px" @click="toLoadAll">
          <i class="el-icon-box"></i>
          <span>数据星球 Home</span>
        </el-button>
        <el-button type="primary" style="height: 40px; margin-right: 10px" @click="toUpLoad">
          <i class="el-icon-document-remove"></i>
          <span>上传文件 Go</span>
        </el-button>
        <div v-if="!userObj" class="login-register" @click="toLogin">登录/注册</div>
        <div v-else class="avatar" @click="toUserInfo">
          <img :src="$store.state.userObjStore.avatar" alt="" />
          <span>{{ $store.state.userObjStore.username }}</span>
        </div>
      </div>
    </div>
    <!-- 搜索栏数据查询 -->
    <el-empty v-if="filesArray.length <= 0" description="暂无数据，快去上传数据吧！"></el-empty>
    <!-- 数据展示页面 -->
    <div class="datas">
      <div class="card" @click="openMark(index)" v-for="(item, index) in filesArray" :key="item.file_id">
        <img v-if="item.file_type == 0" :src="item.file_link" alt="" style="height: 90px" />
        <video v-else-if="item.file_type == 1" :src="item.file_link" style="height: 90px"></video>
        <div @click="openTxt(index)" v-else-if="item.file_type == 2" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/2.png" alt="" />
        </div>
        <div v-else-if="item.file_type == 3" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/3.png" alt="" />
        </div>
        <div v-else-if="item.file_type == 4" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/4.png" alt="" />
        </div>
        <div v-else-if="item.file_type == 5" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/5.png" alt="" />
        </div>
        <div v-else-if="item.file_type == 6" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/6.png" alt="" />
        </div>
        <div v-else-if="item.file_type == 7" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/7.png" alt="" />
        </div>
        <div v-else-if="item.file_type == 8" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/8.png" alt="" />
        </div>
        <div v-else-if="item.file_type == 9" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/9.png" alt="" />
        </div>
        <div v-else-if="item.file_type == 10" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/10.png" alt="" />
        </div>
        <!-- 角标 -->
        <div class="tag"><img :src="require(`../assets/types/${item.file_type}.png`)" alt="" /></div>
        <!-- 文件信息 -->
        <div class="file-name eclipse">{{ item.file_name.split("-")[0] + item.file_suffix }}</div>
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog style="padding: 0" top="1vh" :visible.sync="dialogVisible" width="80%" @close="closeDialog" :destroy-on-close="true">
      <span slot="title" class="Gradual">文件预览</span>
      <div class="dialog">
        <div class="d-file">
          <!-- <el-tooltip class="item" effect="light" content="点击文件，进入全屏预览。" placement="top"> -->
          <img v-if="fileDetail.file_type == 0" style="width: 100%" :src="fileDetail.file_link" alt="" />
          <video v-else-if="fileDetail.file_type == 1" style="width: 100%" controls autoplay loop>
            <source :src="fileDetail.file_link" type="video/mp4" />
          </video>
          <div v-else-if="fileDetail.file_type == 2">
            <div style="white-space: pre-wrap; font-size: 16px; line-height: 1.16em" v-html="txtInfo"></div>
          </div>
          <div v-else-if="fileDetail.file_type == 3" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <img style="width: 128px; height: 128px" src="../assets/types/3.png" alt="" />
          </div>
          <div v-else-if="fileDetail.file_type == 4" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <img style="width: 128px; height: 128px" src="../assets/types/4.png" alt="" />
          </div>
          <div v-else-if="fileDetail.file_type == 5" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <img style="width: 128px; height: 128px" src="../assets/types/5.png" alt="" />
          </div>
          <div v-else-if="fileDetail.file_type == 6" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <img style="width: 128px; height: 128px" src="../assets/types/6.png" alt="" />
          </div>
          <div v-else-if="fileDetail.file_type == 7" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <img style="width: 128px; height: 128px" src="../assets/types/7.png" alt="" />
          </div>
          <div v-else-if="fileDetail.file_type == 8" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <img style="width: 128px; height: 128px" src="../assets/types/8.png" alt="" />
          </div>
          <div v-else-if="fileDetail.file_type == 9" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center">
            <!--  background: linear-gradient(-65deg, #43c6ac, #f8ffae); -->
            <!-- <img style="width: 128px; height: 128px" src="../assets/types/8.png" alt="" /> -->
            <!-- <audio :src="fileDetail.file_link" autoplay controls></audio> -->
            <div class="audio green-audio-player">
              <div class="loading" style="display: none">
                <div class="spinner"></div>
              </div>
              <!-- 播放与暂停 -->
              <div class="play-pause-btn" style="display: flex">
                <i style="width: 24px; height: 24px; font-size: 24px" class="iconfont" :class="isPlaying ? 'icon-24gf-pause2' : 'icon-24gf-play'" @click="changeClass"></i>
              </div>
              <div class="controls">
                <span class="current-time"> {{ currentMusicTime }} </span>
                <!-- 宽度为进度条 -->
                <el-slider :show-tooltip="false" style="width: 210px" v-model="process" @change="changeMusic()"></el-slider>
                <span class="total-time">{{ totalMusicTime }} </span>
              </div>
              <div class="volume">
                <div class="volume-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="#566574"
                      fill-rule="evenodd"
                      d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z"
                      id="speaker"
                    ></path>
                  </svg>
                </div>
                <div class="volume-controls hidden">
                  <div class="slider" data-direction="vertical">
                    <div class="progress">
                      <div class="pin" id="volume-pin" data-method="changeVolume"></div>
                    </div>
                  </div>
                </div>
              </div>
              <audio ref="audio" crossorigin="" :autoplay="isPlaying">
                <source :src="fileDetail.file_link" type="audio/mpeg" />
              </audio>
            </div>
          </div>
          <div v-else-if="fileDetail.file_type == 10" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <img style="width: 128px; height: 128px" src="../assets/types/10.png" alt="" />
          </div>
          <!-- </el-tooltip> -->
        </div>

        <div class="d-info">
          <ul style="margin: 0; padding: 0; font-size: 16px">
            <li style="display: flex; align-items: center">
              <span style="width: 85px">文件名称:</span>
              <el-tag @click="copyLink(fileDetail.file_name + fileDetail.file_suffix)" style="cursor: pointer; flex: 1" class="eclipse">{{ fileDetail.file_name + fileDetail.file_suffix }}</el-tag>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">文件大小:</span><el-tag style="flex: 1" class="eclipse" type="success">{{ getSize(parseInt(fileDetail.file_size)) }}</el-tag>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">上传时间:</span><el-tag style="flex: 1" class="eclipse" type="warning">{{ dateOne(fileDetail.file_upload_time) }}</el-tag>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">文件链接:</span>
              <el-tag @click="copyLink(fileDetail.file_link)" style="flex: 1; cursor: pointer" class="eclipse">{{ fileDetail.file_link }}</el-tag>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">地理位置:</span
              ><el-tag @click="copyLink(fileDetail.file_address)" style="cursor: pointer; flex: 1" class="eclipse" type="success">{{ fileDetail.file_address }}</el-tag>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">文件所属者:</span><el-tag @click="copyLink(fileDetail.file_user_name)" style="flex: 1" class="eclipse" type="warning">{{ fileDetail.file_user_name }}</el-tag>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">文件浏览量:</span><el-tag style="flex: 1" class="eclipse" type="danger">{{ fileDetail.file_view }}</el-tag>
            </li>
            <li>
              文件备注信息: <code style="font-family: xp">{{ fileDetail.file_remark }}</code>
            </li>
          </ul>
          <!-- 下载按钮 -->
          <div>
            <el-button style="width: 48%" type="danger" @click="deleteFile">删除资源</el-button>
            <el-button style="width: 48%" type="success" @click="downloadFile">下载资源</el-button>
          </div>
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
import { findFileApi, getQiNiuDeleteFileApi, deleteFileApi, updateScreenNumberApi, findAllFileApi } from "@/api/index";
import { getSize } from "@/utils/foramt";
import { downRow } from "@/utils/upload";
import { dateOne } from "@/utils/time_format";
export default {
  name: "List",
  data() {
    return {
      dialogVisible: false, //文件展示弹出层
      userObj: "", //用户信息
      filesArray: [], //该用户的所有文件信息
      fileDetail: "", //某一个文件详细信息
      txtInfo: "", //预览文本信息
      fileIndex: 0, //当前打开的文件信息的索引
      clicktag: 0, //下载文件的节流操作
      isPlaying: true, //默认播放
      process: 0, //音频进度条
      currentMusicTime: "0:00", //当前播放时长 0:12
      totalMusicTime: "0:00", //总时长 5:15
      currentTime: 0, //播放时间
      totalTime: 0,
      isLogoState: true, //切换logo图片
    };
  },
  watch: {
    processMusic(newVal, oldVal) {
      // console.log(newVal, oldVal);
      this.process = newVal;
    },
  },
  computed: {
    processMusic: {
      set() {},
      get() {
        return parseFloat(((this.currentTime / this.totalTime) * 100).toFixed(2));
      },
    },
  },
  mounted() {
    // 判断用户有没有登录。
    this.userObj = JSON.parse(localStorage.getItem("user"));
    if (this.userObj) {
      // 保存用户信息到vuex中
      this.$store.commit("getUser", this.userObj);
      // console.log("vuex的数据", this.$store.state.userObjStore);

      // 加载该用户的所有上传的数据
      findFileApi({ user_id: this.userObj ? this.userObj.id : 0 || 0 }).then((res) => {
        this.filesArray = res.message;
        // console.log(this.filesArray);
      });
    } else {
      if (this.userObj?.email == "1693889638@qq.com") {
        findAllFileApi().then((res) => {
          this.filesArray = res.message;
        });
      }
    }
  },

  methods: {
    dateOne,
    downRow,
    getSize,
    // 跳转页面到用户
    toUserInfo() {
      this.$router.push({
        path: "/userinfo",
      });
    },
    getFileData() {},
    // 跳转上传页面。
    toUpLoad() {
      this.$router.push({
        path: "/upload",
      });
    },
    // 打开遮罩层
    openMark(index) {
      this.fileIndex = index;
      this.fileDetail = this.filesArray[index];
      // console.log(this.fileDetail);
      updateScreenNumberApi({ file_id: this.fileDetail.file_id }).then((res) => {
        // 修改当前文件的浏览量
        this.fileDetail.file_view++;
        this.dialogVisible = true;
      });

      // 开始播放
      this.isPlaying = true;
      setTimeout(() => {
        // 监听音频播放时间
        if (this.$refs.audio) {
          this.$refs.audio.ontimeupdate = () => {
            let currentTime = parseInt(this.$refs.audio.currentTime.toFixed(0));
            let duration = parseInt(this.$refs.audio.duration.toFixed(0));
            let currentTimeremainder = currentTime % 60;
            currentTimeremainder = currentTimeremainder < 10 ? "0" + currentTimeremainder : currentTimeremainder;
            // 进度条进度
            // let percentage = parseFloat(((currentTime / duration) * 100).toFixed(2));
            // this.processMusic = percentage;
            // this.processMusic = percentage;
            this.currentMusicTime = Math.floor(currentTime / 60) + ":" + currentTimeremainder;
            this.totalMusicTime = Math.floor(duration / 60) + ":" + (duration % 60);
            this.currentTime = currentTime;
            this.totalTime = duration;
            // console.log(percentage);
            // console.log(`currentTime: ${Math.floor(currentTime / 60) + ":" + currentTimeremainder} , duration: ${Math.floor(duration / 60) + ":" + (duration % 60)}`);
            // 做判断,播放结束
            if (this.currentTime >= this.totalTime) {
              this.isPlaying = false;
            }
          };
        }
      }, 500);
    },

    //跳转到登录页面。
    toLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    // 复制网址链接
    copyLink(value) {
      // 数字没有 .length 不能执行selectText 需要转化成字符串
      const textString = value.toString();
      let input = document.querySelector("#copy-input");
      if (!input) {
        input = document.createElement("input");
        input.id = "copy-input";
        input.readOnly = "readOnly"; // 防止ios聚焦触发键盘事件
        input.style.position = "absolute";
        input.style.left = "-1000px";
        input.style.zIndex = "-1000";
        document.body.appendChild(input);
      }
      input.value = textString;
      // ios必须先选中文字且不支持 input.select();
      this.selectText(input, 0, textString.length);
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        this.$message({
          message: "链接已复制到粘贴板!",
          type: "success",
          duration: 2000,
        });
      } else {
        console.log("不兼容");
      }
      input.blur();
    },
    // 选择文本。createTextRange(setSelectionRange)是input方法
    selectText(textbox, startIndex, stopIndex) {
      if (textbox.createTextRange) {
        // ie
        const range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("character", startIndex); // 起始光标
        range.moveEnd("character", stopIndex - startIndex); // 结束光标
        range.select(); // 不兼容苹果
      } else {
        // firefox/chrome
        textbox.setSelectionRange(startIndex, stopIndex);
        textbox.focus();
      }
    },
    //关闭的回调函数
    closeDialog() {
      this.fileDetail = ""; //清空对话框里面的数据
      this.isPlaying = false;
      this.currentTime = 0;
      this.totalTime = 0;
      this.totalMusicTime = "0:00";
      this.currentMusicTime = "0:00";
    },
    // 预览txt文本
    openTxt(index) {
      // console.log("txt", this.filesArray[index].file_link);
      let file_url = this.filesArray[index].file_link;
      //可以是具体.txt也可以是接口返回的blob，或者web转换
      let xhr = new XMLHttpRequest();
      xhr.open("get", file_url, true);
      xhr.responseType = "blob";
      let self = window; //onload this指向为window中转一下
      let that = this;
      this.loading = true;
      xhr.onload = function () {
        if (this.status == 200) {
          self.loading = false;
          // console.log(this.response);
          const reader = new FileReader();
          reader.onload = function () {
            self.txtPre = reader.result; //获取的数据data
            self.dialogvisibleview = true;
            // console.log("reader.result", reader.result);
            that.txtInfo = reader.result;
          };
          reader.readAsText(this.response);
        } else {
          slef.loading = false;
        }
      };
      xhr.send();
    },
    //删除文件
    deleteFile() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = { file_name: this.fileDetail.file_name + this.fileDetail.file_suffix, space: this.fileDetail.file_region };
          // 删除云端七牛云图片
          getQiNiuDeleteFileApi(data).then((res) => {
            // console.log(res);
            // 删除数据库对应的数据
            deleteFileApi({ file_id: this.fileDetail.file_id }).then((res) => {
              // console.log(res);
              this.filesArray.splice(this.fileIndex, 1);
              this.dialogVisible = false;
              this.$message({
                type: "success",
                message: "资源删除成功!",
              });
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      /*   this.$confirm("此操作将永久删除该文件, 是否继续?", "熊仔图床提示您", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 进行七牛文件删除
          let data = { file_name: this.fileDetail.file_name + file_suffix, space: this.fileDetail.file_region };
          console.log(data);
          // getQiNiuDeleteFileApi(data).then((res) => {
          //   console.log(res);
          // });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });*/
    },
    // 下载文件
    downloadFile() {
      // 节流的使用
      if (this.clicktag == 0) {
        this.clicktag = 1;
        this.downRow(this.fileDetail.file_link, this.fileDetail.file_name, this.fileDetail.file_suffix);
        setTimeout(() => {
          this.clicktag = 0;
        }, 3000);
      } else {
        this.$mb.alert("当前资源正在下载中,请勿重复点击!", "熊仔图床提示您", { confirmButtonText: "确定", type: "warning" });
      }
    },
    // 加载所有数据
    toLoadAll() {
      // 没有数据,加载数据星球
      findAllFileApi().then((res) => {
        this.filesArray = res.message;
      });

      // 修改logo图片
      this.isLogoState = false;

      // if (!this.userObj) {
      //   findAllFileApi().then((res) => {
      //     this.filesArray = res.message;
      //   });
      // } else {
      // this.$confirm("是否退出登录状态，进入数据星球", "熊仔图床提示您", {
      //   confirmButtonText: "确认退出",
      //   cancelButtonText: "取消",
      //   type: "warning",
      //   customClass: "exitLogin",
      // })
      //   .then(() => {
      //     localStorage.clear();
      //     this.userObj = "";
      //     findAllFileApi().then((res) => {
      //       this.filesArray = res.message;
      //     });
      //   })
      //   .catch(() => {
      //     // this.$message({
      //     //   message: "用户已经取消!",
      //     //   type: "info",
      //     //   duration: 2000,
      //     // });
      //   });
      // }
    },
    //
    // 修改播放与暂停状态
    changeClass() {
      this.isPlaying = !this.isPlaying;
      //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
      if (this.$refs.audio.paused) {
        this.$refs.audio.play(); //this.$refs.audio.play();// 这个就是播放
      } else {
        this.$refs.audio.pause(); // 这个就是暂停
      }
    },
    //修改播放音频
    changeMusic() {
      //修改音频进度
      this.processMusic = this.process;
      this.currentTime = (this.process / 100) * this.totalTime;
      this.$refs.audio.currentTime = this.currentTime;
    },
    // 点击数据星球
    changeState() {
      // console.log(this.isLogoState);
      if (this.isLogoState == false) {
        // 数据星球点击
        // 加载该用户的所有上传的数据
        findFileApi({ user_id: this.userObj ? this.userObj.id : 0 || 0 }).then((res) => {
          this.filesArray = res.message;
          // console.log(this.filesArray);
        });
        this.isLogoState = true;
      }
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
  /deep/.el-message-box__wrapper {
    z-index: 99999 !important;
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
    align-items: center;
    img {
      height: 60px;
    }
    .logo {
      display: flex;
      align-items: center;
      .avatar {
        display: flex;
        align-items: center;
        padding: 0 5px;
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
        box-sizing: border-box;
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
      .github {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
        background: url("http://cdn.xxoutman.cn/github1.png?1675437890671") no-repeat;
        background-size: cover;
        transition: all 0.3s;
        &:hover {
          background: url("http://cdn.xxoutman.cn/github.png?1675437438721") no-repeat;
          background-size: cover;
          box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
  .datas {
    display: flex;
    flex-wrap: wrap;
    .card {
      width: 160px;
      height: 110px;
      box-sizing: border-box;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
      margin-bottom: 10px;
      margin-right: 10px;
      position: relative;
      cursor: pointer;
      box-sizing: border-box;
      border: 2px solid transparent;
      vertical-align: middle;
      display: flex;
      flex-direction: column;
      .file-name {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 20px;
        font-size: 14px;
        font-family: xp;
      }
      img {
        width: 100%;
        height: 100%;
      }
      video {
        width: 100%;
        height: 100%;
      }
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
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
      overflow: auto;
      // box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.1);
      // background-color: #409eff;
      height: 80vh;
      /deep/.el-slider__button {
        width: 16px;
        height: 16px;
        border-color: #44bfa3;
        border-radius: 8px;
        border: 0;
        background-color: #44bfa3;
      }
      /deep/.el-slider__runway {
        height: 6px;
      }
      /deep/.el-slider__bar {
        background-color: #44bfa3;
        height: 6px;
      }
      /deep/.el-slider__button.dragging,
      .el-slider__button.hover,
      .el-slider__button:hover {
        transform: scale(1.01);
      }
      /deep/.el-slider__button-wrapper {
        width: 16px;
        height: 16px;
        top: -9px;
      }
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
      /deep/.el-tag {
        font-size: 16px;
        // font-weight: 700;
        font-family: xp;
        letter-spacing: 0.05em;
      }
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
