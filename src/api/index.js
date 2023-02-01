//引入axios
import service from "@/utils/axios";

// 获取七牛用户token
export const getQiNiuTokenApi = (data) => service.get("/token", { params: data });
// 新建文件
export const insertFileApi = (data) => service.post("/insertfile", data);
// 创建用户
export const createUserApi = (data) => service.post("/createuser", data);
// 判断邮箱是否相同
export const sameEmailApi = (data) => service.post("/sameemail", data);
// 发送验证码邮件。
export const sendMailApi = (data) => service.post("/sendmail", data);
// 登录接口。
export const userLoginApi = (data) => service.post("/userlogin", data);