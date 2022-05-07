import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import RemoveSvg from '../iconComponents/RemoveSvg';
import UncompleteSvg from '../iconComponents/UncompleteSvg';

export default function DoneTask({
  task,
  uncompleteTaks,
  deleteTask,
  getOneTask,
}) {
  return (
    <li>
      <Link to="#" onClick={getOneTask}>
        {task.title}
      </Link>

      <div className="completedTask">
        <div className="buttonsCompleted">
          <button className="complete" onClick={uncompleteTaks}>
            <UncompleteSvg />
          </button>

          <Link to="#">
            <button className="removeCompleted" onClick={deleteTask}>
              <RemoveSvg />
            </button>
          </Link>
        </div>
      </div>
    </li>
  );
}
