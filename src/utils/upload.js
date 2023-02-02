// 图片上传方法,获取图片链接
export const getObjectURL = (file) => {
  let url = null;
  if (window.createObjectURL != undefined) {
    //basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    //firefox
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    //webkit
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};

// 根据url下载
export const downRow = (data, name, suffix) => {
  let ajax = new XMLHttpRequest();
  ajax.open("GET", data, true);
  ajax.responseType = "blob";
  // ajx.withCredentials = true; //如果跨域
  ajax.onload = function (oEvent) {
    let content = ajax.response;
    let a = document.createElement("a");
    a.download = name + suffix; //文件名
    a.style.display = "none";
    let blob = new Blob([content]);
    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  ajax.send();
};
