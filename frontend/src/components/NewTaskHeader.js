import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import BackSvg from '../iconComponents/BackSvg';

export default function NewTaskHeader() {
  return (
    <>
      <div className="headerTask">
        <Link to="/tasks">
          <button className="back">
            <BackSvg />
          </button>
        </Link>
      </div>
    </>
  );
}
