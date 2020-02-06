module.exports = function(io){
    const control = io.on('connection', function (socket) {
        console.log(`${socket.id} CONNECTED`);

        socket.on('join', function (data) {
            console.log(data);
            socket.join(data.room);

            // control.in(data.room).emit('logs', {
            //     type: 'user',
            //     user: data.user,
            //     room: blackjack.adapter.rooms[data.room]
            // })
        });
    
        socket.on('message', function (data) {
            console.log('message: ' + data.val)
            control.in(data.room).emit('message', data.val)
        });

        socket.on('pressed', function (data) {
            console.log('pressed: ' + data.val)
            control.in(data.room).emit('pressed', data.val)
        });

        socket.on('released', function (data) {
            console.log('released: ' + data.val)
            control.in(data.room).emit('released', data.val)
        });

        socket.on('sensor', function (data) {
            console.log('sensor: ' + data.val)
            control.in(data.room).emit('sensor', data.val)
        });
    
        socket.on('disconnect', function () {
            console.log(`${socket.id} DISCONNECTED`);
        });
    
    });
  }