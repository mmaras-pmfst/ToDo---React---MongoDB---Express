import React from 'react';
import LogOutSvg from '../iconComponents/LogOutSvg';
import { Link } from 'react-router-dom';

import '../App.css';

export default function AdminNavBar() {
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
      </div>
    </>
  );
}
