var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io'); // 加入 Socket.IO

var server = http.createServer(function(request, response) {
  var path = url.parse(request.url).pathname;

  switch (path) {
    case '/':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Hello, World.');
      response.end();
      break;
    case '/socket.html':
      fs.readFile(__dirname + path, function(error, data) {
        if (error){
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
        } else {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data, "utf8");
        }
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

var serv_io = io.listen(server);

// 使用 on() 函數將 connection 事件與一個匿名函數連接
// 若websocket一建立連線，就會使用 emit() 函數來傳送資料
serv_io.sockets.on('connection', function(socket) {
  console.log('connection');
  socket.emit('message', {'message': 'hello world'});
  setInterval(function() {
    // 向瀏覽器傳送日期時間
      socket.emit('date', {'date': new Date()});
    }, 1000);
  socket.on('client_data', function(data) {
    console.log(data.letter);
    socket.emit('message', {'message': data.letter})
  })
});