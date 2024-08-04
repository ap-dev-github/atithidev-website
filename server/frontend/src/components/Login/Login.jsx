import React, { useState } from 'react';

import "./Login.css";
import Header from '../Header/Header';

const Login = ({ onClose }) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open,setOpen] = useState(true)

  let login_url = window.location.origin+"/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password
        }),
    });
    
    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
        sessionStorage.setItem('username', json.userName);
        setOpen(false);        
    }
    else {
      alert("The user could not be authenticated.")
    }
};

  if (!open) {
    window.location.href = "/";
  };
  

  return (
    <div>
      <Header/>
    <div onClick={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
      
        <div class="main_banner" >
          <form style={{}} onSubmit={login}>
              <div class="input_section">
              <label for="username" class="input_label">Username </label>
              <input type="text"  name="username" placeholder="Username" class="input" onChange={(e) => setUserName(e.target.value)}/>
              </div>
              <div class="input_section">
              <label for="password" className="input_label"> Password </label>
              <input name="password" type="password"  placeholder="Password" class="input" onChange={(e) => setPassword(e.target.value)}/>            
              </div>

              <div className="button-section">
              <p>
              <button type="submit" class="btn" id="btn-login"  >Login</button>
              <button className="btn" id="btn-cancel" type="button"   onClick={()=>setOpen(false)}>Cancel</button>
              </p>
              <a className="btn" id="btn-register" href="/register">Register Now</a>
              </div>
          </form>
          </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
