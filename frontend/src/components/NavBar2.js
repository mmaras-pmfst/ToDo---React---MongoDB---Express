import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import LogOutSvg from '../iconComponents/LogOutSvg';
import UndoneSvg from '../iconComponents/UndoneSvg';

export default function NavBar2() {
  const logOut = () => {
    localStorage.clear();
    window.location = '/';
  };

  return (
    <div className="navigation">
      <Link to="#" onClick={logOut}>
        <button className="profile">
          <LogOutSvg />
        </button>
      </Link>
      <Link to="/tasks">
        <button className="todoList">
          <UndoneSvg />
        </button>
      </Link>
    </div>
  );
}
