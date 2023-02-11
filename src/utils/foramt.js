// 吧b转成mb
export function getSize(limit) {
  var size = "";
  if (limit < 0.1 * 1024) {
    //小于0.1KB，则转化成B
    size = limit.toFixed(2) + "B";
  } else if (limit < 0.1 * 1024 * 1024) {
    //小于0.1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + "KB";
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    //小于0.1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB";
  } else {
    //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }

  var sizeStr = size + ""; //转成字符串
  var index = sizeStr.indexOf("."); //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
  if (dou == "00") {
    //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
  }
  return size;
}

// 文件类型格式处理
export function fileType(type) {
  let counter = null;
  type = type.toLowerCase();
  if (type.includes(".jpg") || type.includes(".png") || type.includes(".jpeg") || type.includes(".webp") || type.includes(".ico") || type.includes(".gif")) {
    counter = 0;
  } else if (type.includes(".mp4") || type.includes(".avi") || type.includes(".mov")) {
    counter = 1;
  } else if (type.includes(".txt")) {
    counter = 2;
  } else if (type.includes(".doc") || type.includes(".docx")) {
    counter = 3;
  } else if (type.includes(".pdf")) {
    counter = 4;
  } else if (type.includes(".ppt") || type.includes(".pptx")) {
    counter = 5;
  } else if (type.includes(".xls") || type.includes(".xlsx")) {
    counter = 6;
  } else if (type.includes(".rar") || type.includes(".7z") || type.includes(".zip")) {
    counter = 7;
  } else if (type.includes(".mp3")) {
    counter = 9;
  } else if (type.includes(".exe")) {
    counter = 10;
  } else if (
    type.includes(".js") ||
    type.includes(".ts") ||
    type.includes(".py") ||
    type.includes(".java") ||
    type.includes(".php") ||
    type.includes(".json") ||
    type.includes(".html") ||
    type.includes(".css") ||
    type.includes(".less") ||
    type.includes(".sass") ||
    type.includes(".sql")
  ) {
    counter = 11;
  } else {
    counter = 8;
  }
  return counter;
}
