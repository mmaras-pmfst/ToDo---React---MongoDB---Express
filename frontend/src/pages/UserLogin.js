import React, { useState } from 'react';
import avatar from '../img/userFinal.png';
import { Link } from 'react-router-dom';
import '../App.css';
import userServer from '../services/userAuth';

export default function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      userPassword: password,
    };
    try {
      console.log('sending data to server...');
      await userServer.login(user).then((response) => {
        console.log(response.data);
        window.localStorage.setItem(
          'loggedUser',
          JSON.stringify(response.data)
        );
        window.location = '/tasks';
      });
    } catch (exception) {
      console.log(exception.response.data);
      alert(exception.response.data.error);
      window.location = '/user/login';
    }
  };

  return (
    <>
      <div className="loginBox">
        <img src={avatar} className="avatar" alt="" />
        <form onSubmit={userLogin}>
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

          <div className="links">
            <Link to="#">Lost your password?</Link>
            <br />

            <Link to="/user/registration">Don't have an account?</Link>
          </div>
        </form>
      </div>
    </>
  );
}
