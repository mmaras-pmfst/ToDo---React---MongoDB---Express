import React, { useState, useEffect } from 'react';
import taskServer from '../services/tasks';
import '../App.css';
import NavBar from '../components/NavBar';
import Task from '../components/Task';
import EditModal from '../components/EditModal';
import ViewModal from '../components/ViewModal';

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [oneTask, setOneTask] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timetable, setTimetable] = useState('');
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [modalIsOpen2, setmodalIsOpen2] = useState(false);
  const [user, setUser] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('Effect hook');
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user.username);
      taskServer.setToken(user.token);
      taskServer.getAll().then((response) => {
        console.log('Tasks are loaded!');
        setTasks(response.data);
      });
    } else {
      alert('You are not logged!');
      window.location = '/';
    }
  }, []);

  let tasksToShow = tasks.filter(
    (t) =>
      t.complete === false &&
      t.title.toLowerCase().includes(search.toLowerCase())
  );

  //#region //*METODE
  const completeTaks = (id) => {
    const task = tasks.find((t) => t.id === id);
    const newTask = {
      ...task,
      complete: true,
    };
    taskServer.completeTask(id, newTask).then((response) => {
      console.log(response);
      console.log('edited');
      setTasks(tasks.map((t) => (t.id !== id ? t : response.data)));
    });
  };

  const deleteTask = (id) => {
    taskServer.deleteTask(id).then((response) => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  const getOneTask = (id) => {
    const task = tasks.find((t) => t.id === id);

    setOneTask(task);
    setmodalIsOpen2(true);
  };

  const getOneTaskForEdit = (id) => {
    const task = tasks.find((t) => t.id === id);
    setOneTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setTimetable(task.timetable);
    setmodalIsOpen(true);
  };

  const editTask = (e) => {
    e.preventDefault();
    const newTask = {
      title: title,
      description: description,
      timetable: timetable,
    };
    console.log(newTask);
    taskServer.editTask(oneTask.id, newTask).then((response) => {
      console.log(response);
      console.log('edited');
      setTasks(tasks.map((t) => (t.id === oneTask.id ? response.data : t)));
      setmodalIsOpen(false);
    });
  };
  //#endregion

  return (
    <>
      <div className="searchDiv">
        <form className="search">
          <div className="searchInput_Btn">
            <input
              type="text"
              className="searchInput"
              name="word"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="welcomeTitle">
            <h1>What to do {user}?</h1>
          </div>

          <div className="sort">
            <div className="dropdown"></div>
          </div>
        </form>
      </div>

      <EditModal
        setmodalIsOpen={setmodalIsOpen}
        modalIsOpen={modalIsOpen}
        setTitle={setTitle}
        title={title}
        description={description}
        timetable={timetable}
        setDescription={setDescription}
        setTimetable={setTimetable}
        editTask={editTask}
      />
      <ViewModal
        setmodalIsOpen2={setmodalIsOpen2}
        modalIsOpen2={modalIsOpen2}
        oneTask={oneTask}
      />
      <div className="listsContainer">
        <ul className="todo" id="todo2">
          {tasksToShow.map((t) => (
            <Task
              key={t.id}
              task={t}
              completeTaks={() => completeTaks(t.id)}
              deleteTask={() => deleteTask(t.id)}
              getOneTask={() => getOneTask(t.id)}
              getOneTaskForEdit={() => getOneTaskForEdit(t.id)}
            />
          ))}
        </ul>
      </div>

      <NavBar />
    </>
  );
}
