const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 50,
  },
  description: {
    type: String,
    required: false,
    max: 255,
  },
  datetime: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
  },
  timetable: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Task', taskSchema);
