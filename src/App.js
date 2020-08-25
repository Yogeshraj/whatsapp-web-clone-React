import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";

import {  BrowserRouter as Router,  Switch,  Route,  useParams} from "react-router-dom";
import { useStateProviderValue } from './StateProvider';

function App() {
  // const [ user, setUser ] = useState(null);

  const [{user}, dispatch] = useStateProviderValue();

  return (
    <div className="App">
      {!user ? <Login /> :
      <div className="app_body">
        <Router>
          <Sidebar />
          <Switch>
          <Route path="/" exact>
              <Chat />
            </Route>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
      }
    </div>
  );
}

export default App;
