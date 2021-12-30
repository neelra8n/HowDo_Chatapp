const socket = io();

let username;

let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
    username = prompt('Please enter your name: ');
} while (!username);

textArea.addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
        sendMessage(e.target.value);
    }
})


const sendMessage = (msg) => {
    let message = {
        user: username,
        msg: msg.trim()
    }
    appendMessage(message, 'outgoing');

    //sending to server
    socket.emit('message', message);
}

const appendMessage =(msg, type)=> {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.msg}</p>`;

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
    textArea.value = '';
    scrollToBottom();
}


const scrollToBottom = () => {
    messageArea.scrollTop = messageArea.scrollHeight;
}

//receive on browser
socket.on('message', (msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom();
})
