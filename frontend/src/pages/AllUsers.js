import React, { useState, useEffect } from 'react';
import '../App.css';
import AdminNavBar from '../components/AdminNavBar';
import adminServer from '../services/users';
import User from '../components/User';
import ViewUserModal from '../components/ViewUserModal';
import EditUserModal from '../components/EditUserModal';

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [uncompleted, setUncompeted] = useState(0);
  const [sum, setSum] = useState(0);
  const [confPassword, setConfPassword] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('Effect hook');
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      // const admin = JSON.parse(loggedUser);
      adminServer.getAll().then((response) => {
        console.log('Users are loaded!');
        console.log(response.data);

        setUsers(response.data);
      });
    } else {
      alert('You are not logged!');
      window.location = '/';
    }
  }, []);

  let usersToShow = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const deleteUser = (id) => {
    adminServer.deleteUser(id).then((response) => {
      setUsers(users.filter((u) => u.id !== id));
    });
  };

  const getOneUser = (id) => {
    const user = users.find((u) => u.id === id);
    const br1 = user.tasks.reduce((n, t) => n + (t.complete === false), 0);
    const br2 = user.tasks.reduce((n, t) => n + (t.complete === true), 0);

    setUserInfo(user);
    setUncompeted(br1);
    setCompleted(br2);
    setSum(br1 + br2);
    setModalIsOpen(true);
  };

  const getOneUserForEdit = (id) => {
    const user = users.find((u) => u.id === id);
    setUserInfo(user);
    setModalIsOpen2(true);
  };

  const editUser = (e) => {
    e.preventDefault();
    const newUser = {
      ...userInfo,
      userPassword: password,
      userPassword2: confPassword,
    };
    console.log(newUser);
    adminServer.editUser(userInfo.id, newUser).then((response) => {
      console.log(response);
      console.log('edited');
      setUsers(users.map((u) => (u.id === userInfo.id ? response.data : u)));
      setModalIsOpen2(false);
    });
  };

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
            <h1>Welcome admin!</h1>
          </div>

          <div className="sort">
            <div className="dropdown"></div>
          </div>
        </form>
      </div>

      <ViewUserModal
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        userInfo={userInfo}
        uncompleted={uncompleted}
        completed={completed}
        sum={sum}
      />

      <EditUserModal
        setModalIsOpen2={setModalIsOpen2}
        modalIsOpen2={modalIsOpen2}
        setPassword={setPassword}
        setConfPassword={setConfPassword}
        editUser={editUser}
        userInfo={userInfo}
      />

      <div className="tasks">
        <ul className="completedUl" id="todo2">
          {usersToShow.map((u) => (
            <User
              key={u.id}
              user={u}
              deleteUser={() => deleteUser(u.id)}
              getOneUser={() => getOneUser(u.id)}
              getOneUserForEdit={() => getOneUserForEdit(u.id)}
            />
          ))}
        </ul>
      </div>

      <AdminNavBar />
    </>
  );
}
