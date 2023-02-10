let baseUrl = "";
if (process.env.NODE_ENV == "development") {
  // 开发环境
  baseUrl = "http://127.0.0.1:7777";
} else {
  // 打包环境
  baseUrl = "http://150.158.21.251:7777";
}

const cardColor = [
  "rgba(252,175,162,0.60)",
  "rgba(255,227,148,0.60)",
  "rgba(146,230,245,0.60)",
  "rgba(168,237,138,0.60)",
  "rgba(202,167,247,0.60)",
  "rgba(212,212,212,0.60)",
  "rgba(193, 98, 11,0.60)",
  "rgba(232, 123, 142,0.60)",
  "rgba(39, 117, 183,0.60)",
  "rgba(68, 189, 137,0.60)",
  "rgba(220, 146, 37,0.60)",
];
export { baseUrl, cardColor };
