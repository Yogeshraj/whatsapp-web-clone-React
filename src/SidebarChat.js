import React, {useState, useEffect} from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';

import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ addNewChat, id, name }) {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("");

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
    },[]);

    useEffect(()=>{
        if(id){
            db.collection("rooms").doc(id).collection('messages').orderBy("timestamp","desc").onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc)=>(doc.data()))) 
            )
        }
    }, [id]);

    const createChat = () =>{
        const roomName = prompt("Please Enter your name to chat!");
        if(roomName){
            db.collection('rooms').add({
                name:roomName
            })
        }
    }


    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebar_chat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="chat_info">
                <h3>{name}</h3>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ) : (
        <div className="sidebar_chat" onClick={createChat}>
            <div className="chat_info">
                <h3>Add new chat</h3>
            </div>
        </div>
    )
}

export default SidebarChat