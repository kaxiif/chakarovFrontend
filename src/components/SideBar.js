// import React, { useState, useContext, useEffect } from 'react';
// import {
//   MdClose,
//   MdMenu,
//   MdAdd,
//   MdCheck,
//   MdEdit,
//   MdDelete,
//   MdOutlineLogout,
//   MdOutlineQuestionAnswer,
// } from "react-icons/md";
// import { ChatContext } from '../context/chatContext';
// import bot from '../assets/bot.ico'
// import DarkMode from './DarkMode';
// import { auth } from '../firebase'

// /**
//  * A sidebar component that displays a list of nav items and a toggle 
//  * for switching between light and dark modes.
//  * 
//  * @param {Object} props - The properties for the component.
//  */




// // const Modal = ({ open, children, onClose }) => {

// //   if (!open) return null
// //   return (
// //     <div className="modal">
// //       <div className="modal__content">
// //         <div className="modal__header">
// //           <input type="text" placeholder="Enter title" />
// //           <button onClick={onClose}>X</button>
// //         </div>
// //         <div className="modal__body">
// //           {children}
// //         </div>
// //         <div className="modal__footer">
// //           <button>Save</button>
// //         </div>
// //       </div>
// //     </div>
// //   )

// // }


// const SideBar = () => {


// const Modal = ({ open, children, onClose, chatId, title }) => {
//   let [currentTitle, setCurrentTitle] = useState(title);
//   if (!open) return null;
//   return (
//     <>
//       <input
//         style={{ width: "100%", background: "transparent", border: "2px", borderColor: "white"  }}
//         type="text"
//         value={currentTitle}
//         onChange={(e) => setCurrentTitle(e.target.value)}
//         placeholder={title}
//       />
//       <button
//         style={{ color: "white" }}
//         onClick={() => editChat(chatId, currentTitle)}
//       >
//         <MdCheck />
//       </button>
//       <button style={{ color: "white" }} onClick={onClose}>
//         x
//       </button>
//     </>
//   );
// };


//   async function editChat(id, title) {
//     console.log(id);
//     console.log(title);
//     let chat = await fetch(`https://chakarov.letsbuildhere.com/chat/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         jwt: jwt,
//       },
//       body: JSON.stringify({
//         prompt: title,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         let updatedChats = chats.map((chat) => {
//           if (chat._id === id) {
//             return data;
//           }
//           return chat;
//         });
//         setChats(updatedChats);
//         setIsOpen(false); //to close the modal after update
//       });
//   }

//   function handleModalClose() {
//     setIsOpen(false);
//     setIsModelOpen(false);
//   }
//   let [id, setId] = useState("");
//   function handleEditClick(id) {
//     setIsOpen(true);
//     setIsModelOpen(true);
//     setId(id);
//     // You'll also want to store the id of the chat being edited in a state variable
//     // so that you can pass it as a prop to the modal component
//   }

//   let [isEdit, setIedit] = useState(true);
//   let [isModelOpen, setIsModelOpen] = useState(false);

//   let [chats, setChats] = useState([]);

//   let jwt = localStorage.getItem("jwt");
//   jwt =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0B5b3BtYWlsLmNvbSIsIl9pZCI6IjYzYmJlZDIxZjI5YjYzMDcyNWJiZDk3OSIsImlhdCI6MTY3MzM0NzExNSwiZXhwIjoxNjczNDMzNTE1fQ.zBpBskkI8bGwmqsynQ6zhc4-R24aY-rznsppY8KbSa8";

//   useEffect(() => {
//     // fetch chats by allChats by passing jwt in header
//     let chats = fetch("https://chakarov.letsbuildhere.com/allChats", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         jwt: jwt,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setChats(data);
//       });
//   }, []);

//   // create a editChat function that update chat by Id and pass jwt in header

//   async function editChat(id , title) {
//     console.log(id);
//     console.log(title);

//     // open a modal and pass the title as a value in the input field and on submit update the chat by id and pass jwt in header and update the chats array in the state and close the modal




//     // let chat = await fetch(`https://chakarov.letsbuildhere.com/chat/${id}`, {
//     //   method: "PUT",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //     jwt: jwt,
//     //   },
//     //   body: JSON.stringify({
//     //     prompt: "hello",
//     //   }),
//     // })
//     //   .then((res) => res.json())

