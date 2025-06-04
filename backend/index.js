const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let todos = [];
let currentId = 1;

// Mendapatkan semua todo
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Menambahkan todo baru
app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = { id: currentId++, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Memperbarui todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// Menghapus todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Backend berjalan di http://localhost:${port}`);
});
