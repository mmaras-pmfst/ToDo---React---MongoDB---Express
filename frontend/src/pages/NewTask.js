import React, { useState, useEffect } from 'react';
import '../App.css';
import taskServer from '../services/tasks';
import NewTaskHeader from '../components/NewTaskHeader';

export default function NewTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timetable, setTimetable] = useState('');

  useEffect(() => {
    console.log('Effect hook');
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      taskServer.setToken(user.token);
    } else {
      alert('You are not logged!');
      window.location = '/';
    }
  }, []);

  //#region //*Metode
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

  const newTask = (e) => {
    e.preventDefault();
    console.log('Click', e.target);
    const taskObject = {
      title: title,
      description: description,
      timetable: timetable,
    };
    taskServer.createNewTask(taskObject).then((response) => {
      console.log(response);
      window.location.href = '/tasks';
    });
  };
  //#endregion

  return (
    <>
      <NewTaskHeader />
      <div>
        <form onSubmit={newTask}>
          <div className="title_desc">
            <div className="titleDiv">
              <input
                className="title"
                type="text"
                onChange={titleChange}
                name="task"
                id="taskNewTitle"
                placeholder="Title.."
              />
            </div>
            <div className="descDiv">
              <textarea
                name="desc"
                className="desc"
                onChange={descriptionChange}
                cols=""
                rows="10"
                id="taskNewDesc"
                placeholder="Description.."
              ></textarea>
            </div>
            <div>
              <input
                name="timetable"
                type="datetime-local"
                id="taskNewTimetable"
                onChange={timetableChange}
              />
              <label>Select date and time for this task</label>
            </div>
          </div>

          <div className="saveDiv">
            <button type="submit" className="saveBtn">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
