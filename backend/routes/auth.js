const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  userRegisterValidation,
  userLoginValidation,
  adminLoginValidation,
} = require('./validation');

//#region //*USER REGISTRATION
router.post('/registration', async (req, res) => {
  const { error } = await userRegisterValidation(req.body);
  if (error) {
    return res.status(404).send({ error: error.message });
  }

  if (req.body.userPassword != req.body.userPassword2) {
    return res.status(404).send({
      error: 'Passwords are not equal',
    });
  }

  //checking if user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  const usernameExists = await User.findOne({
    username: req.body.username,
    role: 'user',
  });
  if (emailExists || usernameExists) {
    return res.status(404).json({
      error: 'Username or email already exists!',
    });
  }

  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.userPassword, salt);

  //creating new user
  console.log('Registering...');
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    role: 'user',
  });
  try {
    const savedUser = await user.save();
    console.log('New user added to database!');
    const userGet = await User.findOne({ username: req.body.username });
    const userToken = {
      username: user.username,
      id: user.id,
    };
    const token = jwt.sign(userToken, process.env.SECRET); //SECRET=secretcode
    res.status(200).send({ token, username: user.username });
  } catch (err) {
    res.status(400).send(err);
  }
});
//#endregion

//#region //*USER LOGIN
router.post('/login', async (req, res) => {
  const { error } = await userLoginValidation(req.body);
  if (error) {
    return res.status(404).json({ error: error.message });
  }

  //checking if user is in the database
  console.log('Searching for user...');
  const user = await User.findOne({
    username: req.body.username,
    role: 'user',
  });
  console.log(user);
  if (!user) {
    return res.status(404).json({
      error: 'Username does not exists',
    });
  }

  //checking password
  const validPassowrd = await bcrypt.compare(
    req.body.userPassword,
    user.password
  );
  if (!validPassowrd) {
    return res.status(404).json({
      error: 'Invalid password',
    });
  }
  const userToken = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(userToken, process.env.SECRET); //SECRET=secretcode
  console.log('status done');
  res.status(200).send({ token, username: user.username });
});
//#endregion

//#region //*ADMIN LOGIN
router.post('/adminlogin', async (req, res) => {
  console.log('admin login route');
  console.log(req.body);
  const { error } = await adminLoginValidation(req.body);
  if (error) {
    console.log('greska');
    return res.status(404).json({ error: error.message });
  }
  const adminExists = await User.findOne({ role: 'admin' });
  if (
    !adminExists &&
    req.body.username == 'admin' &&
    req.body.userPassword == 'admin'
  ) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt);

    //creating admin account
    const admin = new User({
      username: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });
    try {
      const saveAdmin = await admin.save();
      console.log('Admin created');
      const userToken = {
        username: admin.username,
        id: admin.id,
      };
      const token = jwt.sign(userToken, process.env.SECRET); //SECRET=secretcode
      res.status(200).send({ token, username: admin.username });
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    //checking password
    console.log('exists but...');
    const validPassowrd = await bcrypt.compare(
      req.body.userPassword,
      adminExists.password
    );
    if (!validPassowrd || req.body.username != adminExists.username) {
      return res.status(404).json({
        error: 'Invalid password or username',
      });
    }
    const userToken = {
      username: adminExists.username,
      id: adminExists.id,
    };
    const token = jwt.sign(userToken, process.env.SECRET); //SECRET=secretcode
    console.log('status done');
    res.status(200).send({ token, username: adminExists.username });
  }
});
//#endregion
module.exports = router;
