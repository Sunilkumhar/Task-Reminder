import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Nav from "./Nav";
import Task from "./Task";
import "../css/Home.css";

function Home() {
  const [name, setname] = useState("");
  const [task, settask] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/register/${localStorage.getItem("id")}`)
      .then((res) => {
        settask(res.data.tasks);
      })
      .catch((err) => {
        console.log(err.status);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/register/${localStorage.getItem("id")}`)
      .then((res) => {
        settask(res.data.tasks);
      })
      .catch((err) => {
        console.log(err.status);
      });
  }, [task]);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      localStorage.setItem("username", user.name);
      localStorage.setItem("id", user._id);
      setname(user.name);
    } catch {}
  }, []);

  return (
    <div>
      {name !== "" ? (
        <React.Fragment>
          <Nav name={name} />
          <div className="task taskcontainer">
            <div className="row">
              {task.length !== undefined || task.length !== 0 ? (
                task.map((x) => (
                  <div className="col-6" key={x._id}>
                    <Task
                      name={x.name}
                      currDate={x.currDate.substring(0, 10)}
                      dueDate={x.dueDate.substring(0, 10)}
                      about={x.about}
                      _id={x._id}
                    />
                  </div>
                ))
              ) : (
                <h1>You Have No Pending Tasks...</h1>
              )}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <h1>Please Login to view your remaining task....</h1>
      )}
    </div>
  );
}

export default Home;
