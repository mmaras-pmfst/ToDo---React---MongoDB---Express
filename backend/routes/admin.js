const router = require('express').Router();
const Task = require('../model/Task');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

//#region //*LISTING ALL USERS
router.get('/', async (req, res) => {
  console.log('Fetching all users!');
  const allUsers = await User.find({ role: 'user' }).populate('tasks');
  console.log(allUsers);
  res.json(allUsers);
});
//#endregion

//#region //*VIEW, EDIT, DELETE SELECTED USER
router.get('/:id', async (req, res) => {
  const user = await User.find({ _id: req.params.id }).populate('tasks', {
    _id: 1,
  });
  if (user) {
    console.log(user);
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put('/:id', async (req, res) => {
  console.log('Editing user...');
  const data = req.body;
  const userId = req.params.id;
  console.log(data);
  if (data.userPassword != data.userPassword2 && data.userPassword.lenght < 6) {
    return res.status(404).send({
      error: 'Passwords are not equal',
    });
  }
  const user = await User.findById(userId);
  console.log('User to edit: ');
  console.log(user);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.userPassword, salt);

  const dataEdit = {
    username: data.username,
    email: data.email,
    password: hashedPassword,
  };

  User.findByIdAndUpdate(userId, dataEdit, {
    new: true,
    useFindAndModify: false,
  }).then((newUser) => {
    console.log(newUser);
    res.json(newUser);
  });
});

router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  console.log('User to delete...');
  console.log(user);
  await Task.deleteMany({
    user: {
      $in: [userId],
    },
  });
  console.log('All user tasks deleted');

  await User.findByIdAndRemove(userId, { useFindAndModify: false });
  console.log('User deleted');
  res.status(204).end();
});
//#endregion

module.exports = router;
