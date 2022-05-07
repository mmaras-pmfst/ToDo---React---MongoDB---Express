const router = require('express').Router();
const Task = require('../model/Task');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const getToken = (req) => {
  console.log('get token method');
  const auth = req.get('authorization');
  console.log(auth);
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return auth.substring(7);
  }
  return null;
};

//#region //*LISTING ALL TASKS
router.get('/', async (req, res) => {
  console.log('Fetching tasks from database!');
  const token = getToken(req);
  const decToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decToken.id) {
    return res.status(401).json({
      error: 'Not Authorized!',
    });
  }
  const allTasks = await Task.find({ user: decToken.id });

  console.log(allTasks);
  res.json(allTasks);
});
//#endregion

//#region //*SEE, EDIT, DELETE, DONE-UNDONE ONE TASK
router.put('/done/:id', async (req, res) => {
  console.log('Done route');
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  console.log(`Task complete state before: ${task.complete}`);

  task.complete = !task.complete;
  console.log(`Task complete state after: ${task.complete}`);
  Task.findByIdAndUpdate(taskId, task, { new: true }).then((newTask) => {
    res.json(newTask);
  });
});

router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    console.log(task);
    res.json(task);
  } else {
    res.status(404).end();
  }
});

router.put('/:id', async (req, res) => {
  console.log('Editing...');
  const data = req.body;
  const taskId = req.params.id;
  const token = getToken(req);
  const decToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decToken.id) {
    return res.status(401).json({
      error: 'Not Authorized!',
    });
  }
  const task = await Task.findById(taskId);
  console.log('Task to edit: ');
  console.log(task);

  const editedTask = {
    title: data.title,
    description: data.description,
    datetime: task.datetime,
    complete: task.complete,
    timetable: req.body.timetable,
    user: decToken.id, //'5fec5b08732fc609a0684173'
  };

  Task.findByIdAndUpdate(taskId, editedTask, { new: true }).then((newTask) => {
    res.json(newTask);
  });
});

router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  console.log('Task to delete: ');
  console.log(task);

  await Task.findByIdAndRemove(taskId);
  console.log('Task deleted');
  res.status(204).end();
});
//#endregion

//#region //*ADDING NEW TASK
router.post('/new', async (req, res) => {
  const token = getToken(req);
  const decToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decToken.id) {
    return res.status(401).json({
      error: 'Not Authorized!',
    });
  }
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    datetime: new Date().toLocaleString().replace(',', '').replace(/:.. /, ' '),
    complete: false,
    timetable: req.body.timetable,
    user: decToken.id, //'5fec5b08732fc609a0684173'
  });
  try {
    const savedTask = await task.save();
    console.log('Task added to database');
    console.log(savedTask);
    const user = await User.findById(decToken.id);
    console.log(user);
    user.tasks = user.tasks.concat(savedTask._id);
    await user.save();
    return res.status(200).send(savedTask);
  } catch (err) {
    res.status(400).send(err);
  }
});
//#endregion

module.exports = router;
