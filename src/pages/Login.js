import { data } from "autoprefixer";
import React, { useState } from "react";
// import dotenv from "dotenv";
// import env from "react-dotenv";


const Login = () => {
 
  let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    
    let API = "https://chakarovbackend.up.railway.app";

    
    
    const login = () => {
    
        fetch(`${API}/login`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((res) => res.json())

          .then((data) => {
            console.log(data);
            localStorage.setItem("jwt", data.token);
            if (data.token) {
              window.location.href = "/";
            } else {
              alert(data.error);
            }
          });
        
        
    };



 

 

  return (
    <div>
      <div
        style={{
          alignItems: "center",
          fontSize: "30px",
          fontFamily: "sans-serif",
          fontWeight: "bold",
        }}
        className="header"
      >
        <div style={{ alignItems: "center" }} className="logo">
          <h1>Login page</h1>
        </div>
      </div>
      {
        // create a login form on the center of page
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              width: "300px",
            }}
          >
            <input
              style={{
                padding: "10px",
                margin: "10px",
                border: "2px solid",
                borderRadius: "10px",
              }}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              style={{
                padding: "10px",
                margin: "10px",
                border: "2px solid",
                borderRadius: "10px",
              }}
              type="password"
              placeholder="Passwprd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              style={{
                padding: "10px",
                margin: "10px",
                backgroundColor: "black",
                width: "fit-content",
                borderRadius: "10px",
              }}
              type="submit"
              onClick={() => login()}
            >
              Login
            </button>
            <button
              style={{
                padding: "10px",
                margin: "10px",
                backgroundColor: "black",
                width: "fit-content",
                borderRadius: "10px",
              }}
              type="submit"
              onClick={() => window.location.href = "/register"}
            >
              Register
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default Login;
