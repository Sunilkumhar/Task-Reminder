import React, { useState } from "react";
import axios from "axios";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "../css/Register.css";

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
  const [phone, setphone] = useState("");
  const [agree, setagree] = useState(0);
  const [errmsg, seterrmsg] = useState("");
  const [showP, setshowP] = useState("password");
  const [showCp, setshowCp] = useState("password");
  const [eyeiconP, seteyeiconP] = useState("VisibilityOffIcon");
  const [eyeiconCp, seteyeiconCp] = useState("VisibilityOffIcon");

  const handleChangeemail = (e) => {
    const val = e.target.value;
    setemail(val);
  };
  const handleChangepass = (e) => {
    const val = e.target.value;
    setpass(val);
  };
  const handleChangename = (e) => {
    const val = e.target.value;
    setname(val);
  };
  const handleChangecpass = (e) => {
    const val = e.target.value;
    setcpass(val);
  };
  const handleChangephone = (e) => {
    const val = e.target.value;
    setphone(val);
  };
  const handleAgree = (e) => {
    setagree(1);
  };
  const changeVisibilityP = () => {
    setshowP("password");
    seteyeiconP("VisibilityOffIcon");
  };
  const changeVisibilityOffP = () => {
    setshowP("text");
    seteyeiconP("VisibilityIcon");
  };
  const changeVisibilityCp = () => {
    setshowCp("password");
    seteyeiconCp("VisibilityOffIcon");
  };
  const changeVisibilityOffCp = () => {
    setshowCp("text");
    seteyeiconCp("VisibilityIcon");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      pass,
      phone,
    };

    const regex = new RegExp(
      "^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*[@$!%*?&]).{12,20}$"
    );

    if (!regex.test(pass)) {
      seterrmsg("Please enter strong pass");
      console.log(regex.test(pass));
    } else if (pass !== cpass) {
      seterrmsg("Password and confirm password didn't match");
    } else if (phone.length !== 10) {
      seterrmsg("Please enter a valid phone number");
    } else if (agree === 0) {
      seterrmsg("Please Agree terms & conditons");
    } else {
      await axios
        .post("http://localhost:5000/register", user)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.headers["x-auth-token"]);
          window.location.href = "http://localhost:3000/home";
          seterrmsg("");
        })
        .catch((err) => {
          seterrmsg("Email already registered");
          console.log(err.status);
        });
    }
    setTimeout(() => {
      seterrmsg("");
    }, 2000);
    console.log(errmsg);
  };
  const removeErr = () => {
    console.log(123);

    seterrmsg("");
  };

  return (
    <div className="registerpage">
      {errmsg !== "" ? (
        <div className=" row errormsg">
          <p className="col-11">{errmsg}</p>
          <p className="col-1 remove" onClick={removeErr}>
            X
          </p>
        </div>
      ) : null}
      <div className="register">
        <div className="container1">
          <h1
            style={{
              textDecoration: "underline",
            }}
          >
            Please Enter All the Details :{" "}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="row1">
              <div className="form-group name">
                <label>Name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  required
                  onChange={handleChangename}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group email col-5">
                <label>Email*</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required
                  onChange={handleChangeemail}
                />
              </div>
              <div className="col-2"></div>
              <div className="form-group phone col-4">
                <label>Phone Number*</label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  placeholder="Phone Number"
                  required
                  onChange={handleChangephone}
                />
              </div>
            </div>
            <div className="row1">
              <div className="form-group pass">
                <label>Password*</label>
                <div className="passwordregister">
                  <input
                    type={showP}
                    className="form-control"
                    id="pass"
                    placeholder="Password"
                    required
                    onChange={handleChangepass}
                  />
                  <div className="eyeR">
                    {eyeiconP === "VisibilityOffIcon" ? (
                      <VisibilityOffIcon onClick={changeVisibilityOffP} />
                    ) : (
                      <VisibilityIcon onClick={changeVisibilityP} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row1">
              <div className="form-group cpass">
                <label>Confirm Password*</label>
                <div className="passwordregister">
                  <input
                    type={showCp}
                    className="form-control"
                    id="pass1"
                    placeholder="Confirm Password"
                    required
                    onChange={handleChangecpass}
                  />
                  <div className="eyeR">
                    {eyeiconCp === "VisibilityOffIcon" ? (
                      <VisibilityOffIcon onClick={changeVisibilityOffCp} />
                    ) : (
                      <VisibilityIcon onClick={changeVisibilityCp} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                style={{ marginTop: "7px" }}
                onChange={handleAgree}
              />
              <label
                className="form-check-label"
                htmlFor="exampleCheck1"
                onChange={handleAgree}
              >
                By clicking you agree T&C of Task-Reminder
              </label>
            </div>
            <input
              type="submit"
              value="Register For Task-Reminder"
              id="register1"
              className="btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
