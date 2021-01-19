const express = require('express');
const app = express();

//for cors policy
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//auth routes
app.use(express.json());
const authRoutes = require('./routes/authRoutes')
//cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser())

app.use(authRoutes);


const http = require('http').Server(app);

//socket and helper function
const io = require('socket.io')(http);
const { addUser, RemoveUser, getUser } = require('./helper')

// mongodb
const mongoose = require('mongoose');

//cloud database
// const mongodb = "mongodb+srv://<TopSecret>@cluster0.vbxue.mongodb.net/Chat-Database?retryWrites=true&w=majority"

//local database and enough memorey
const mongodb = "mongodb://127.0.0.1:27017/ChatApp"

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected...'))
    .catch(err => console.log(err))

const Room = require('./models/Room')
const Message = require('./models/Message')

//PORT
const PORT = process.env.PORT || 8000

//set cookie
app.get('/set-cookies' , (req,res)=>{
    res.cookie('username' , 'Vasu')
    res.cookie('isAuthenticated' , true , { maxAge: 365*24*60*60*1000})
    res.send('cookies are set');
})
app.get('/get-cookies' , (req,res)=>{
    const cookies = req.cookies;
    console.log(cookies);
    res.json(cookies);
})

//To remove depreceate warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

io.on('connection', (socket) => {

    console.log('a user connected', socket.id);
    Room.find().then(result => {
        socket.emit('output-rooms', result)
    })
    socket.on('create-room', name => {
        // console.log(`the room created is ${name}`);
        const room = new Room({ name });
        room.save().then(result => {
            io.emit('room-created', result)
        })
    })
    socket.on('join', ({ name, room_id, user_id, }) => {
        const { error, user } = addUser({
            socket_id: socket.id,
            name,
            user_id,
            room_id
        })

        socket.join(room_id);
        if (error) {
            console.log("join error", error);
        } else {
            console.log('join user', user);
        }
    })

    socket.on('sendMessage', (message, room_id, callback) => {
        const user = getUser(socket.id)
        const msgToStore = {
            name: user.name,
            user_id: user.user_id,
            room_id,
            text: message
        }

        console.log('message received:', msgToStore);
        const msg = new Message(msgToStore);
        msg.save().then(result => {
            io.to(room_id).emit('message', result);
            callback();
        })
    })

    socket.on('disconnect', () => {
        // console.log('user left from', room_id );
        const user = RemoveUser(socket.id);
    })
    
});

http.listen(PORT, () => {
    console.log(`listening on *: ${PORT} `);
});
