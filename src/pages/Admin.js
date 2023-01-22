import React, { useEffect, useState } from "react";
import "./admin.css";
import copyicon from "../components/copy.svg"

const Admin = () => {

  // useEffect(() => {
  //   let jwt = localStorage.getItem("adminJWT");

  //   if(jwt){
  //     // verify jwt
  //     fetch("https://chakarov.letsbuildhere.com/verify", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         jwt: jwt,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if(data.error === "Internal server error") {
  //           localStorage.removeItem("adminJWT");
  //           window.location.href = "/adminlogin";
  //         }
  //       });
  //   }
  //   else {
  //     window.location.href = "/adminlogin";
  //   }
  // }, []);


  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");


  let [updateName, setUpdateName] = useState("");
  let [updateEmail, setUpdateEmail] = useState("");
  let [updatePassword, setUpdatePassword] = useState("");

  

  let [isUpdate, setIsUpdate] = useState(false);


  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    fetch("https://chakarov.letsbuildhere.com/users", {
      method: "GET",
      headers: {

        jwt: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.error === "jwt expired") {
          window.location.href = "/adminlogin";
        }
        console.log(data);
        setUsers(data);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);


  const addUser = () => {
   let jwt = localStorage.getItem("adminJWT");

    
    fetch("https://chakarov.letsbuildhere.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwt: localStorage.getItem("adminJWT"),
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })

      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("User is added");
          setEmail("");
          setName("");
          setPassword("");
          
          getAllUsers();
        }
      });
    
  };

    async function deleteUser (id) {
    let jwt = localStorage.getItem("adminJWT");
    let chat = await fetch(`https://chakarov.letsbuildhere.com/delete/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: jwt,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data) {
                alert('User is deleted');
                getAllUsers();
              }
      });
  };

  let [isEdit, setIsEdit] = useState(false);
  const updateUser = (id ) => {

   
   
   
   

    fetch("https://chakarov.letsbuildhere.com/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        jwt: localStorage.getItem("adminJWT"),
      },
      body: JSON.stringify({
        id: id,
        name: updateName,
        email: updateEmail,
        password: updatePassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("User is updated");
          getAllUsers();
          setIsUpdate(false);
        }
      });




    
    
  };

   const approveUser = (id) => {
     fetch("https://chakarov.letsbuildhere.com/approveUser", {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
         jwt: localStorage.getItem("adminJWT"),
       },
       body: JSON.stringify({
         id: id,
       }),
     })
       .then((res) => res.json())
       .then((data) => {
         if (data) {
           alert("User is updated");
           getAllUsers();
           setIsUpdate(false);
         }
       });
   };

  async function sendEmail(id) {
    console.log(id);
    let jwt = localStorage.getItem("adminJWT");
    let chat = await fetch(`https://chakarov.letsbuildhere.com/sendmail/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        jwt: jwt,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.error === "Error sending email"){
          alert('Error sending email');
        }

        else {
                alert('Email is sent');
              }
      });
  }

  // const sendEmail = (id) => {
  //   let jwt = localStorage.getItem("adminJWT");

  //   console.log(jwt);
  //   console.log(id);
    
  //   // fetch("https://chakarov.letsbuildhere.com/sendmail", {
  //   //   method: "get",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     jwt: jwt,
  //   //   },
  //   //   body: JSON.stringify({
  //   //     id: id,
  //   //   }),
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     if(data) {
  //   //       alert('Email is sent');
  //   //     }
  //   //   });
  // }

  let [passwordType, setPasswordType] = useState(true);
 

  const editUser = (id, user) => {


    setUpdateName(user.name);
   setUpdateEmail(user.email);
   setUpdatePassword(user.password);

    setUpdatingUserId(id);
    isUpdate = true;
    setIsUpdate(true);
    console.log(id);
  }

  let [updatingUserId, setUpdatingUserId] = useState("");



  const logOut = () => {
    localStorage.removeItem("adminJWT");
    window.location.href = "/adminlogin";
  };

  return (
    <div>
      <div className="header">
        <div className="logo">
          <h1>Admin page</h1>
        </div>
      </div>
      <div className="menu bg-dark-grey">
        <ul style={{ paddingTop: "20px", paddingLeft: "10px" }}>
          <li>Users</li>
        </ul>
        <a
          onClick={() => logOut()}
          style={{ paddingLeft: "10px", valign: "bottom" }}
        >
          log Out
        </a>
      </div>

      <body style={{ marginLeft: "150px" }}>
        {/* <h1>User Table</h1> */}
        <table>
          <thead>
            <tr>
              {isUpdate ? (
                <>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Actions</th>
                </>
              ) : (
                <>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => (
                <tr key={user._id}>
                  {isUpdate ? (
                    updatingUserId === user._id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            placeholder={user.name}
                            onChange={(e) => setUpdateName(e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="email"
                            placeholder={user.email}
                            onChange={(e) => setUpdateEmail(e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type={passwordType ? "password" : "text"}
                            placeholder={user.password}
                            onChange={(e) => setUpdatePassword(e.target.value)}
                          />
                        </td>

                        <td>
                          <button onClick={() => updateUser(user._id, user)}>
                            Update
                          </button>
                        </td>
                      </>
                    ) : (
                      <></>
                    )
                  ) : (
                    <>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button onClick={() => deleteUser(user._id)}>
                          Delete
                        </button>
                        {/* <button
                      onClick={() =>
                        updateUser(user.id, { ...user, name: "updatedName" })
                      }
                    >
                      Update
                    </button> */}
                        <button onClick={() => editUser(user._id, user)}>
                          Edit
                        </button>
                        <button onClick={() => approveUser(user._id, user)}>
                          Approve
                        </button>
                        <button onClick={() => sendEmail(user._id)}>
                          Send Email
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
              // create a row with input fields for each user
              // create a button to add a new user
            }
          </tbody>
        </table>
        <br />
        <br />
        <div className="addNewUser">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => addUser()}>Add User</button>
          {/* <button onClick={addUser}>Add User</button> */}
        </div>
      </body>
    </div>
  );
};

export default Admin;
