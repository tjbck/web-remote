module.exports = function (io) {

    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];

    const getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    const initDeal = function () {
        let deal = [];
        hit(deal);
        hit(deal);
        return deal
    }

    const calDeal = function(deal){
        let total = 0
        for(let i = 0; i < deal.length; i++){
            total += Math.min(10,(ranks.indexOf(deal[i]) + 1))
        }
        return total 
    }

    const initDealer = function(deal){
        while(calDeal(deal) < 17){
            hit(deal)
        }
        return deal
    }
    
    const hit = function(deal){
        deal.push(ranks[getRandomInt(0,ranks.length)]);
        return deal
    }

    const busted = function(deal){
        if(calDeal(deal) > 21){
            return true
        } else {
            return false
        }
    }
    
    let dealer = initDeal()
    console.log(dealer)
    console.log(calDeal(dealer))


    const blackjack = io.of('/blackjack').on('connection', function (socket) {
        console.log(`blackjack ${socket.id} CONNECTED`);

        socket.on('join', function (data) {
            console.log(data);
            socket.join(data.room);

            blackjack.in(data.room).emit('logs', {
                type: 'user',
                user: data.user,
                room: blackjack.adapter.rooms[data.room]
            })
        });

        socket.on('dealer', room => {
            let dealerCards = initDealer(initDeal());
            blackjack.in(room).emit('dealer', {
                cards: dealerCards,
                busted: busted(dealerCards)
            })
        });

        socket.on('deal', () => {
            // console.log('deal')
            socket.emit('deal', initDeal())
        });

        socket.on('hit', deal => {
            socket.emit('deal', hit(deal))
        });

        socket.on('disconnect', function () {
            console.log(`blackjack ${socket.id} DISCONNECTED`);

        });
    });
}


// //send message only to sender-client

// socket.emit('message', 'check this');

// //or you can send to all listeners including the sender

// io.emit('message', 'check this');

// //send to all listeners except the sender

// socket.broadcast.emit('message', 'this is a message');

// //or you can send it to a room

// socket.broadcast.to('chatroom').emit('message', 'this is the message to all');