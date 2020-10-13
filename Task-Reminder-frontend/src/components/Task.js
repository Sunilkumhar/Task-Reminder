import React from "react";
import axios from "axios";
import { Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/Task.css";

toast.configure()
function Task({ _id, name, currDate, dueDate, about }) {
  const deletetopic = async() => {
    const user = {
      name,about
    }
    toast.success('Task Completed !!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition : Flip
      });
    await axios
        .post( `http://localhost:5000/home/${localStorage.getItem("id")}/${_id}`, user ,{headers: { "x-auth-token" :  localStorage.getItem("token") }})
        .then((res) => {
          // console.log(res);  
        })
        .catch((err) => {
          console.log(err.status);
        });

  };
  return (
    <div className="task1">
      <div className="heading">
        <h2 style={{ textDecoration: "underline", marginRight: "3px" }}>
          Task-Name
        </h2>
        <h2 style={{ marginRight: "3px" }}> : </h2>
        <h2>{name}</h2>
      </div>
      <div className="date row">
        <h4 className="col-6">Assign date : {currDate}</h4>
        <h4 className="col-6">Due date : {dueDate}</h4>
      </div>
      <div className="agenda">
        <div className="topic">
          <h4>Task : </h4>
          <p>{about}</p>
        </div>
        <input
          type="submit"
          value="Delete"
          id="delete"
          className="btn "
          onClick={deletetopic}
        />
      </div>
    </div>
  );
}

export default Task;
