module.exports = function(io){
    const chat = io.on('connection', function (socket) {
        console.log(`${socket.id} CONNECTED`);
    
        socket.on('Chatroom', function (data) {
            console.log(data.user + ': ' + data.message)
            chat.emit('Chatroom', data)
        });
    
        socket.on('disconnect', function () {
            // chat.emit('Chatroom', {user:'Server', message:`${socket.id} DISCONNECTED`})
            console.log(`${socket.id} DISCONNECTED`);
        });
    
    });
  }