import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Chat, MoreVert, DonutLarge, SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";

import db from './firebase';
import { useStateProviderValue } from "./StateProvider";

const Sidebar = () => {

  const [ rooms, setRooms ] = useState([]);

  const [{user}, dispatch] = useStateProviderValue();

  useEffect(()=>{
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
      setRooms(snapshot.docs.map((doc)=>({
        id:doc.id,
        data:doc.data(),
      })))
    })

    return () =>{
      unsubscribe();
    }
  }, [])

  const dpChange = () =>{
    alert();
  }

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <IconButton onClick={dpChange}>
          <Avatar src={user?.photoURL} />
        </IconButton>
        <div className="right_sidebar">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
          <div className="searchbar_container">
            <SearchOutlined />
            <input type="text" placeholder="Search here"  />
          </div>
      </div>

      <div className="sidebar_chats">
            <SidebarChat addNewChat />
            {rooms.map(room =>(
              <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            ))}
      </div>
    </div>
  );
};

export default Sidebar;
