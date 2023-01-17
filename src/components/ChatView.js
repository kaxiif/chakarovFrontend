import React, { useState, useRef, useEffect, useContext } from 'react'
import ChatMessage from './ChatMessage';
import { ChatContext } from '../context/chatContext';
// import { auth } from '../firebase'
import Thinking from './Thinking';
import { MdComputer, MdPersonOutline } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SideBar from './SideBar';
import {
  MdClose,
  MdMenu,
  MdAdd,
  MdCheck,
  MdEdit,
  MdDelete,
  MdOutlineLogout,
  MdOutlineQuestionAnswer,
  MdSettings,
} from "react-icons/md";
import bot from "../assets/Logo.ico";
import DarkMode from "./DarkMode";
import copy from "../assets/copy-icon.svg";

localStorage.setItem('chatId', null);
/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = () => {

  useEffect(() => {
    let jwt = localStorage.getItem('jwt');

    // load API from .env file
    let api = process.env.API;

    if (jwt) {
      fetch(api+"verify", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "jwt": jwt
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
            localStorage.removeItem('jwt');
            window.location.href = "/login";

          } else {
            console.log(data);
          }
        });
    } else {
      window.location.href = "/login";
    }
  }, []);






  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [thinking, setThinking] = useState(false);
  const options = ['ChatGPT', 'DALL·E']
  const [selected, setSelected] = useState(options[0])
  let [messages, addMessage, , , setLimit] = useContext(ChatContext);
  const email = "test@mail.com";
  const picUrl = 'https://api.adorable.io/avatars/23/abott@adorable.png'

  /**
   * Scrolls the chat area to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const updateMessage = (newValue, ai = false, selected) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000)
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
      selected: `${selected}`
    }

    addMessage(newMsg);
  }
  

  /**
   * Sends our prompt to our API and get response to our request from openai.
   *
   * @param {Event} e - The submit event of the form.
   */
  const sendMessage = async (e) => {
    e.preventDefault();

   let jwt = localStorage.getItem('jwt');

    const newMsg = formValue
    const aiModel = selected

    const BASE_URL = 'https://chakarovbackend.up.railway.app/'
    const PATH = aiModel === options[0] ? 'davinci' : 'dalle'
    const POST_URL = BASE_URL + PATH;

    allChats.push({userMsg: newMsg})

    setThinking(true)
    setFormValue('')
    // updateMessage(newMsg, false, aiModel)
    
    let chatID = localStorage.getItem('chatId');
    
   

   

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwt: jwt,
      },
      body: JSON.stringify({
        prompt: newMsg,
        email: email,
        chatID: chatID ? chatID : null,
      }),
    });

    const data = await response.json();
    // setLimit(data.limit)

    if (response.ok) {
  

      if (data.chat) { chats.unshift(data.chat)
      //  allChats.push({userMsg: newMsg})
       }
      
      allChats.push({botMsg: data.bot})
      // data.bot && updateMessage(data.bot, true, aiModel);
   
      localStorage.setItem('chatId', data.chatId);
    
    } else if (response.status === 429) {
      setThinking(false)
    } else {
      // The request failed
      window.alert(`openAI is returning an error: ${response.status + response.statusText} 
      please try again later`);
      console.log(`Request failed with status code ${response.status}`);
      setThinking(false)
    }

    setThinking(false)
  }

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom()
  }, [messages, thinking]);

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //// sidebar code

  // const Modal = ({ open, children, onClose, chatId, title }) => {
  //   let [currentTitle, setCurrentTitle] = useState(title);
  //   if (!open) return null;
  //   return (
  //     <>
  //       <input
  //         style={{
  //           width: "100%",
  //           background: "transparent",
  //           border: "2px",
  //           borderColor: "white",
  //         }}
  //         type="text"
  //         value={currentTitle}
  //         onChange={(e) => setCurrentTitle(e.target.value)}
  //         // placeholder={title}
  //       />
  //       <span
  //         style={{ color: "white" }}
  //         onClick={() => editChat(chatId, currentTitle)}
  //       >
  //         <MdCheck />
  //       </span>
  //       <span style={{ color: "white" }} onClick={handleModalClose}>
  //         x
  //       </span>
  //     </>
  //   );
  // };

  function newChat() {
    localStorage.removeItem("chatId");
    setAllChats([]);
  }


  async function getChatWithId(id) {
    

    localStorage.setItem("chatId", id);
    let chat = await fetch(`https://chakarovbackend.up.railway.app/chat/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwt: jwt,
      },
    })
      .then((res) => res.json())
      .then((data) => {
      
        // empty messages array and add messages from chat
        setAllChats(data.chat)
        // messages = [];
        // addMessage(data.chat);
        return data;
      });
    return chat;
  }
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState("Copy to clipboard");
    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);

        // if copy is successful, show a message to the user for 1 second
        setCopied(true);
        setTimeout(() => { 
          setCopied(false)
        }, 1000);

        
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    

    let [currentTitle, setCurrentTitle] = useState('');

  // async function editChat(id) {
  //   console.log(id);
  //   console.log(currentTitle);
 
  //   let chat = await fetch(`https://chakarovbackend.up.railway.app/updateChat/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       jwt: jwt,
  //     },
  //     body: JSON.stringify({
  //       title: currentTitle,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       // empty messages array and add messages from chat
  //       // messages = [];
  //       // addMessage(data.chat);
  //       setAllChats(data.chat)
  //       return data;
  //     });
  //   return chat;
  // }

  function handleModalClose() {
    setIsOpen(false);
    setIsModelOpen(false);
  }
  let [id, setId] = useState("");
  function handleEditClick(id) {
    setIsOpen(true);
    setIsModelOpen(true);
    setId(id);
    // You'll also want to store the id of the chat being edited in a state variable
    // so that you can pass it as a prop to the modal component
  }

  let [isEdit, setIedit] = useState(true);
  let [isModelOpen, setIsModelOpen] = useState(false);

  let [chats, setChats] = useState([]);

  let jwt = localStorage.getItem("jwt");
  
  useEffect(() => {
    // fetch chats by allChats by passing jwt in header
    let chats = fetch("https://chakarovbackend.up.railway.app/allChats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        jwt: jwt,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        if(data.error === "Internal server error"){
          localStorage.removeItem("jwt");
          window.location.href = "/login";
        }
        
        setChats(data);
      });
      // if error, redirect to login page




  }, []);

  // create a editChat function that update chat by Id and pass jwt in header

  async function editChat(id) {
    console.log(id);
    console.log(currentTitle);

    let chat = await fetch(`https://chakarovbackend.up.railway.app/updateChat`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        jwt: jwt,
      },
      body: JSON.stringify({
        title: currentTitle,
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       
        // empty messages array and add messages from chat
        // messages = [];
        // addMessage(data.chat);

        setChats(data)
     
        // setAllChats(data)
        console.log(chats);
        setIsModelOpen(false);
        return data;
      });
    return chat;
  }
  const [isOpen, setIsOpen] = useState(false);

  let [allChats, setAllChats] = useState([]);

  async function deleteChat(id) {
    console.log(id);
    let chat = await fetch(`https://chakarovbackend.up.railway.app/deleteChat/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        jwt: jwt,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
      });
  }

  const [open, setOpen] = useState(true);
  const [, , clearMessages, limit, ] = useContext(ChatContext);
  /**
   * Toggles the dark mode.
   */
  const clearChat = () => clearMessages();
  const SignOut = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
    // if (auth.currentUser) {
    //   auth.signOut();
    //   clearChat();
    //   setLimit(-1);
    //   window.sessionStorage.clear();
    // }
  };

  return (
    <>
      <div className="bg-slate-200">
      
            <span className="w-8 h-8">
              <img style={{width : "80px", height : "80px", marginLeft : "30px"}} src={bot} alt="" />
            </span>

            <span onClick={ // redirect to course page
              () => {
                window.location.href = "https://nickchakarov.com/30-days-to-3k-course-module1";
              }

            }>
          <h1 style={{ margin: "30px" }}>Обратно към курса</h1>
            </span>
          
        <span onClick={SignOut}>
          <h1 style={{ margin: "30px" }}>Излез</h1>
            </span>
      
        
      </div>
      <div className="chatview">
        <main className="chatview__chatarea">
          {allChats
            ? allChats.map((message, index) => (
                <div
                  key={message.id}
                  className={`${message.ai && "flex-row-reverse"} message`}
                >
                  <div className="message__wrapper">
                    {message.userMsg ? (
                      <img
                        style={{
                          cursor: "pointer",
                          width: "20px",
                          height: "20px",
                          float: "right",
                          marginRight: "20px",
                          marginTop: "8px",
                        }}
                        src={copy}
                        onClick={() => copyToClipboard(message.userMsg)}
                        alt="copy icon"
                      />
                    ) : (
                      ""
                    )}

                    <ReactMarkdown
                      style={{ marginRight: "60px" }}
                      className={`message__markdown ${
                        message.userMsg ? "text-right" : "text-left"
                      }`}
                      children={message.userMsg ? message.userMsg : ""}
                      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                    />
                    <div>
                      {message.botMsg ? (
                        <img
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                            float: "right",
                            marginRight: "20px",
                            marginTop: "30px",
                          }}
                          src={copy}
                          onClick={() => copyToClipboard(message.botMsg)}
                          alt="copy icon"
                        />
                      ) : (
                        ""
                      )}
                      {
                        // check if message.botMsg is equal to copiedText
                        message.botMsg === copiedText ? (
                          copied ? (
                            <span
                              style={{
                                color: "black",
                                float: "right",
                                marginTop: "30px",
                              }}
                            >
                              Copied.
                            </span>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )
                      }
                    </div>

                    <ReactMarkdown
                      style={{ marginRight: "300px" }}
                      className={`message__markdown ${
                        message.botMsg ? "text-left" : "text-right"
                      }`}
                      children={message.botMsg ? message.botMsg : ""}
                      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                    />
                  </div>

                  {/* <div className="message__pic">
                    {message.ai ? (
                      <MdComputer />
                    ) : (
                      <img
                        className="cover w-10 h-10 rounded-full"
                        loading="lazy"
                        src={message.picUrl || picUrl}
                        alt="profile pic"
                      />
                    )}
                  </div> */}
                </div>
              ))
            : ""}

          {thinking && <Thinking />}

          <span ref={messagesEndRef}></span>
        </main>
        <form className="form">
          <textarea
            ref={inputRef}
            className="chatview__textarea-message"
            value={formValue}
            onChange={(e) => {
              setFormValue(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage(e);
              }
            }}
          />
          <button
            type="button"
            className="chatview__btn-send"
            onClick={sendMessage}
          >
            Генерирай
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatView