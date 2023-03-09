<template>
  <div class="UploadImg">
    <!-- 标题背景图片 -->
    <div class="top"></div>
    <!-- 上传区域 -->
    <div ref="drag" class="up" id="drop_area" @paste="pasting">
      <div class="xiugai" v-show="ifFileType !== -1">
        <i class="el-icon-edit-outline"></i>
        <input type="file" name="file" id="file_xiugai" class="file" @change="showPhoto" />
      </div>

      <div v-show="ifFileType == -1" class="up-infomation">
        <i class="el-icon-upload"></i>
        <span class="up-txt">拖拽到此处也可上传( 支持 ctrl + v )</span>
        <button class="up-btn">上传文件</button>
        <span class="up-txt">
          当前审核队列&nbsp;&nbsp;
          <el-tag size="mini" color="#45818e" class="up-tag">极速</el-tag>
        </span>
        <input type="file" name="file" id="file" class="file" @change="showPhoto" />
      </div>
      <img v-if="ifFileType == 0" :src="url" alt="" style="height: 100%" />
      <video v-else-if="ifFileType == 1" :src="url" muted autoplay loop style="height: 100%">
        <source :src="url" type="video/mp4" />
      </video>
      <div v-else-if="ifFileType == 2" style="display: flex; justify-content: center; align-items: center">
        <img src="@/assets/types/2.png" />
      </div>
      <div v-else-if="ifFileType == 3" style="display: flex; justify-content: center; align-items: center">
        <img src="@/assets/types/3.png" />
      </div>
      <div v-else-if="ifFileType == 4" style="display: flex; justify-content: center; align-items: center">
        <img src="@/assets/types/4.png" />
      </div>
      <div v-else-if="ifFileType == 4" style="display: flex; justify-content: center; align-items: center">
        <img src="@/assets/types/4.png" />
      </div>
      <div v-else-if="ifFileType == 5" style="display: flex; justify-content: center; align-items: center">
        <img src="@/assets/types/5.png" />
      </div>
      <div v-else-if="ifFileType == 6" style="display: flex; justify-content: center; align-items: center">
        <img src="@/assets/types/6.png" />
      </div>
      <div v-else-if="ifFileType == 7" style="display: flex; justify-content: center; align-items: center">
        <img src="@/assets/types/7.png" />
      </div>
      <div v-else-if="ifFileType == 8" style="display: flex; justify-content: center; align-items: center">
        <img src="@/assets/types/8.png" />
      </div>
      <div v-else-if="ifFileType == 9" style="display: flex; justify-content: center; align-items: center">
        <img src="@/assets/types/9.png" />
      </div>
      <div v-else-if="ifFileType == 10" style="display: flex; justify-content: center; align-items: center">
        <img src="@/assets/types/10.png" />
      </div>
      <div v-else-if="ifFileType == 11" style="display: flex; justify-content: center; align-items: center">
        <img src="@/assets/types/11.png" />
      </div>
    </div>
    <!-- 上传进度条 -->
    <el-progress type="line" style="width: 880px; margin-top: 2px" :stroke-width="6" :text-inside="false" :show-text="true" :percentage="proceed"></el-progress>
    <!-- 上传文件信息区域 -->
    <div class="up_info">
      <div class="up-base">
        <span style="margin-right: 10px">基本设置</span>
        <div v-show="fileDetail instanceof Object">
          <el-tag style="margin-right: 10px" type="success" size="small">大小: {{ getSize(fileDetail.size) }}</el-tag>
          <el-tag style="margin-right: 10px" size="small">类型: {{ fileDetail.type || "未知" }}</el-tag>
        </div>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文件名称" prop="name">
          <el-input v-model="ruleForm.name" style="width: 79%" ref="is_name_focus"></el-input>
          <el-select v-model="ruleForm.suffix" placeholder="后缀名" style="width: 20%; float: right" :disabled="true">
            <el-option label=".jpg" value=".jpg"></el-option>
            <el-option label=".png" value=".png"></el-option>
            <el-option label=".jpeg" value=".jpeg"></el-option>
            <el-option label=".mp4" value=".mp4"></el-option>
            <el-option label=".avi" value=".avi"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="存储区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择存储区域" style="width: 100%">
            <el-option label="mkdown-picture" value="mkdown-picture"></el-option>
            <el-option label="cookies" value="cookies"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注信息">
          <el-input type="textarea" v-model="ruleForm.remarkName" placeholder="请填写备注信息" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="up-btn diffBg" type="primary" @click="submitForm('ruleForm')">确认上传</el-button>
          <el-button style="width: 200px; height: 44px; background: linear-gradient(45deg, #3a7bd5, #00a1d6); color: #fff; box-shadow: 0 0 3px #ccc" @click="resetForm('ruleForm')"
            >重置上传状态</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getObjectURL } from "@/utils/upload";
