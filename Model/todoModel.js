const todoSchema = require('../Schemas/todoSchema');
const mongoose = require('mongoose');

const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;