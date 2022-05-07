const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');

const app = require('../app');
const User = require('../model/User');
const Task = require('../model/Task');
const api = supertest(app);

beforeEach(async () => {
  await Task.deleteMany({});
  await User.deleteMany({});
  let hashPassword = await bcrypt.hash('password', 10);
  let userObject = new User({
    username: 'testUserTask',
    email: 'testuser@gmail.com',
    password: hashPassword,
    role: 'user',
  });
  await userObject.save();

  const user = await User.findOne({});
  console.log('user: ', user);
  let task = new Task({
    title: 'Test task',
    description: 'Testing tasks',
    datetime: new Date().toLocaleString().replace(',', '').replace(/:.. /, ' '),
    timetable: '20/12/2020 12:58 PM',
    complete: false,
    user: user._id,
  });
  await task.save();
  user.tasks = user.tasks.concat(task._id);
  await user.save();
});

test('Add new task', async () => {
  const user = {
    username: 'testUserTask',
    userPassword: 'password',
  };
  const result = await api
    .post('/api/user/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const token = 'bearer ' + result.body.token;

  const newTask = {
    title: 'newTask',
    description: 'Description for new task',
    datetime: new Date().toLocaleString().replace(',', '').replace(/:.. /, ' '),
    timetable: '20/12/2020 13:58 PM',
  };

  await api
    .post('/api/tasks/new')
    .set('Authorization', token)
    .send(newTask)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api
    .get('/api/tasks')
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(2);
});

test('check description of first task', async () => {
  const user = {
    username: 'testUserTask',
    userPassword: 'password',
  };
  const result = await api
    .post('/api/user/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const token = 'bearer ' + result.body.token;

  const response = await api
    .get('/api/tasks')
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body[0].description).toBe('Testing tasks');
});

test('delete task', async () => {
  const user = {
    username: 'testUserTask',
    userPassword: 'password',
  };
  const result = await api
    .post('/api/user/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const token = 'bearer ' + result.body.token;

  const response = await api
    .get('/api/tasks')
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  console.log('id: ', response.body[0].id);
  await api.delete(`/api/tasks/${response.body[0].id}`).expect(204);

  const endResponse = await api
    .get('/api/tasks')
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(endResponse.body).toHaveLength(response.body.length - 1);
});

afterAll(() => {
  mongoose.connection.close();
});
