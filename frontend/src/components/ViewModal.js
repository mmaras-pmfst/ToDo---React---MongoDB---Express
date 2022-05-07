import React from 'react';
import Modal from 'react-modal';
import '../App.css';

export default function ViewModal({ setmodalIsOpen2, modalIsOpen2, oneTask }) {
  return (
    <Modal className="bg-modal" isOpen={modalIsOpen2} ariaHideApp={false}>
      <div className="modal-content">
        <div className="close" onClick={() => setmodalIsOpen2(false)}>
          +
        </div>
        <h3
          className="adminForm-input2"
          type="text"
          name="task"
          id="taskNewTitle2"
        >
          {oneTask.title}
        </h3>
        <p name="desc" className="adminForm-input" id="taskNewDesc2">
          {oneTask.description}
        </p>
        <hr />
        <p>DeadLine:</p>
        <p className="adminForm-input" name="timetable" id="taskNewTimetable2">
          {oneTask.timetable}
        </p>
        <hr />
        <p>Created:</p>
        <p className="adminForm-input" name="timetable" id="taskCreated">
          {oneTask.datetime}
        </p>
      </div>
    </Modal>
  );
}
