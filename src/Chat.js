import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';
import db from  './firebase';
import './Chat.css';
import { useStateProviderValue } from './StateProvider';
import firebase from 'firebase';


function Chat() {

    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setroomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateProviderValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot((snapshot)=>
                setroomName(snapshot.data().name));
        }

        if(roomId){
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot)=>{
                setMessages(snapshot.docs.map(doc=>(
                    doc.data()
                )))
            })
        }
    }, [roomId])

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
    },[roomId])

    const sendMessage =(e)=>{
        e.preventDefault();
        console.log(input);
        
        db.collection('rooms').doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
    <p>Last seen at {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_bg"></div>
            <div className="chat_body">
                {messages.map((message, index)=>(
                    <div className={`chat_message ${ message.name === user.displayName && "chat_receiver"}`} key={index}>
                        {message.message}
                        <span className="chat_name">{message.name}</span>
                        <span className="chat_time">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </div>
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value) } type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send a Message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat
