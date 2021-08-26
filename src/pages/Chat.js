import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export default function Chat() {
  const [user, setUser] = useState(auth().currentUser);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const dummy = useRef();

  useEffect(() => {
    setReadError(null);
    setLoadingChats(true);
    //const chatArea = this.myRef.current;
    try {
      db.ref("room-messages/").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          console.log(snap.val());
          console.log(snap.val().message);
          chats.push(snap.val());
        });
        chats.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });
        setChats(chats);
        dummy.current.scrollIntoView({ behavior: "smooth" });
        //chatArea.scrollBy(0, chatArea.scrollHeight);
        setLoadingChats(false);
      });
    } catch (error) {
      setReadError(error.message);
      setLoadingChats(false);
    }
  }, []);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("In submit button");
    event.preventDefault();
    setWriteError(null);

    const chatArea = dummy.current;
    try {
      db.ref("chats").push({
        message: content,
        timestamp: Date.now(),
        userId: user.uid,
      });
      setContent("");
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      setWriteError(error.message);
    }
  };

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  };

  return (
    <div>
      <Header />
      <div className="chat-area" ref={dummy}>
        {/* loading indicator */}
        {loadingChats ? (
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          ""
        )}
        {/* chat area */}
        {chats.map((chat) => {
          return (
            <p
              key={chat.timestamp}
              className={
                "chat-bubble " + (user.uid === chat.uid ? "current-user" : "")
              }
            >
              {chat.message}
              <br />
              <span className="chat-time float-right">
                {formatTime(chat.timestamp)}
              </span>
            </p>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="mx-3">
        <textarea
          className="form-control"
          name="content"
          onChange={handleChange}
          value={content}
        ></textarea>
        {/* {error ? <p className="text-danger">{error}</p> : null} */}
        <button type="submit" className="btn btn-submit px-5 mt-4">
          Send
        </button>
      </form>
      <div className="py-5 mx-3">
        Login in as: <strong className="text-info">{user.email}</strong>
      </div>
    </div>
  );
}
