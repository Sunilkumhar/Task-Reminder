import React, {  useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Addtask.css";

//Use Context-api or localStorage

function Addtask() {
  const [name, setname] = useState("");
  const [about, setabout] = useState("");
  const [dueDate, setdueDate] = useState(new Date());

  const handleChangename = (e) => {
    const val = e.target.value;
    setname(val);
  };
  const handleChangeabout = (e) => {
    const val = e.target.value;
    setabout(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      dueDate,
      about,
    };

    axios
        .post(`http://localhost:5000/home/${localStorage.getItem("id")}/addtask`, user, {headers: { "x-auth-token" :  localStorage.getItem("token") }})
        .then((res) => {
          console.log(res);
          console.log(123);
          window.location.href = "http://localhost:3000/home";
        })
        .catch((err) => {
          console.log(err.status);
        });
  };

  return (
    <div>
      {localStorage.getItem("username") !== null ? (
        <React.Fragment>
          <div
            className="register"
            style={{ marginTop: "8%", width: "70%", marginLeft: "15%" }}
          >
            <div className="container1">
              <h1
                style={{
                  textDecoration: "underline",
                }}
              >
                ADD TASK :
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="form-group head">
                  <label>Task Name </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    required
                    onChange={handleChangename}
                  />
                </div>
                <div className="form-group  ">
                  <label style={{ marginRight: "10px" }}>Due Date : </label>

                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => setdueDate(date)}
                    dateFormat = 'dd/MM/yyyy'
                    minDate = {new Date()}
                  />
                </div>
                <div className="row1">
                  <div className="form-group bio">
                    <label htmlFor="comment">About</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      cols="1000"
                      id="Bio"
                      required
                      placeholder="Enter Your Message"
                      style={{ width: "300px" }}
                      onChange={handleChangeabout}
                    ></textarea>
                  </div>{" "}
                </div>
                <input
                  type="submit"
                  value="Add Task"
                  id="add"
                  className="btn"
                />
              </form>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <h1>Please Login to add task....</h1>
      )}
    </div>
  );
}

export default Addtask;
