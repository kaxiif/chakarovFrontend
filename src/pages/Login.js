import { data } from "autoprefixer";
import React, { useState } from "react";
// import dotenv from "dotenv";
// import env from "react-dotenv";


const Login = () => {
 
  let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    
    let API = "https://chakarov.letsbuildhere.com";

    
    
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
    <div style={{background : "#535557" , height : "100vh"}} >
      <div
        style={{
          alignItems: "center",
          fontSize: "30px",
        
          fontWeight: "bold",
        }}
        className="header"
      >
        <div style={{ alignItems: "center", textAlign : "center" }} className="logo">
          <h2 style={{fontFamily: "cursive"}}>Kolyo - The Copywriter - </h2>
          <p style={{fontFamily: "cursive" , lineHeight : "1"}}>чат-ботът, който ти помага да си правиш продажбените текстове за сайта, рекламата, блога и мейлите си.</p>
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
              Вход
            </button>
            <p style={{fontSize : "12px", color : "white", }}>Нямаш акаунт?</p>
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
               Регистрирай се!
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default Login;
