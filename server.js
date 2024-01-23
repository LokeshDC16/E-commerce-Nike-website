require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000 //if process.env.PORT else 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo') //for storing sessions
const passport = require('passport')
// const http = require('http'); // Import the 'http' module
// const server = http.createServer(app); // Create an HTTP server from your Express app
const Emitter = require('events')



//Database connection
// const url = 'mongodb://localhost/nike';

// const url='mongodb://localhost:27017/nike';

// const url = 'mongodb://0.0.0.0:27017/nike';
//process.env.MONGO_CONNECTION_URL
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
mongoose.connection.once('open', () => {
    console.log('Database connected...');
}).on('error', err => {
    console.log('Connection failed...');
})

//session store                              Not working   store: MongoDbStore  .create({
// let mongoStore = new MongoDbStore({     //  Not working       mongoUrl: url
//     mongooseConnection: connection,     //  Not working   }),
//     collection: 'sessions'              //  Not working   cookie: { maxAge: 1000 * 60 * 60 * 24 } 
// })                                      //  Not working   }));

const mongoStore = MongoDbStore.create({
    mongoUrl: process.env.MONGO_CONNECTION_URL,
    collectionName: 'sessions' // Set the collection name for your sessions
});

//event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)


//Session config
//session works using cookie
//for encrypting cookie we need secret key
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    // store:MongoDbStore.create({
    //     mongoUrl: url
    //     // mongooseConnection: connection,
    //     // collection: 'sessions',
    //     // client: connection.getClient()
    // }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //life of cookie in milliseconds = 24hrs
    // cookie: { maxAge: 1000 * 15 }
}));

//passport config
const initPassport = require('./app/config/passport');
initPassport(passport);
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// app.use(passport.initialize())
// app.use(passport.session())

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


require('./routes/web')(app)


// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`)
// })


// //socket

// const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//     console.log(socket.id);
// });

app.use((req, res) => {
    res.status(404).render('errors/404')
})


const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
    // Join
    // console.log(socket.id)
    socket.on('join', (orderId) => {
        // console.log(orderId)
        socket.join(orderId)
    })
})


eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})


//final commit


//env



///last commit done