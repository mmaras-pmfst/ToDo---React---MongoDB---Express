import React, { useState, useEffect } from 'react';
import '../App.css';
import taskServer from '../services/tasks';
import NavBar2 from '../components/NavBar2';
import DoneTask from '../components/DoneTask';
import ViewModal from '../components/ViewModal';

export default function CompletedTasks() {
  const [doneTasks, setDoneTasks] = useState([]);
  const [modalIsOpen2, setmodalIsOpen2] = useState(false);
  const [oneTask, setOneTask] = useState({});

  useEffect(() => {
    console.log('Effect hook');
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);

      taskServer.setToken(user.token);
      taskServer.getAll().then((response) => {
        console.log('Tasks are loaded!');
        setDoneTasks(response.data);
      });
    } else {
      alert('You are not logged!');
      window.location = '/';
    }
  }, []);

  //#region //*Metode
  const tasksToShow = doneTasks.filter((t) => t.complete === true);

  const uncompleteTaks = (id) => {
    const task = doneTasks.find((t) => t.id === id);
    const newTask = {
      ...task,
      complete: false,
    };
    taskServer.completeTask(id, newTask).then((response) => {
      console.log(response);
      console.log('edited');
      setDoneTasks(doneTasks.map((t) => (t.id !== id ? t : response.data)));
    });
  };

  const deleteTask = (id) => {
    taskServer.deleteTask(id).then((response) => {
      setDoneTasks(doneTasks.filter((t) => t.id !== id));
    });
  };

  const getOneTask = (id) => {
    const task = doneTasks.find((t) => t.id === id);

    setOneTask(task);
    setmodalIsOpen2(true);
  };
  //#endregion

  return (
    <>
      <div>
        <h1>Completed Tasks</h1>
      </div>
      <ViewModal
        setmodalIsOpen2={setmodalIsOpen2}
        modalIsOpen2={modalIsOpen2}
        oneTask={oneTask}
      />
      <div className="tasks">
        <ul className="completedUl" id="todo2">
          {tasksToShow.map((t) => (
            <DoneTask
              key={t.id}
              task={t}
              uncompleteTaks={() => uncompleteTaks(t.id)}
              deleteTask={() => deleteTask(t.id)}
              getOneTask={() => getOneTask(t.id)}
            />
          ))}
        </ul>
      </div>
      <NavBar2 />
    </>
  );
}
