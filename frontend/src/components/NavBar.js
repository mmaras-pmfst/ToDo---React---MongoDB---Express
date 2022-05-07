import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import AddSvg from '../iconComponents/AddSvg';
import CompleteTasksSvg from '../iconComponents/CompleteTasksSvg';
import LogOutSvg from '../iconComponents/LogOutSvg';

export default function NavBar() {
  const logOut = () => {
    localStorage.clear();
    window.location = '/';
  };

  return (
    <>
      <div className="navigation">
        <Link to="#" onClick={logOut}>
          <button className="profile">
            <LogOutSvg />
          </button>
        </Link>

        <Link to="/tasks/new">
          <button className="addBtn">
            <AddSvg />
          </button>
        </Link>

        <Link to="/tasks/done">
          <button className="complete">
            <CompleteTasksSvg />
          </button>
        </Link>
      </div>
    </>
  );
}
