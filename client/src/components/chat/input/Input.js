import React from 'react'
import './input.css'

const Input = ({message,setMessage,sendMessage}) => {
    return (
        <div>
            <form onSubmit={sendMessage} className="form">
                <input type="text" className="input"
                placeholder="Type a Message"
                value={message}
                onChange={event=>setMessage(event.target.value)}
                onKeyPress={event=>event.key === 'Enter'?sendMessage(event):null}
                />
                <button className="sendbutton">Send</button>
            </form>
        </div>
    )
}

export default Input
