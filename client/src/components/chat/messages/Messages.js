import React from 'react'
import Message from "../message/Message";
import STB from "react-scroll-to-bottom";
import './messages.css'

const Messages = ({ messages, user_id }) => {
    return (
        <STB class="messages" >
            messages {user_id}
            {messages.map((message, i) => (
                <Message key={message._id} message={message} current_vid={user_id} />
            ))}
        </STB>
    )
}

export default Messages
