import React from "react";
import { Link } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import "../css/Nav.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Nav({ name }) {
  return (
    <div className="navp sticky-top">
      <nav className="navbar navbar-light bg-dark">
        <Link to="/home" className="navbar-brand" style={{ color: "White" }}>
          Task-Reminder
        </Link>
        <Link
          to="/addtask"
          className="navbar-add"
          style={{ color: "White", textAlign: "center" }}
        >
          Add-Task
        </Link>
        <div className="usericon btn  my-2 my-sm-0">
          <Tippy content = {<span style = {{fontSize : "25px"}}>{name}</span>}>
            <Link
              to="/logout"
              style={{ textDecoration: "none" }}
            >
              <div className="btn welcome">
                <AccountCircleIcon />
                <h4>Log-Out</h4>
              </div>
            </Link>
          </Tippy>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
