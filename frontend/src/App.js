import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route, Routes, useNavigate } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import { BrowserRouter } from "react-router-dom";
import { ChatContext } from "./Context/ChatProvider";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
      if (!userInfo) {
        navigate("/");
      }
    };
    fetchUserData();
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/chats" element={<Chatpage />} />
        </Routes>
      </div>
    </ChatContext.Provider>
  );
}

export default App;
