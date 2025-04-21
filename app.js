const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

// Middleware setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Database connection
main()
  .then(() => console.log('Connection successful'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Index route - show all chats
app.get('/chats', async (req, res) => {
  const chats = await Chat.find();
  const { status } = req.query;
  res.render('index.ejs', { chats, status });
});

// New chat form
app.get('/chats/new', (req, res) => {
  res.render('new.ejs');
});

// Create new chat
app.post('/chats', async (req, res) => {
  const chatData = {
    ...req.body,
    created_at: new Date()
  };
  await Chat.create(chatData);
  res.redirect('/chats?status=added');
});

// Edit form
app.get('/chats/:id/edit', async (req, res) => {
  const { id } = req.params;
  const chats = await Chat.findById(id);
  res.render('edit.ejs', { chats });
});

// Update chat
app.put('/chats/:id', async (req, res) => {
  const { id } = req.params;
  const { message: newMsg } = req.body;
  await Chat.findByIdAndUpdate(id, { message: newMsg }, {
    new: true,
    runValidators: true
  });
  res.redirect('/chats?status=edited');
});

// Delete chat
app.delete('/chats/:id', async (req, res) => {
  const { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect('/chats?status=deleted');
});

// Root route
app.get('/', (req, res) => {
  res.send('Root is working');
});

app.listen(8080, () => {
  console.log('App is listening on port 8080');
});
