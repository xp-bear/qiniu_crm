<template>
  <div class="List">
    <!-- 头部顶部栏 -->
    <div class="top">
      <img :src="require('../assets/logo.png')" alt="" />
      <div class="logo">
        <a href="https://github.com/xp-bear" target="_blank"> <div class="github"></div> </a>
        <el-button v-if="userObj?.email == '1693889638@qq.com'" type="success" style="height: 40px; margin-right: 10px" @click="toLoadAll">
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
    <!-- 数据搜索栏 -->
    <div class="file-search">
      <el-select @change="updateFileType" ref="fuzzySearch" v-model="searchType" placeholder="文件类型" style="width: 150px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-input placeholder="搜索文件名称" v-model="searchName" clearable> </el-input>
      <el-input placeholder="搜索文件备注信息" v-model="searchRemark" clearable> </el-input>
      <el-date-picker @change="selectTime" value-format="yyyy-M-d" v-model="searchTimeRange" type="daterange" range-separator="→" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <div>
        <el-button @click="searchFiles" type="primary" icon="el-icon-search">查询数据</el-button>
        <el-button @click="resetCondition" type="warning" icon="el-icon-refresh">重置条件</el-button>
      </div>
    </div>

    <!-- 搜索栏数据查询 -->
    <el-empty style="height: 70vh" v-if="filesArray.length <= 0" description="暂无数据,快去上传吧。"></el-empty>
    <!-- 数据展示页面 -->
    <!--  :style="`background-color:rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`" -->
    <div class="datas">
      <div class="card" :style="`background:${cardColor[item.file_type]}`" @click="openMark(index)" v-for="(item, index) in filesArray" :key="item.file_id">
        <div class="img-card" v-if="item.file_type == 0" :style="`background: url('${item.file_link}') top center; height:88px; background-size:cover;`"></div>
        <video v-else-if="item.file_type == 1" :src="item.file_link" style="height: 88px"></video>
        <div @click="openTxt(index)" v-else-if="item.file_type == 2" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/2.png" alt="" />
        </div>
        <div @click="openDocx(index)" v-else-if="item.file_type == 3" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/3.png" alt="" />
        </div>
        <div @click="openPdf(index)" v-else-if="item.file_type == 4" style="display: flex; justify-content: center">
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
        <div @click="openTxt(index)" v-else-if="item.file_type == 11" style="display: flex; justify-content: center">
          <img style="width: 88px; height: 88px" src="../assets/types/11.png" alt="" />
        </div>
        <!-- 角标 -->
        <div class="tag"><img :src="require(`../assets/types/${item.file_type}.png`)" alt="" /></div>
        <!-- 文件信息 -->
        <div class="file-name eclipse">{{ getListName(item.file_name, item.file_suffix) }}</div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[35, 70, 100, 150]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNumber"
      :background="true"
      prev-text="上一页"
      next-text="下一页"
    >
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog style="padding: 0" top="1vh" :visible.sync="dialogVisible" width="80%" @close="closeDialog" :destroy-on-close="true">
      <span slot="title" class="Gradual">文件预览</span>
      <div class="dialog" style="position: relative">
        <span v-show="fileDetail.file_type == 0" style="position: absolute; left: 0%; top: -4%; font-family: 'consolas'; background-color: #eaecef; padding: 2px 4px; border-radius: 3px"
          >图片尺寸: {{ imgWidth }}×{{ imgHeight }}</span
        >
        <div ref="dFile" class="d-file slider">
          <div v-if="fileDetail.file_type == 0" style="width: 100%; height: 100%; text-align: center">
            <img
              ref="img"
              class="file-img"
              :src="fileDetail.file_link"
              alt=""
              style="background: url('http://cdn.xxoutman.cn/%E9%A9%AC%E8%B5%9B%E5%85%8B-1678353275378.png?1678353275530'); vertical-align: middle"
            />
          </div>
          <video ref="video" v-else-if="fileDetail.file_type == 1" style="width: 100%" controls autoplay loop>
            <source :src="fileDetail.file_link" type="video/mp4" />
          </video>
          <div v-else-if="fileDetail.file_type == 2">
            <div style="white-space: pre-wrap; font-size: 16px; line-height: 1.16em" v-html="txtInfo"></div>
          </div>
          <div v-else-if="fileDetail.file_type == 3" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <div ref="file" style="width: 100%; height: 100%"></div>
          </div>
          <div v-else-if="fileDetail.file_type == 4" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <div id="mypdf" style="width: 100%; height: 100%"></div>
          </div>
          <div v-else-if="fileDetail.file_type == 5" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <iframe style="width: 100%; height: 100%" :src="`http://view.officeapps.live.com/op/view.aspx?src=${fileDetail.file_link}`" frameborder="0"></iframe>
          </div>
          <div v-else-if="fileDetail.file_type == 6" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <iframe style="width: 100%; height: 100%" :src="`https://view.officeapps.live.com/op/view.aspx?src=${fileDetail.file_link}`" frameborder="0"></iframe>
          </div>
          <div v-else-if="fileDetail.file_type == 7" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <img style="width: 128px; height: 128px" src="../assets/types/7.png" alt="" />
          </div>
          <div v-else-if="fileDetail.file_type == 8" style="height: 100%; display: flex; justify-content: center; align-items: center">
            <img style="width: 128px; height: 128px" src="../assets/types/8.png" alt="" />
          </div>
          <div v-else-if="fileDetail.file_type == 9" class="audio-file">
            <div class="audio green-audio-player">
              <div class="loading" style="display: none">
                <div class="spinner"></div>
              </div>
              <!-- 播放与暂停 -->
              <div class="play-pause-btn" style="display: flex">
                <i style="width: 24px; height: 15px; font-size: 24px; color: #566574" class="iconfont" :class="isPlaying ? 'icon-24gf-pause2' : 'icon-24gf-play'" @click="changeClass"></i>
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
          <div v-else-if="fileDetail.file_type == 11">
            <div style="white-space: pre-wrap; font-size: 16px; line-height: 1.16em" v-html="txtInfo"></div>
          </div>
          <!-- 下载进度条展示 -->
          <div style="display: flex; justify-content: center; width: 70%; position: absolute; bottom: -20px">
            <span style="width: 80px">下载进度:&nbsp;</span>
            <el-progress style="width: 100%" :percentage="download_process"></el-progress>
          </div>
        </div>

        <div class="d-info">
          <ul style="margin: 0; padding: 0; font-size: 16px">
            <li style="display: flex; align-items: center">
              <span style="width: 85px">文件名称:</span>
              <span @click="copyLink(fileDetail.file_name + fileDetail.file_suffix)" style="cursor: pointer; flex: 1" class="eclipse">{{ fileDetail.file_name + fileDetail.file_suffix }}</span>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">文件大小:</span>
              <span @click="copyLink(getSize(parseInt(fileDetail.file_size)))" style="cursor: pointer; flex: 1" class="eclipse">{{ getSize(parseInt(fileDetail.file_size)) }}</span>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">上传时间:</span>
              <span @click="copyLink(dateOne(fileDetail.file_upload_time))" style="cursor: pointer; flex: 1" class="eclipse">{{ dateOne(fileDetail.file_upload_time) }}</span>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">文件链接:</span>
              <span @click="copyLink(fileDetail.file_link)" style="flex: 1; cursor: pointer" class="eclipse">{{ fileDetail.file_link }}</span>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">地理位置:</span>
              <span @click="copyLink(fileDetail.file_address)" style="cursor: pointer; flex: 1" class="eclipse" type="success">{{ fileDetail.file_address }}</span>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">文件所属者:</span>
              <span @click="copyLink(fileDetail.file_user_name)" style="cursor: pointer; flex: 1" class="eclipse" type="warning">{{ fileDetail.file_user_name }}</span>
            </li>
            <li style="display: flex; align-items: center">
              <span style="width: 85px">文件浏览量:</span>
              <span @click="copyLink(fileDetail.file_view)" style="cursor: pointer; flex: 1" class="eclipse">{{ fileDetail.file_view }} 次</span>
            </li>
            <li>
              <span>文件备注信息:</span>
              <code style="font-family: xp; color: #6a9955; cursor: pointer">&nbsp; {{ fileDetail.file_remark }}</code>
            </li>
          </ul>
          <!-- 下载按钮 -->
          <div>
            <el-button style="width: 48%" type="danger" @click="deleteFile">删除资源</el-button>
            <el-button style="width: 48%" type="success" @click="downloadFile">下载资源</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fileMultipleFindApi, findFileCounterApi, getQiNiuDeleteFileApi, deleteFileApi, updateScreenNumberApi, findAllFileApi } from "@/api/index";
