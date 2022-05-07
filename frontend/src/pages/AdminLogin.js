import React, { useState } from 'react';
import avatar from '../img/userFinal.png';
import '../App.css';
import userServer from '../services/userAuth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const adminLogin = async (e) => {
    e.preventDefault();
    const admin = {
      username: username,
      userPassword: password,
    };
    try {
      console.log('sending data to server...');
      await userServer.adminLogin(admin).then((response) => {
        console.log(response.data);
        window.localStorage.setItem(
          'loggedUser',
          JSON.stringify(response.data)
        );
        window.location = '/users';
      });
    } catch (exception) {
      console.log(exception.response.data);
      alert(exception.response.data.error);
      window.location = '/user/adminlogin';
    }
  };

  return (
    <>
      <div className="loginBox">
        <img src={avatar} className="avatar" alt="" />
        <h2 style={{ textAlign: 'center' }}>Admin Sign in</h2>
        <br />
        <br />
        <form onSubmit={adminLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username.."
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            name="password"
            id=""
            placeholder="Password.."
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" name="login" value="Login" />
        </form>
      </div>
    </>
  );
}
