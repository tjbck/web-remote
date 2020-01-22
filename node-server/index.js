const express = require('express')
// const fs = require('fs');
const path = require('path');
const history = require('connect-history-api-fallback');
const moment = require('moment');

const app = express();
let server = require('http').createServer(app);

app.use(history());

app.use((req, res, next) => {
    console.log(`${req.connection.remoteAddress} - ${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
});

app.use(express.static(path.join(__dirname, '../dist')));

const io = require('socket.io').listen(server);
require('./sockets/control.js')(io)

// require('./sockets/blackjack.js')(io)
// app.use('/api/members', require('./routes/api/members'))
// app.use('/api/users', require('./routes/api/users'))
// app.use('/donate', express.static('public'))
// app.get('/', (req, res) => res.send('you son of a bitch, i\'m in'))
// app.get('/.well-known/acme-challenge/zvfUksbBpXVdflspSqqdjEqPDQlqQ6e8rbsVc7D8kF4', (req, res) => res.send('zvfUksbBpXVdflspSqqdjEqPDQlqQ6e8rbsVc7D8kF4.MOSUWNE5yDdpWNKgCcrYfugw4fgfDHcsHj_FcFpcUlU'))

let PORT = process.env.PORT || 3000;;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`))