const mongoose = require('mongoose');

const Chat = require("./models/chat.js")

main()
.then(res => {
    console.log('connection successful');
}
)
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}
let chat= [{
    from: "user1",
    message: "hello",
    to: "user2",
    created_at: new Date()
},
{
    from: "user2",
    message: "hi",
    to: "user1",
    created_at: new Date()
},
{
    from: "user1",
    message: "how are you?",
    to: "user2",
    created_at: new Date()
},
{
    from: "user2",
    message: "I am fine",
    to: "user1",
    created_at: new Date()
},
{
    from: "user1",
    message: "what about you?",
    to: "user2",
    created_at: new Date()
},
{
    from: "user2",
    message: "I am also fine",
    to: "user1",
    created_at: new Date()
},
{
    from: "user1",
    message: "what are you doing?",
    to: "user2",
    created_at: new Date()
},
{
    from: "user2",
    message: "I am studying",
    to: "user1",
    created_at: new Date()
},
{
    from: "user1",
    message: "ok",
    to: "user2",
    created_at: new Date()
},
{
    from: "user2",
    message: "bye",
    to: "user1",
    created_at: new Date()
}];

Chat.insertMany(chat);
