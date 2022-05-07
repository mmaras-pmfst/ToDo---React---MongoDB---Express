import React, { useState } from 'react';
import avatar from '../img/userFinal.png';
import '../App.css';
import { Link } from 'react-router-dom';
import userServer from '../services/userAuth';

export default function UserRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const userRegistration = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      email: email,
      userPassword: password,
      userPassword2: confirmPass,
    };
    try {
      await userServer.registration(newUser).then((response) => {
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
      window.location = '/user/registration';
    }
  };

  return (
    <>
      <div className="registerBox">
        <img src={avatar} className="avatar" alt="" />
        <form onSubmit={userRegistration}>
          <input
            type="text"
            name="username"
            placeholder="Username.."
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail.."
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            id=""
            placeholder="Password.."
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            name="passwordConfirmation"
            id=""
            placeholder="Confirm the password.."
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          <input type="submit" name="register" value="Register" />
          <p>
            <Link to="/user/login">Already have an account?</Link>
          </p>
        </form>
      </div>
    </>
  );
}
