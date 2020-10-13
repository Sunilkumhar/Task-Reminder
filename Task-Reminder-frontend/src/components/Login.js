import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TextField } from "@material-ui/core";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import "../css/Login.css";

function Login() {
  const [err , seterr] = useState("");
  const [pass, setpass] = useState("");
  const [email, setemail] = useState("");
  const [show, setshow] = useState("password");
  const [eyeicon, seteyeicon] = useState("VisibilityOffIcon");

  const handleChangeemail = (e) => {
    const email = e.target.value;
    setemail(email);
  };
  const handleChangepass = (e) => {
    const pass = e.target.value;
    setpass(pass);
  };
  const changeVisibility = () => {
    setshow("password");
    seteyeicon("VisibilityOffIcon");
    
  }
  const changeVisibilityOff = () => {
    setshow("text");
    seteyeicon("VisibilityIcon");

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      pass,
    };
    await axios
      .post("http://localhost:5000/auth", user)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data);
        seterr("");
        console.log(err);
        window.location.href = "http://localhost:3000/home";
      })
      .catch((err) => {
        seterr("Invalid Email-Id or Password")
        setTimeout(() => {
          seterr("")
        }, 2000)
        console.log(err.status);
        console.log(err);

      });
  };
  const removeErr = () => {
    console.log(123)

    seterr("");
  }


  return (
    <div className="loginpage">
    {err !== ""?(
      <div className=" row error">
        <p className = "col-10">{err}</p>
        <p className = "remove col-2" onClick = {removeErr}>X</p>
      </div>
    ):null}
    <div className="row login">
      <div className="container1">
        <div className="row">
          <div className=" mx-auto">
            <h1
              className="display-4 text"
              style={{ textDecoration: "underline", textAlign: "center" }}
            >
              Log In
            </h1>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="email"
                label="Email Id"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChangeemail}
              />
              <div className="passwordfield">
                <TextField
                  type = {show}
                  variant="outlined"
                  margin="normal"
                  required
                  id="password"
                  label="Password"
                  name="Password"
                  autoComplete="Password"
                  onChange={handleChangepass}
                />
                <div className="eye">
                  {
                    eyeicon === "VisibilityOffIcon"?<VisibilityOffIcon onClick = {changeVisibilityOff}/>:<VisibilityIcon onClick = {changeVisibility}/>
                  }
                </div>
              </div>
              <div className="signup">
                <p>Don't have a account</p>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <button type="button" className="btn btn-primary">
                    Sign-Up
                  </button>
                </Link>
              </div>
              <input
                type="submit"
                value="Log In"
                id="proceed"
                className="btn"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
         
    </div>
  );
}

export default Login;
