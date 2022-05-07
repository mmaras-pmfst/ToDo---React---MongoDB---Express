import React from 'react';
import Modal from 'react-modal';
import '../App.css';

export default function EditModal({
  setmodalIsOpen,
  modalIsOpen,
  setTitle,
  setDescription,
  setTimetable,
  editTask,
  title,
  timetable,
  description,
}) {
  const titleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };
  const descriptionChange = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };
  const timetableChange = (e) => {
    console.log(e.target.value);
    setTimetable(e.target.value);
  };

  return (
    <Modal className="bg-modal" isOpen={modalIsOpen} ariaHideApp={false}>
      <div className="modal-content">
        <form onSubmit={editTask}>
          <div className="close" onClick={() => setmodalIsOpen(false)}>
            +
          </div>
          <input
            className="adminForm-input"
            type="text"
            name="task"
            id="taskNewTitle"
            value={title}
            onChange={titleChange}
          />
          <textarea
            name="desc"
            className="adminForm-input"
            cols=""
            rows="10"
            id="taskNewDesc"
            value={description}
            onChange={descriptionChange}
          ></textarea>
          <input
            name="timetable"
            type="datetime-local"
            id="taskNewTimetable"
            value={timetable}
            onChange={timetableChange}
          />
          <br />
          <label htmlFor="">Select date and time for this task</label>
          <input
            className="adminForm-input"
            type="submit"
            value="Save Changes"
            id="changeButton"
          />
        </form>
      </div>
    </Modal>
  );
}
