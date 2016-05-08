// 我們載入http模組
var http = require('http');

// 利用內建的createServer架設一個基本的HTTP伺服器
// 用一個call back function接收HTTP伺服器的 request& response
// 最後HTTP伺服器需要設定listen的port，監聽所有HTTP伺服器行為
// 並同時將server收到的訊息顯示在終端上(console.log)
var server = http.createServer(function(req, res) {
  //  接著使用 response.writeHead() 設定 HTTP 回應的標頭資訊
  res.writeHead(200, {'Content-Type': 'text/html'});
// 接著設定最主要的網頁內容
  res.write('Hello, World!');
  // 最後結束整個定義過程
  res.end();
});
console.log('3000');
server.listen(3000);