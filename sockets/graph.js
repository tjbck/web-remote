module.exports = function (io) {
    const socketChart = io.of('/socketChart').on('connection', function (socket) {
        console.log(`socketChart ${socket.id} CONNECTED`);
    
        socket.on('Chatroom', function (data) {
            console.log(data.user + ': ' + data.message)
            socketChart.emit('Chatroom', data)
        });
    
        socket.on('Users', function (data) {
            socketChart.emit('Users', data)
        });
    
        socket.on('disconnect', function () {
            console.log(`socketChart ${socket.id} DISCONNECTED`);
        });
    });

    let times = 0.9;
    let wait = false;

    setInterval(() => {
        if (!wait) {
            if (Math.random() < 0.97) {
                // times += Math.floor(Math.random() * (10))
                times += 0.01
                socketChart.emit('Data', times);
                socketChart.emit('Status', {
                    onGoing: true,
                    times: times,
                    timeLeft: null
                })
            } else {
                times = 0.9;
                socketChart.emit('Status', {
                    onGoing: true,
                    times: 0,
                    timeLeft: null
                })

                wait = true;

                let timesRun = 0

                const coolTime = setInterval(function () {
                    timesRun += 1
                    socketChart.emit('Status', {
                        onGoing: false,
                        times: times,
                        timeLeft: ((100 - timesRun) / 10)
                    })

                    if (timesRun === 100) {
                        clearInterval(coolTime);
                        wait = false;
                    }
                    //do whatever here..
                }, 100);
            }
        }
    }, 100);
}