import { getSize } from "@/utils/foramt";
import { downRow } from "@/utils/upload";
import { dateOne } from "@/utils/time_format";
import PDFObject from "pdfobject";
import service from "@/utils/axios";
import { renderAsync } from "docx-preview";
import { cardColor } from "@/utils/config";

export default {
  name: "List",
  data() {
    return {
      cardColor, //每一个列表的背景色。
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

      download_process: 0, //下载文件进度

      searchTimeRange: "", //上传时间范围
      searchType: "", //搜索文件类型
      searchName: "", //搜索文件名称
      searchRemark: "", //搜索文件备注
      options: [
        {
          value: "0",
          label: "图片",
        },
        {
          value: "1",
          label: "视频",
        },
        {
          value: "9",
          label: "音乐",
        },
        {
          value: "7",
          label: "压缩包",
        },
        {
          value: "11",
          label: "代码文件",
        },
        {
          value: "2",
          label: "TXT文本",
        },
        {
          value: "3",
          label: "DOCX文档",
        },
        {
          value: "4",
          label: "PDF文件",
        },
        {
          value: "5",
          label: "PPT幻灯片",
        },
        {
          value: "6",
          label: "XLSX表格",
        },

        {
          value: "10",
          label: "EXE可执行程序",
        },
        {
          value: "8",
          label: "其他文件",
        },
      ],
      totalNumber: 0, //数据总条数
      pageSize: 35, //每页多少条
      currentPage: 1, //当前页码

      imgWidth: 0, //图片宽度
      imgHeight: 0, //图片高度
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
    // 定时localstorage过期时间
    let new_time = new Date().getTime(); //秒数
    let old_time = new Date(window.localStorage.getItem("past_due") || "0").getTime(); //过期的秒数
    if (new_time > old_time) {
      console.log("token过期");
      window.localStorage.setItem("token", "");
      this.$router.push({ path: "/upload" });
    }

    // 判断用户有没有登录。
    this.userObj = JSON.parse(localStorage.getItem("user"));

    if (this.userObj) {
      // 绑定enter事件
      this.enterKeyup();

      // 保存用户信息到vuex中
      this.$store.commit("getUser", this.userObj);
      // console.log("vuex的数据", this.$store.state.userObjStore);

      // 加载该用户的所有上传的数据的数量
      findFileCounterApi({ user_id: this.$store.state.userObjStore.id }).then((res) => {
        this.totalNumber = res.message[0].total_number;
        this.searchFiles();
      });
    }
  },

  methods: {
    dateOne,
    downRow,
    getSize,
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.searchFiles();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.searchFiles();
    },
    // 重置初始条件。
    resetCondition() {
      this.searchTimeRange = "";
      this.searchType = "";
      this.searchName = "";
      this.searchRemark = "";
      this.searchFiles();
    },
    //销毁回车事件
    enterKeyupDestroyed() {
      document.removeEventListener("keyup", this.enterKey);
    },
    // 监听回车事件
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
    // 回车事件
    enterKey(e) {
      this.$refs.fuzzySearch.blur(); //通过ref直接绑定对应的selection调用blur方法即可隐藏下拉框
      if (e.key == "Enter") {
        this.searchFiles();
      }
    },
    // 点击搜索框,筛选数据
    searchFiles() {
      findFileCounterApi({ user_id: this.$store.state.userObjStore.id, file_type: this.searchType != "" ? this.searchType : undefined }).then((result) => {
        this.totalNumber = result.message[0].total_number;
        // 请求数据
        let data = {
          file_user_id: this.$store.state.userObjStore.id,
          file_type: this.searchType != "" ? this.searchType : undefined,
          file_name: this.searchName ? this.searchName : undefined,
          file_remark: this.searchRemark ? this.searchRemark : undefined,
          time_range: this.searchTimeRange ? this.searchTimeRange : undefined,
          page_num: this.currentPage, //当前页码
          page_size: this.pageSize, //每一页数据条数
        };
        fileMultipleFindApi(data).then((res) => {
          this.filesArray = res.message;
        });
      });
    },
    // 修改下拉框,选择值
    updateFileType(value) {
      // console.log(value);
      this.currentPage = 1;
      this.searchFiles();
    },

    // 下载文件三部曲
    async downloadFileProcess(fileUrl, fileName) {
      let blob = await this.getBlob(fileUrl);
      this.saveFile(blob, fileName);
    },
    getBlob(fileUrl) {
      let that = this;
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", fileUrl, true);
        //监听进度事件
        xhr.addEventListener(
          "progress",
          function (evt) {
            if (evt.lengthComputable) {
              let percentComplete = evt.loaded / evt.total;
              // percentage是当前下载进度，可根据自己的需求自行处理
              let percentage = percentComplete * 100;
              // console.log(percentage);
              that.download_process = parseFloat(percentage.toFixed(2));
            }
          },
          false
        );
        xhr.responseType = "blob";
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response);
          }
        };
        xhr.send();
      });
    },
    saveFile(blob, fileName) {
      // ie的下载
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        // 非ie的下载
        const link = document.createElement("a");
        link.classList.add("download_link");
        const body = document.querySelector("body");

        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;

        // fix Firefox
        link.style.display = "none";
        body.appendChild(link);

        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href);
      }
    },
    // list 文件名展示
    getListName(names, suffix) {
      if (names.includes("-")) {
        names = names.split("-");
        names.pop();
        names = names.join(" ");
      }
      return names + suffix;
    },
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
            let currentTime = parseInt(this.$refs.audio?.currentTime.toFixed(0));
            let duration = parseInt(this.$refs.audio?.duration.toFixed(0));
            let currentTimeremainder = currentTime % 60;
            currentTimeremainder = currentTimeremainder < 10 ? "0" + currentTimeremainder : currentTimeremainder;
            // 进度条进度
            this.currentMusicTime = Math.floor(currentTime / 60) + ":" + currentTimeremainder;
            this.totalMusicTime = Math.floor(duration / 60) + ":" + (duration % 60);
            this.currentTime = currentTime;
            this.totalTime = duration;
            // 做判断,播放结束
            if (this.currentTime >= this.totalTime) {
              this.isPlaying = false;
            }
          };
        }
      }, 500);

      // 判断是不是图片
      setTimeout(() => {
        if (this.$refs.img) {
          // console.log("图片尺寸: ", this.$refs.img.width, this.$refs.img.height);
          this.imgWidth = this.$refs.img.width;
          this.imgHeight = this.$refs.img.height;
          // console.log(this.imgWidth, this.imgHeight);
          if (this.$refs.img.width > 1037) {
            this.$refs.dFile.style.overflowX = "hidden";
            this.$refs.img.style.width = "100%";
            this.$refs.img.style.opacity = 1;
          } else {
            if (this.$refs.img.height > 558) {
              this.$refs.dFile.style.overflowY = "hidden";
              this.$refs.img.style.height = "100%";
              this.$refs.img.style.opacity = 1;
            } else {
              this.$refs.img.style.opacity = 1;
            }
          }
        }
      }, 300);
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
          message: "内容已复制到粘贴板!",
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
      this.download_process = 0; //下载文件进度条
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
    // 预览pdf文件
    openPdf(index) {
      setTimeout(() => {
        let file_url = this.filesArray[index].file_link;
        PDFObject.embed(file_url, "#mypdf");
      }, 500);
    },
    // 预览docx文件
    openDocx(index) {
      let file_url = this.filesArray[index].file_link;
      setTimeout(() => {
        service({
          method: "post",
          responseType: "blob",
          //请求头自己写
          headers: {},
          // 文件路径
          url: file_url,
        }).then((data) => {
          renderAsync(data, this.$refs.file, null);
        });
      }, 500);
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
            // 删除数据库对应的数据
            deleteFileApi({ file_id: this.fileDetail.file_id }).then((res) => {
              // console.log(res);
              this.filesArray.splice(this.fileIndex, 1);
              this.dialogVisible = false;
              this.$message({
                type: "success",
                message: "资源删除成功!",
                duration: 1000,
              });
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 1000,
          });
        });
    },
    // 下载文件
    downloadFile() {
      // 根据下载文件进度条,做判断
      if (this.download_process > 0 && this.download_process < 100) {
        return this.$message({
          message: "该文件已经在下载中!",
          type: "error",
          duration: 1000,
        });
      } else if (this.download_process == 100) {
        return this.$message({
          message: "文件已经下载完成!",
          type: "success",
          duration: 1000,
        });
      }

      let name = this.fileDetail.file_name.split("-");
      name.pop();
      name = name.join("-");
      this.downloadFileProcess(this.fileDetail.file_link, name + this.fileDetail.file_suffix);
    },
    // 加载所有数据
    toLoadAll() {
      // 没有数据,加载数据星球
      findAllFileApi({ user_id: this.$store.state.userObjStore.id }).then((res) => {
        this.filesArray = res.message;
      });
    },
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

    // 时间范围选择。
    selectTime(value) {
      console.log(value);
    },
  },
  destroyed() {
    // 销毁enter事件
    this.enterKeyupDestroyed();
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
  .pdfobject-container {
    height: 680px;
    border: 1rem solid rgba(0, 0, 0, 0.1);
  }
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
  .file-search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .el-input {
      width: 225px;
    }
  }
  .datas {
    margin-left: 10px;
    width: 100%;
    align-items: start;
    .card {
      float: left;
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
      // background-color: #cccccc80;
      border-radius: 3px;
      .img-card {
        transition: all 1s;
        &:hover {
          background-position: bottom center !important;
        }
      }
      .file-name {
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
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
  .el-pagination {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    font-family: xp;
    padding: 10px 0;
    /deep/.btn-next,
    /deep/.btn-prev {
      background-color: #ff6fa2;
      color: #fff;
      padding: 0 5px;
    }
    /deep/.el-pager li {
      background-color: #ff6fa2;
      color: #fff;
      transition: all 0.3s;
      &:hover {
        border-radius: 90% 0;
      }
    }
    /deep/.el-pager li:not(.disabled).active {
      background-color: #ff6fa2;
      color: #fff;
      border-radius: 90% 0;
    }
    /deep/.el-pager li:not(.disabled) {
      &:hover {
        color: #fff;
      }
    }
    /deep/.el-input__inner {
      font-size: 14px;
    }
    /deep/.el-pagination__total {
      font-size: 16px;
    }
    /deep/.el-input__inner:focus {
      border-color: #ff6fa2;
    }
    /deep/.el-input .el-input__inner:hover {
      border-color: #ff6fa2;
    }
  }
  .dialog {
    display: flex;
    .d-file {
      width: 70%;
      height: 80vh;
      box-sizing: border-box;
      overflow: auto;
      font-family: consolas;
      line-height: 1.1em;
      color: #1c1c1e;
      .audio-file {
        width: 100%;
        height: 100%;
        background: url("http://cdn.xxoutman.cn/tuchuang_music-1675916098865.jpg?1675916099175") no-repeat center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
        vertical-align: middle;
        display: inline-block;
        transition: all 0.3s;
      }
      .file-img {
        opacity: 0;
      }
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

      .el-progress {
        display: flex;
        align-items: center;
        /deep/.el-progress__text {
          width: 58px;
        }
      }
    }

    .d-info {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
      font-size: 16px;
      overflow: hidden;
      /deep/.el-tag {
        font-size: 16px;
        font-family: xp;
        letter-spacing: 0.05em;
      }
      ul {
        li {
          list-style: none;
          margin-bottom: 20px;
          span {
            &:nth-child(1) {
              text-align: right;
              font-family: xp;
            }
            &:nth-child(2) {
              font-family: xp;
              padding: 5px 8px;
              border-radius: 3px;
              border: 1px solid transparent;
              background-image: linear-gradient(60deg, #f12711, #f5af19);
              background-clip: text;
              color: transparent;

              // &:hover {
              //   border: 1px solid #409eff60;
              // }
            }
          }
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
