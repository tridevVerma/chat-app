import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const user_list = [
  { name: "Alan", avatar_bg: "hsl(18, 60%, 60%)" },
  { name: "Bob", avatar_bg: "hsl(57, 80%, 50%)" },
  { name: "Carol", avatar_bg: "hsl(118, 60%, 70%)" },
  { name: "Dean", avatar_bg: "hsl(212, 60%, 70%)" },
  { name: "Elin", avatar_bg: "hsl(324, 80%, 70%)" },
];

const Main = () => {
  // state to manage new message
  const [textMsg, setTextMsg] = useState("");

  // state to manage display status of emoji-picker
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  // state to manage display of users list
  const [showUsersList, setShowUsersList] = useState(false);

  // state to store conversation
  const [conversations, setConversations] = useState([
    {
      chatID: 1,
      user: { name: "Alan", avatar_bg: "hsl(18, 60%, 60%)" },
      time: "12.44 PM",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam est autem sed cum minima facere illum quae minus adipisci accusantium!",
      liked: false,
      noOfLikes: 2,
    },
    {
      chatID: 2,
      user: { name: "Bob", avatar_bg: "hsl(57, 80%, 50%)" },
      time: "10.24 PM",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      liked: false,
      noOfLikes: 1,
    },
  ]);
  // toggle emoji-picker
  function toggleEmojiPicker() {
    setOpenEmojiPicker(!openEmojiPicker);
  }

  // toggle users-list
  function toggleUsersList() {
    setShowUsersList(!showUsersList);
  }

  // select emoji and add it to message input box
  function handleEmojiSelect(e) {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setTextMsg((currentText) => currentText + emoji);
  }

  // get current time from international date formatter
  function getCurrentTime() {
    const date = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formatter = new Intl.DateTimeFormat("en-IN", options);
    return formatter.format(date);
  }

  function handleNewMessage(e) {
    e.preventDefault();
    if (!textMsg) {
      return;
    }
    const index = parseInt(Math.random() * user_list.length);
    const newMessage = {
      chatID: conversations.length + 1,
      user: user_list[index],
      time: getCurrentTime(),
      content: textMsg,
      liked: false,
      noOfLikes: 0,
    };

    setConversations((con) => [...con, newMessage]);
    setTextMsg("");
  }

  function handleLike(id) {
    setConversations((con) => {
      return con.map((msg) => {
        if (msg.chatID === id) {
          if (msg.liked) {
            return { ...msg, liked: false, noOfLikes: msg.noOfLikes - 1 };
          } else {
            return { ...msg, liked: true, noOfLikes: msg.noOfLikes + 1 };
          }
        }
        return msg;
      });
    });
  }

  return (
    <div className="Main">
      <div className="heading">
        <div className="title-info">
          <h4>Delhi Office - Group</h4>
          <p>This group is for office chat only.</p>
        </div>
        <div className="active-members">
          {user_list.length} | {10}
          <span>
            <i className="fa-solid fa-user-group"></i>
          </span>
        </div>
      </div>

      <div className="conversation-window">
        <ul>
          {conversations.map((chat) => {
            return (
              <li key={chat.chatID}>
                <div className="msg-info">
                  <span
                    style={{
                      backgroundColor: chat.user.avatar_bg,
                    }}
                  >
                    {chat.user.name.charAt(0)}
                  </span>
                  <p>
                    {chat.user.name} <span>{chat.time}</span>
                  </p>
                </div>
                <div className="msg-content">
                  <p>{chat.content}</p>
                  <button
                    className={chat.liked ? "liked-msg" : "like-msg"}
                    onClick={() => handleLike(chat.chatID)}
                  >
                    <i className="fa-solid fa-thumbs-up"></i>
                    <span>{chat.noOfLikes}</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="msg-box">
        <button className="emoji emoji-selecter" onClick={toggleEmojiPicker}>
          🙂
        </button>
        <button className="users-list-toggler" onClick={toggleUsersList}>
          @
        </button>
        <ul
          className="users-list"
          style={showUsersList ? { display: "block" } : { display: "none" }}
        >
          {user_list.map((user) => {
            return (
              <li key={user.name}>
                <span
                  className="avatar-logo"
                  style={{ backgroundColor: user.avatar_bg }}
                >
                  {user.name.charAt(0)}
                </span>
                <p>{user.name}</p>
              </li>
            );
          })}
        </ul>
        <form method="POST" onSubmit={handleNewMessage}>
          <div
            className="emoji-picker"
            style={openEmojiPicker ? { display: "block" } : { display: "none" }}
          >
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
          <input
            type="text"
            name="text-msg"
            placeholder="Enter your message..."
            value={textMsg}
            onChange={(e) => setTextMsg(e.target.value)}
          />
          <button type="submit">
            <span>
              <i className="fa-solid fa-paper-plane"></i>
            </span>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Main;
