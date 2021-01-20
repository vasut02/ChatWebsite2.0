import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../UserContext";
import { Link, useParams, Redirect } from "react-router-dom";
import io from 'socket.io-client';
import Messages from "./messages/Messages";
import Input from './input/Input'
import './chat.css'
import serverURL from "../../constant"

let socket;

const Chat = () => {
    const ENDPT = `http://${serverURL}/`
    const { user, setUser } = useContext(UserContext);
    const { room_id, room_name } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!user) {
            return <Redirect to='/login' />
        }
        socket = io(ENDPT);
        socket.emit('join', { name: user.name, room_id, user_id: user._id });

    }, [ENDPT]);

    const sendMessage = event => {
        event.preventDefault();
        if (message) {
            console.log(message);
            socket.emit('sendMessage', message, room_id, () => setMessage(''));
        }
    }

    useEffect(() => {
        if (!user) {
            return <Redirect to='/login' />
        }
        socket.on('message', message => {
            setMessages([...messages, message])
        })
    }, [messages])

    if (!user) {
        return <Redirect to='/login' />
    }

    return (
        <div className="outer-container">
            <div>Room Name: {room_name} </div>
            <Messages messages={messages} user_id={user._id} />
            <Input
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />

        </div>
    )
}

export default Chat
