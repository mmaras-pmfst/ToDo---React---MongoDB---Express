import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import AllTasks from './pages/AllTasks';
import NewTask from './pages/NewTask';
import CompletedTasks from './pages/CompletedTasks';
import AllUsers from './pages/AllUsers';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/user/registration" exact component={UserRegister} />
        <Route path="/user/login" exact component={UserLogin} />
        <Route path="/user/adminlogin" exact component={AdminLogin} />
        <Route path="/tasks" exact component={AllTasks} />
        <Route path="/tasks/new" component={NewTask} />
        <Route path="/tasks/done" component={CompletedTasks} />
        <Route path="/users" component={AllUsers} />
      </Switch>
    </Router>
  );
}

export default App;
