//引入axios
import service from "@/utils/axios";

// 获取七牛用户token
export const getQiNiuTokenApi = (data) => service.get("/token", { params: data });
// 七牛删除文件
export const getQiNiuDeleteFileApi = (data) => service.post("/delete", data);

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
// 查询文件数量接口
export const findFileCounterApi = (data) => service.post("/findfilecounter", data);
// 查询文件接口
export const findAllFileApi = (data) => service.post("/findallfile", data);
// 删除文件接口
export const deleteFileApi = (data) => service.post("/deletefile", data);
// 增加浏览量接口
export const updateScreenNumberApi = (data) => service.post("/updatescreennumber", data);
// 增加香蕉接口
export const insertBananaApi = (data) => service.post("/insertbanana", data);
// 10.修改用户信息接口
export const updateUserInfoApi = (data) => service.post("/updateuserinfo", data);
// 11.修改文件表的文件所属者
export const fileEditNameApi = (data) => service.post("/fileeditname", data);
// 12.相关文件多条件查询。
export const fileMultipleFindApi = (data) => service.post("/filemultiplefind", data);
