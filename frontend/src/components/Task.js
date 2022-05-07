import React from 'react';
import '../App.css';
import DoneSvg from '../iconComponents/DoneSvg';
import EditSvg from '../iconComponents/EditSvg';
import RemoveSvg from '../iconComponents/RemoveSvg';

export default function Task({
  task,
  completeTaks,
  deleteTask,
  getOneTask,
  getOneTaskForEdit,
}) {
  return (
    <>
      <li>
        <a href="#" onClick={getOneTask}>
          {task.title}
        </a>
        <div className="buttons">
          <button className="complete" onClick={completeTaks}>
            <DoneSvg />
          </button>

          <a href="#" onClick={getOneTaskForEdit}>
            <button className="edit">
              <EditSvg />
            </button>
          </a>
          <a href="#">
            <button className="remove" onClick={deleteTask}>
              <RemoveSvg />
            </button>
          </a>
        </div>
      </li>
    </>
  );
}
