import React from 'react';
import '../App.css';
import EditSvg from '../iconComponents/EditSvg';
import RemoveSvg from '../iconComponents/RemoveSvg';
import { Link } from 'react-router-dom';

export default function User({
  user,
  deleteUser,
  getOneUser,
  getOneUserForEdit,
}) {
  return (
    <li>
      <Link to="#" onClick={getOneUser}>
        {user.username}
      </Link>

      <div className="completedTask">
        <div className="buttonsCompleted">
          <button className="complete" onClick={getOneUserForEdit}>
            <EditSvg />
          </button>

          <Link to="#" onClick={deleteUser}>
            <button className="removeCompleted">
              <RemoveSvg />
            </button>
          </Link>
        </div>
      </div>
    </li>
  );
}
