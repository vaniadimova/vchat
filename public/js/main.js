const chatForm = document.getElementById('chat-form'); // Form to connect w server
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

const socket = io();

// Join Chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

//Emits message and then log
socket.on('message', message => {
    console.log(message);
    outputMessage(message);  //Using Vanila JS here, but can use React

    // Scroll down Code - text stays at the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

    // Message Submit... when you submit a form it connects to a file, prevent
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Input Text   / from dom  oneway/ or id = msg (in chat.html) +target+value
const msg = e.target.elements.msg.value;
    
    // Emit message to server
socket.emit('chatMessage', msg);

    // Clear input
e.target.elements.msg.value = '';
e.target.elements.msg.focus(); //Calling Focus Method after text is typed and sent clears the chat box
});

// Output mesage to DOM
function outputMessage(message)  {
    const div = document.createElement('div'); // chat.html - divs - control the msgs
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
// Place text msg to the DOM
 document.querySelector('.chat-messages').appendChild(div); //Everytime we append it adds div
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users)  {
    userList.innerHTML = '';
    users.forEach(user=>{
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}