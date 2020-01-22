module.exports = function(io){
    const control = io.on('connection', function (socket) {
        console.log(`${socket.id} CONNECTED`);
    
        socket.on('keyboard', function (data) {
            console.log('keyboard: ' + data)
            // control.emit('keyboard', data)
        });

        socket.on('sensor', function (data) {
            console.log('sensor: ' + data)
            // control.emit('keyboard', data)
        });
    
        socket.on('disconnect', function () {
            console.log(`${socket.id} DISCONNECTED`);
        });
    
    });
  }