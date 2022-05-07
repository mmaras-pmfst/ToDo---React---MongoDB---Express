const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const User = require('../model/User');
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  let hashPassword = await bcrypt.hash('password', 10);
  let userObject = new User({
    username: 'testUser',
    email: 'testuser@gmail.com',
    password: hashPassword,
    role: 'user',
  });
  await userObject.save();
  hashPassword = await bcrypt.hash('userpass', 10);
  userObject = new User({
    username: 'testUser2',
    email: 'testuser2@gmail.com',
    password: hashPassword,
    role: 'user',
  });
  await userObject.save();
});

test('JSON format in response ', async () => {
  await api
    .get('/api/admin')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('database has two users', async () => {
  const response = await api.get('/api/admin');
  expect(response.body).toHaveLength(2);
});

test('check username for first user', async () => {
  const response = await api.get('/api/admin');
  expect(response.body[0].username).toBe('testUser');
});

test('Creating new user is valid', async () => {
  const users = await User.find({});
  const startUsers = users.map((u) => u.toJSON());

  const newUser = {
    username: 'newUser',
    email: 'newuser@gmail.com',
    userPassword: 'newuser1',
    userPassword2: 'newuser1',
  };

  await api
    .post('/api/user/registration')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const users2 = await User.find({});
  const endUsers = users2.map((u) => u.toJSON());
  expect(endUsers).toHaveLength(startUsers.length + 1);

  const haveUsername = endUsers.map((u) => u.username);
  expect(haveUsername).toContain(newUser.username);
});

test('Passwords are not equal during registration', async () => {
  const users = await User.find({});
  const startUsers = users.map((u) => u.toJSON());
  console.log(startUsers.length);
  const newUser = {
    username: 'newUser2',
    email: 'newuser2@gmail.com',
    userPassword: 'newuser1',
    userPassword2: 'newuser2',
  };

  const response = await api
    .post('/api/user/registration')
    .send(newUser)
    .expect(404)
    .expect('Content-Type', /application\/json/);

  expect(response.body.error).toContain('Passwords are not equal');

  const users2 = await User.find({});
  const endUsers = users2.map((u) => u.toJSON());
  expect(endUsers).toHaveLength(startUsers.length);
});

test('User login: password is invalid', async () => {
  const user = {
    username: 'testUser',
    userPassword: '12345678',
  };

  const response = await api
    .post('/api/user/login')
    .send(user)
    .expect(404)
    .expect('Content-Type', /application\/json/);

  expect(response.body.error).toContain('Invalid password');
});

afterAll(() => {
  mongoose.connection.close();
});
