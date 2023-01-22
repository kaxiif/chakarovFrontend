import { data } from "autoprefixer";
import React, { useState } from "react";
// import dotenv from "dotenv";
// import env from "react-dotenv";

const Register = () => {
    let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let API = "https://chakarov.letsbuildhere.com";

  const login = () => {
    fetch(`${API}/signup`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
      
      
          if (data.token) {
              localStorage.setItem("jwt", data.token);
          window.location.href = "/";
          }
          else if (data.messag) {
          alert(data.message);
        }
          else {
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
          <h1>Register page</h1>
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
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Register
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
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default Register;
