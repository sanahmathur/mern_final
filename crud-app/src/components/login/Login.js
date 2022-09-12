import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handle = (e) => {
    e.preventDefault();
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const login = (e) => {
    e.preventDefault();
    const { email, password } = user
    console.log(user);
    localStorage.setItem("email2", JSON.stringify(user.email));

    if (email && password) {
      axios.post("http://localhost:8000/login", user).then((res) => {
        alert(res.data.message);
        setLoginUser(res.data.user);
        if (res.data.user === undefined) {
          navigate("/register");
        } else {
          navigate("/Crud");
        }
      }
    )} else {
      alert("Invalid Entries");
    }
    setUser({
      email: "",
      password: "",
    });

    
  };
  const route1 = () => {
    navigate("/register");
  };

  return (
    <>
      <div class="mb-md-5 mt-md-4 pb-5">
        <form className="form-login">
          <img
            src="https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_58746987freejpg850.jpg"
            class="img-fluid"
            alt="Sample image"
          />

          <h1 class="fw-bold mb-2 text-uppercase">Login</h1>
          <p class="text-white-50 mb-5">
            Please enter your login and password!
          </p>
          <div class="form-outline form-white mb-4">
            <input
              type="email"
              id="typeEmailX"
              class="form-control form-control-lg"
              name="email"
              value={user.email}
              onChange={handle}
            />
            <label class="form-label" for="typeEmailX">
              Email
            </label>
          </div>

          <div class="form-outline form-white mb-4">
            <input
              type="password"
              id="typePasswordX"
              class="form-control form-control-lg"
              required=""
              name="password"
              value={user.password}
              onChange={handle}
            />
            <label class="form-label" for="typePasswordX">
              Password
            </label>
          </div>

          

          <button
            class="btn btn-outline-light btn-lg px-5"
            type="submit"
            onClick={login}
          >
            Login
          </button>
          <p class="mb-0">
            Don't have an account?{" "}
            <a href="#!" className="text-black fw-bold" onClick={route1}>
              Sign Up
            </a>
          </p>
        </form>
      </div>
      
    </>
  );
};

export default Login;
