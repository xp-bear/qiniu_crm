//时间格式化方法
export const dateOne = (e) => {
  let d = new Date(e);
  let Y = d.getFullYear(); //年
  let M = d.getMonth() + 1; //月
  let D = d.getDate(); //日

  var hh = d.getHours(); //时
  var mm = d.getMinutes(); //分
  var ss = d.getSeconds(); //秒

  Y < 10 ? (Y = "0" + Y) : Y;
  M < 10 ? (M = "0" + M) : M;
  D < 10 ? (D = "0" + D) : D;
  hh < 10 ? (hh = "0" + hh) : hh;
  mm < 10 ? (mm = "0" + mm) : mm;
  ss < 10 ? (ss = "0" + ss) : ss;
  return `${Y}年/${M}月/${D}日\t${hh}点:${mm}分`;
};

// 获取某天日期的下一天，默认为第二天 默认输出格式为yyyy-mm-dd
export const getNextDate = (date, day = 1, format = "{y}-{m}-{d}") => {
  if (date) {
    date = date.match(/\d+/g).join("-"); // 格式为2022年09月19日处理
    const nDate = new Date(date);
    nDate.setDate(nDate.getDate() + day);

    const formatObj = {
      y: nDate.getFullYear(),
      m: nDate.getMonth() + 1,
      d: nDate.getDate(),
    };
    return format.replace(/{([ymd])+}/g, (result, key) => {
      const value = formatObj[key];
      return value.toString().padStart(2, "0");
    });
  } else {
    console.log("date格式不正确");
  }
};
