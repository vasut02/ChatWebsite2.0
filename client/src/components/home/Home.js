import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../../UserContext";
import { Redirect } from "react-router-dom";
import Roomlist from "./Roomlist";
import io from 'socket.io-client';
import serverURL from "../../constant"

let socket;
const Home = () => {
    const ENDPT = `http://${serverURL}/`
    const { user, setUser } = useContext(UserContext);
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        socket = io(ENDPT);
        return () => {
            socket.emit('disconnect')
            socket.off();
        }
    }, [ENDPT])

    useEffect(() => {
        socket.on('room-created',room=>{
            console.log(room);
            setRooms([...rooms,room])
        })
    }, [rooms])

    useEffect(() => {
        socket.on('output-rooms', rooms=>{
            setRooms(rooms);
        })
    }, [])

    const handleSubmit = (e)=>{
        e.preventDefault();
        socket.emit('create-room', room)
        console.log(room);
        setRoom('')
    }
    


    const setAsVasu = () => {
        const Vasu = {
            name: "Vasu",
            email: "Vasutiwari69@gmail.com",
            password: "123",
            id: "69"
        }
        setUser(Vasu);
    }

    const setAsZeroTwo = () => {
        const ZeroTwo = {
            name: "ZeroTwo",
            email: "darlingOhayo@gmail.com",
            password: "02",
            id: "02"
        }
        setUser(ZeroTwo);
    }

    if (!user){
        return <Redirect to='/login'/>
    }
    return (
        <div>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Welcome {user ? user.name : ''}</span>
                            <div className="row">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="room" type="text"
                                                className="validate"
                                                value={room}
                                                onChange={e=>setRoom(e.target.value)} 
                                            />
                                            <label htmlFor="room">Enter Room id</label>
                                        </div>
                                    </div>
                                    <button onSubmit className="btn">Create Room</button>
                                </form>
                            </div>
                        </div>
                        {/* <div className="card-action ">
                            <a onClick={setAsVasu} >Enter Chat As Vasu</a>
                            <a onClick={setAsZeroTwo} >Enter Chat As ZeroTwo</a>
                        </div> */}
                    </div>
                </div>
                <div className="col s6 m5 offset-1">
                    <Roomlist rooms={rooms} />
                </div>
            </div>
        </div>
    )
}

export default Home
