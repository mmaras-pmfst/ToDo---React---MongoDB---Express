import React from 'react';
import Modal from 'react-modal';
import '../App.css';

export default function EditModal({
  setModalIsOpen2,
  modalIsOpen2,
  setPassword,
  setConfPassword,
  editUser,
  userInfo,
}) {
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const confPassChange = (e) => {
    setConfPassword(e.target.value);
  };

  return (
    <Modal className="bg-modal" isOpen={modalIsOpen2} ariaHideApp={false}>
      <div className="modal-content">
        <form onSubmit={editUser}>
          <div className="close" onClick={() => setModalIsOpen2(false)}>
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
          <input
            className="adminForm-input"
            type="password"
            name="task"
            id="taskNewTitle"
            placeholder="New password"
            onChange={passwordChange}
          />
          <input
            className="adminForm-input"
            type="password"
            name="task"
            id="taskNewTitle"
            placeholder="Confirm new password"
            onChange={confPassChange}
          />
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
