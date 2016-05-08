var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io')(http); // 加入 Socket.IO

var server = http.createServer(function(request, response) {
  var path = url.parse(request.url).pathname;
  switch (path) {
    case '/':
      fs.readFile(__dirname + '/msg_send.html', function(error, data) {
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
    case '/msg_wall':
      fs.readFile(__dirname + path + '.html', function(error, data) {
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

server.listen(3000, function(){
  console.log('3000');
});

var serv_io = io.listen(server);

// 使用 on() 函數將 connection 事件與一個匿名函數連接
// 若websocket一建立連線，就會使用 emit() 函數來傳送資料
io.on('connection', function(socket) {
  socket.on('client_data', function(data) {
    console.log(data);
    io.emit('message', data)
  })
});

// io.on('connection', function(socket){
//   socket.on('client_data', function(msg){
//     console.log(msg);
//     io.emit('message', msg);
//   });
// });