//     //   .then((data) => {

//     //     console.log(data);
//     //   });
//   }
//   const [isOpen, setIsOpen] = useState(false);

//   async function deleteChat(id) {
//     console.log(id);
//     let chat = await fetch(`https://chakarov.letsbuildhere.com/deleteChat/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         jwt: jwt,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setChats(data);
//       });
   
//   }

//   const [open, setOpen] = useState(true);
//   const [, , clearMessages, limit, setLimit] = useContext(ChatContext);
//   /**
//    * Toggles the dark mode.
//    */
//   const clearChat = () => clearMessages();
//   const SignOut = () => {
//     if (auth.currentUser) {
//       auth.signOut();
//       clearChat();
//       setLimit(-1);
//       window.sessionStorage.clear();
//     }
//   };

//   return (
//     <section className={` ${open ? "w-72" : "w-20 "} sidebar`}>
//       <div className="sidebar__app-bar">
//         <div className={`sidebar__app-logo ${!open && "scale-0 hidden"}`}>
//           <span className="w-8 h-8">
//             <img src={bot} alt="" />
//           </span>
//         </div>
//         <h1 className={`sidebar__app-title ${!open && "scale-0 hidden"}`}>
//           GPT3-Chatbot
//         </h1>
//         <div className="sidebar__btn-close" onClick={() => setOpen(!open)}>
//           {open ? (
//             <MdClose className="sidebar__btn-icon" />
//           ) : (
//             <MdMenu className="sidebar__btn-icon" />
//           )}
//         </div>
//       </div>
//       <div className="nav">
//         <span className="nav__item  bg-light-white" onClick={clearChat}>
//           <div className="nav__icons">
//             <MdAdd />
//           </div>
//           <h1 className={`${!open && "hidden"}`}>New chat</h1>
//         </span>
//       </div>
//       {chats ? chats.map((chat, index) => {
//             return (
//               <div className="nav">
//                 <span className="nav__item  bg-light-white" onClick={clearChat}>
//                   <div className="nav__icons">
//                     <MdOutlineQuestionAnswer />
//                   </div>
//                   {setIsModelOpen ? (
//                     <>
//                       {chat._id === id ? (
//                         <Modal
//                           open={isOpen}
//                           onClose={handleModalClose}
//                           chatId={chat._id}
//                           title={chat.title}
//                         />
//                       ) : (
//                         <>
//                           <h1 className={`${!open && "hidden"}`}>
//                             {
//                               // chat.title with max 10 characters
//                               chat.title.length > 10
//                                 ? chat.title.slice(0, 12) + "..."
//                                 : chat.title
//                             }
//                           </h1>

//                           <>
//                             <span className=" chatIcon">
//                               {/* <MdEdit onClick={() => setIsOpen(true)} />
//                                */}
//                               <MdEdit
//                                 onClick={() => handleEditClick(chat._id)}
//                               />
//                             </span>
//                             <span className=" chatIcon">
//                               <MdDelete onClick={() => deleteChat(chat._id)} />
//                             </span>
//                             {(isEdit = false)}
//                           </>
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <>
//                       <h1 className={`${!open && "hidden"}`}>
//                         {
//                           // chat.title with max 10 characters
//                           chat.title.length > 10
//                             ? chat.title.slice(0, 12) + "..."
//                             : chat.title
//                         }
//                       </h1>

//                       <>
//                         <span className=" chatIcon">
//                           {/* <MdEdit onClick={() => setIsOpen(true)} />
//                            */}
//                           <MdEdit onClick={() => handleEditClick(chat._id)} />
//                         </span>
//                         <span className=" chatIcon">
//                           <MdDelete onClick={() => deleteChat(chat._id)} />
//                         </span>
//                         {(isEdit = false)}
//                       </>
//                     </>
//                   )}
//                 </span>
//               </div>
//             );
//           })
//         : ""
//       }

//       <div className="nav__bottom">
//         <DarkMode open={open} />

//         <div className="nav">
//           <span className="nav__item" onClick={SignOut}>
//             <div className="nav__icons">
//               <MdOutlineLogout />
//             </div>
//             <h1 className={`${!open && "hidden"}`}>Log out</h1>
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default SideBar;