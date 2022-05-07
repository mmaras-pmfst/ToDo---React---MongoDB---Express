import React from 'react';
import Modal from 'react-modal';
import '../App.css';

export default function ViewModal({
  setModalIsOpen,
  modalIsOpen,
  userInfo,
  uncompleted,
  completed,
  sum,
}) {
  return (
    <Modal className="bg-modal" isOpen={modalIsOpen} ariaHideApp={false}>
      <div className="modal-content">
        <div className="close" onClick={() => setModalIsOpen(false)}>
          +
        </div>
        <h3
          className="adminForm-input2"
          type="text"
          name="task"
          id="taskNewTitle2"
        >
          User: {userInfo.username}
        </h3>
        <p name="desc" className="adminForm-input" id="taskNewDesc2"></p>
        <hr />
        <p>Tasks created:</p>
        <p className="adminForm-input" name="timetable" id="taskNewTimetable2">
          {sum}
        </p>
        <hr />
        <p>Completed tasks:</p>
        <p className="adminForm-input" name="timetable" id="taskCreated">
          {completed}
        </p>
        <hr />
        <p>Tasks waiting to be finished:</p>
        <p className="adminForm-input" name="timetable" id="taskCreated">
          {uncompleted}
        </p>
      </div>
    </Modal>
  );
}
