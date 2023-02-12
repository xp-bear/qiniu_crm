let baseUrl = "";
if (process.env.NODE_ENV == "development") {
  // 开发环境
  baseUrl = "http://127.0.0.1:7777";
} else {
  // 打包环境
  baseUrl = "http://150.158.21.251:7777";
}

const cardColor = [
  "rgba(245, 246, 250,0.6)",
  "rgba(245, 246, 250,0.6)",
  "rgba(245, 246, 250,0.6)",
  "rgba(245, 246, 250,0.6)",
  "rgba(245, 246, 250,0.6)",
  "rgba(245, 246, 250,0.6)",
  "rgba(245, 246, 250,0.6)",
  "rgba(245, 246, 250,0.6)",
  "rgba(245, 246, 250,0.6)",
  "rgba(245, 246, 250,0.6)",
  "rgba(245, 246, 250,0.6)",
  "rgba(245, 246, 250,0.6)",
];
export { baseUrl, cardColor };
