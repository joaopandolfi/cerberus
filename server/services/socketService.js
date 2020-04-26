
const SockerService = {}


SockerService.Register = (http) =>{
    var io = require('socket.io')(http);
    
    io.on('connection', function(socket){
        console.log('A user connected :D');
        socket.on("send",(data) =>{
            console.log("Sending data ->",data)
            socket.broadcast.emit("receive",data)
        })

        socket.on("responded",(data) =>{
            console.log("Responded data ->",data)
            socket.broadcast.emit("feedback",data)
        })

        socket.on('disconnect', function(){
          console.log('user disconnected :(');
        });
    });
}

module.exports = SockerService
