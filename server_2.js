var http = require("http");
var url = require('url');
var fs = require('fs');


var server = http.createServer(function(request, response) {
  // 當伺服器接收到請求時，使用 url.parse() 函數解析出網址中所指定的路徑
  // 可用 console.log(path) 來看看實際路徑解析的情形
  var path = url.parse(request.url).pathname;

  // 依照解析的路徑決定動作
  switch (path) {
    case '/':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Hello, World.');
      response.end();
      break;
    case '/socket.html':
    // 若路徑為 /socket.html 則用fs 模組讀取socket.hthml檔案
      fs.readFile(__dirname + path, function(err, data) {
        // cheak讀取連結過程是否有誤
        if (err){
          //若連結過程有誤則回應404
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
        } else {
          //成功讀取則載入連結
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data, "utf8");
        }
        // 最後一樣要記得加上 response.end() 結束整個處理流程的定義，讓它開始執行
        response.end();
      });
      break;
    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }
});

console.log('3000');
server.listen(3000);