import { getSize, fileType } from "@/utils/foramt";
import { getQiNiuTokenApi, insertFileApi } from "@/api/index";
import * as qiniu from "qiniu-js";
export default {
  name: "UploadImg",
  data() {
    return {
      ruleForm: {
        name: "", //文件名称。
        region: "cookies", //存储区域。
        suffix: "", //后缀名称。
        remarkName: "", //上传文件备注信息
      },
      rules: {
        name: [{ required: true, message: "文件名称为必填项~", trigger: "change" }],
        region: [{ required: true, message: "存储区域为必填项~", trigger: "blur" }],
      },
      ifFileType: -1, // -1-上传信息  0-图片  1-视频  2-txt文件 3-doc文件 4-pdf文件 5-ppt文件 6-表格文件 7-压缩文件 8-未知文件
      url: "", //链接地址3
      fileDetail: "", //文件信息
      qiniu_token: "", //七牛token信息
      proceed: 0, //上传进度
      idUpBtn: false, //上传按钮状态 true禁止上传
      fileAddress: "", //图片的地理位置
      // is_name_focus: false, //名字输入框是否聚焦
    };
  },

  methods: {
    getSize,
    fileType,
    submitForm(formName) {
      if (this.idUpBtn == true) {
        return this.$message({
          message: "请勿重复上传!",
          type: "error",
          duration: 2000,
        });
      }
      // 判断当前的按钮是否是禁用状态。
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.url) {
            // 禁用上传按钮
            this.idUpBtn = true; //确认禁用按钮

            let that = this; //拿到外面的this
            // 获取token
            let params = {
              space: this.ruleForm.region,
              name: this.ruleForm.name + "-" + Date.now() + this.ruleForm.suffix,
            };
            let res = await getQiNiuTokenApi(params);
            this.qiniu_token = res.uploadToken;
            // console.log(this.qiniu_token);

            // 这里要进行文件的上传操作
            const putExtra = {
              mimeType: null,
            };
            const config = {
              useCdnDomain: true,
              region: qiniu.region.z2,
            };
            let observable = qiniu.upload(this.fileDetail, params.name, this.qiniu_token, putExtra, config);
            let observer = {
              next(res) {
                that.proceed = parseInt(res.total.percent.toFixed(0));
              },
              error(err) {
                console.log(err);
              },
              complete(res) {
                let key = encodeURIComponent(res.key);
                let base_url;
                if (that.ruleForm.region == "mkdown-picture") {
                  base_url = "http://mk.xxoutman.cn/";
                } else if (that.ruleForm.region == "cookies") {
                  base_url = "http://cdn.xxoutman.cn/";
                }

                that.url = base_url + key + "?" + Date.now();
                // console.log("上传成功: ", that.url);

                let file_name = params.name.split(".");
                file_name.pop();
                file_name = file_name.join(".");
                if (that.fileAddress) {
                  // 在数据库添加一条数据
                  let datas = {
                    file_upload_time: new Date(),
                    file_type: that.ifFileType,
                    file_link: that.url,
                    file_suffix: that.ruleForm.suffix,
                    file_name: file_name,
                    file_size: that.fileDetail.size,
                    file_region: that.ruleForm.region,
                    file_user_id: that.$store.state.userObjStore.id || 0,
                    file_user_name: that.$store.state.userObjStore.username || "",
                    file_remark: that.ruleForm.remarkName || "当前文件没有备注信息！", //上传文件备注
                    file_address: that.fileAddress,
                    file_view: 1,
                  };
                  insertFileApi(datas).then((result) => {
                    // 在这里数据上传完了,把按钮状态启用
                    that.idUpBtn = false;
                  }); //在数据库新增一条数据
                }

                // 获取复制文件资源地址 , 获取粘贴板的内容
                if (navigator.clipboard && window.isSecureContext) {
                  navigator.clipboard.writeText(that.url);
                  that.$message({
                    message: "上传资源地址已复制到粘贴板!",
                    type: "success",
                    duration: 3000,
                  });
                } else {
                  // 创建text area
                  const textArea = document.createElement("textarea");
                  textArea.value = that.url;
                  // 使text area不在viewport，同时设置不可见
                  document.body.appendChild(textArea);
                  textArea.focus();
                  textArea.select();
                  return new Promise((resolve, reject) => {
                    // 执行复制命令并移除文本框
                    document.execCommand("copy") ? resolve() : reject(new Error("出错了"));
                    textArea.remove();
                  }).then(() => {
                    that.$message({
                      message: "上传资源地址已复制到粘贴板!",
                      type: "success",
                      duration: 3000,
                    });
                  });
                }
              },
            };
            observable.subscribe(observer); // 上传over
          } else {
            this.$message({
              message: "请先选择要上传的文件!",
              type: "error",
              duration: 2000,
            });
          }
        } else {
          this.$message({
            message: "文件名称为必填项!",
            type: "error",
            duration: 2000,
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      // this.proceed = 0;
      // this.ruleForm.name = " ";
      // this.ruleForm.suffix = "";
      // this.ruleForm.remarkName = "";
      // this.url = "";
      // this.ifFileType = -1;
      // this.fileDetail = "";
      // this.idUpBtn = false; //修改按钮状态
      this.$router.go(0);
    },
    // 上传图片临时链接显示
    showPhoto() {
      // 根据进度条判断是否应该上传文件。
      if (this.proceed > 0 && this.proceed < 100) {
        return this.$message({
          message: "已经有文件在上传，请点击重置上传状态!",
          type: "error",
          duration: 2000,
        });
      }

      let type;
      if (document.getElementById("file_xiugai").files[0]) {
        this.idUpBtn = false; //修改按钮状态
        this.proceed = 0;
        type = document.getElementById("file_xiugai").files[0].name; //上传文件类型
        let link = getObjectURL(document.getElementById("file_xiugai").files[0]);
        this.url = link;
        this.fileDetail = document.getElementById("file_xiugai").files[0];
        this.proceed = 0;
      } else {
        type = document.getElementById("file").files[0].name; //上传文件类型
        let link = getObjectURL(document.getElementById("file").files[0]);
        this.url = link;
        this.fileDetail = document.getElementById("file").files[0];
      }
      // console.log(this.fileDetail);
      let names = this.fileDetail.name.split(".");
      this.ruleForm.name = names[0]; //获取文件名称
      this.ruleForm.suffix = "." + names[names.length - 1]; //获取文件名称

      // 文件类型格式处理
      this.ifFileType = fileType(type);

      // 文件名称输入框聚焦
      this.$refs.is_name_focus.focus();
    },
    // 拖拽事件
    handleDrop(e) {
      e.preventDefault();
      // 根据进度条判断是否应该上传文件。
      if (this.proceed > 0 && this.proceed < 100) {
        return this.$message({
          message: "已经有文件在上传，请点击重置上传状态!",
          type: "error",
          duration: 2000,
        });
      }

      this.idUpBtn = false;
      this.proceed = 0;
      this.fileDetail = e.dataTransfer.files[0];
      let names = this.fileDetail.name.split(".");
      this.ruleForm.name = names[0]; //获取文件名称
      this.ruleForm.suffix = "." + names[names.length - 1]; //获取文件名称
      let type = this.fileDetail.name;
      // 文件类型格式处理
      this.ifFileType = fileType(type);

      // 文件名称输入框聚焦
      this.$refs.is_name_focus.focus();

      this.url = getObjectURL(this.fileDetail);
      // console.log(this.fileDetail);
    },
    //销毁回车事件
    enterKeyupDestroyed() {
      document.removeEventListener("keyup", this.enterKey);
    },
    // 监听回车事件
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
    enterKey(e) {
      if (e.key == "Enter") {
        this.submitForm("ruleForm");
      }
    },
    //粘贴板上传图片 在监听事件里，判断是文本就粘贴文本，是图片就走上传方法
    pasting(event) {
      // 根据进度条判断是否应该上传文件。
      if (this.proceed > 0 && this.proceed < 100) {
        return this.$message({
          message: "已经有文件在上传，请点击重置上传状态!",
          type: "error",
          duration: 2000,
        });
      }

      this.idUpBtn = false; //启用上传
      this.proceed = 0;
      let file = null; //要上传的文件
      const items = (event.clipboardData || window.clipboardData).items;
      // console.log(items);
      if (items.length) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            file = items[i].getAsFile();
            // console.log(file);
            // 上传文件操作
            this.fileDetail = file;
            let names = this.fileDetail.name.split(".");
            this.ruleForm.name = names[0]; //获取文件名称
            this.ruleForm.suffix = "." + names[names.length - 1]; //获取文件名称
            let type = this.fileDetail.name;

            // 文件类型格式处理
            this.ifFileType = fileType(type);
            
            // 文件名称输入框聚焦
            this.$refs.is_name_focus.focus();

            this.url = getObjectURL(this.fileDetail);
            break;
          }
        }
      }
    },
    // 利用百度地图API,获取用户定位
    getCurrentCity() {
      //根据用户IP 返回城市级别的定位结果
      let native = new BMap.LocalCity();
      native.get((res) => {
        // console.log(res);
        let gc = new BMap.Geocoder();
        let pointAdd = new BMap.Point(res.center.lng, res.center.lat);
        gc.getLocation(pointAdd, (rs) => {
          // console.log(rs);
          // 百度地图解析城市名
          this.fileAddress = rs.addressComponents.province + "、" + rs.addressComponents.city + "、" + rs.addressComponents.district;
        });
      });
    },
  },
  mounted() {
    // 加载所有用户信息
    // 判断用户有没有登录。
    let userObj = JSON.parse(localStorage.getItem("user"));
    if (userObj) {
      // 保存用户信息到vuex中
      this.$store.commit("getUser", userObj);
    }

    let drag = this.$refs.drag;
    drag.addEventListener("drop", this.handleDrop);
    drag.addEventListener("dragleave", (e) => {
      e.preventDefault();
    });
    drag.addEventListener("dragenter", (e) => {
      e.preventDefault();
    });
    drag.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // 绑定enter事件
    this.enterKeyup();

    // 获取地理位置信息
    // 获取当前城市
    this.getCurrentCity();
  },

  beforeDestroy() {
    let drag = this.$refs.drag;
    drag.removeEventListener("drop", this.handleDrop);
  },
  destroyed() {
    // 销毁enter事件
    this.enterKeyupDestroyed();
  },
};
</script>
<style lang="less" scoped>
.UploadImg {
  width: 830px;
  margin: 0 auto;

  .top {
    width: 830px;
    height: 69px;
    border-radius: 5px;
    background: url("@/assets/top.jpg");
  }
  .up {
    width: 830px;
    height: 300px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border: 2px dashed #ccc;
    padding: 2px;
    box-sizing: border-box;
    overflow: hidden;
    .xiugai {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 50px;
      height: 50px;
      background-color: #cccccc60;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      i {
        font-size: 32px;
        color: #666;
      }
      input {
        position: absolute;
        width: 50px;
        height: 50px;
        z-index: 1;
        opacity: 0;
      }
    }
    .up-infomation {
      position: relative;
      width: 830px;
      height: 300px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .el-icon-upload {
      font-size: 40px;
      color: #ccc;
    }
    .up-txt {
      font-size: 13px;
      color: #999;
      margin-top: 6px;
      .up-tag {
        color: #fff;
        padding: 2px 8px;
        box-sizing: border-box;
        line-height: 16px;
      }
    }
    .up-btn {
      width: 200px;
      height: 44px;
      color: #fff;
      margin: 20px auto;
      cursor: pointer;
      background: #00a1d6;
      border-radius: 4px;
      transition: background-color 0.3s ease;
      text-align: center;
      line-height: 40px;
      white-space: nowrap;
      border: 0;
    }
    #file {
      position: absolute;
      width: 200px;
      height: 44px;
      background-color: pink;
      top: 143px;
      opacity: 0;
    }
  }
  .up_info {
    width: 830px;
    margin: 10px 0;
    padding: 22px;
    box-sizing: border-box;
    box-shadow: 0 0 3px #ccc;
    background-color: #fff;
    .up-base {
      display: flex;
      align-items: center;
      margin-bottom: 22px;
    }
    .up-btn {
      width: 400px;
      height: 44px;
      color: #fff;
      cursor: pointer;
      // background: #00a1d6;
      background: linear-gradient(to right, #606c88, #3f4c6b);
      border-radius: 4px;
      transition: background-color 0.3s ease;
      text-align: center;
      white-space: nowrap;
      margin-left: -70px;
      border: 0;
    }
  }
}
</style>
