import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function MainPage() {
  return (
    <>
      <div className="headerTitle">
        <div className="title">To-Do</div>
      </div>

      <div className="main">
        <div className="mainText">
          <p className="welcome">Welcome to our To-Do app!</p>
          <p>
            Let's get started! <Link to="/user/registration">Sign up</Link>
          </p>
          <p>
            Already have an account? <Link to="/user/login">Sign in</Link>
          </p>
          <p>
            Admin <Link to="/user/adminlogin">Sign in</Link>
          </p>
        </div>

        <div className="logo">
          <p>Donate, we are hungry</p>
          <button type="button" className="donateBtn">
            Donate
          </button>
        </div>

        <div className="footerTitle">
          <div className="text">© Copyright</div>
        </div>
      </div>
    </>
  );
}
