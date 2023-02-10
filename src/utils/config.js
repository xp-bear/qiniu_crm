let baseUrl = "";
if (process.env.NODE_ENV == "development") {
  // 开发环境
  baseUrl = "http://127.0.0.1:7777";
} else {
  // 打包环境
  baseUrl = "http://150.158.21.251:7777";
}

const cardColor = [
  "rgba(82, 196, 197,0.6)",
  "rgba(152, 235, 114,0.6)",
  "rgba(218, 251, 119,0.6)",
  "rgba(223, 156, 215,0.6)",
  "rgba(249, 111, 134,0.6)",
  "rgba(135, 169, 155,0.6)",
  "rgba(235, 220, 211,0.6)",
  "rgba(213, 157, 163,0.6)",
  "rgba(95, 100, 166,0.6)",
  "rgba(220, 68, 163,0.6)",
  "rgba(13, 205, 240,0.6)",
];
export { baseUrl, cardColor };
