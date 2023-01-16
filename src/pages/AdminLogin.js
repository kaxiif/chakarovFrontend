import React, { useState } from "react";

const AdminLogin = () => {
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
        AdminLogin: true,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        

        
        if (data.role === "admin") {
          localStorage.setItem("adminJWT", data.token);
          window.location.href = "/admin";
        } else {
          alert("Invalid credentials");
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
          </div>
        </div>
      }
    </div>
  );
};

export default AdminLogin;
