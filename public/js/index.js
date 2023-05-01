let username;
let socket = io()

do {
    username = prompt("Enter your Name")
} while (!username)

const textarea = document.querySelector("#comment-box");
const btn = document.querySelector("#Submit");
const comment_stack = document.querySelector("#comment-stack");
btn.addEventListener('click', () => {
    let comment = textarea.value;
    if (!comment) {
        alert('Empty?')
        return
    }
    postComment(comment)
})

function postComment(comment) {
    //Append to dom
    let data = {
        username: username,
        comment: comment                                                                                                                                                                                                                              
    }                                                                                                                                                                                                                             
    appendToDom(data)                                                                                                                                                                                                                             

    //Broadcast                                                                                                                                                                                                                           
    broadcastComment(data)                                                                                                                                                                                                                            
    //sync in mysql                                                                                                                                                                                                                           
}                                                                                                                                                                                                                             

function appendToDom(data) {                                                                                                                                                                                                                              
    let ltag = document.createElement('li');                                                                                                                                                                                                                              
    let markup = `                                                                                                                                                                                                                            
        <h3>${data.username}</h3>                                                                                                                                                                                                                             
        <p>${data.comment}</p>                                                                                                                                                                                                                            
        <div><b>${new Date().getTime()}</b></div>                                                                                                                                                                                                                             
        <hr>                                                                                                                                                                                                                              
        <br>                                                                                                                                                                                                                              
    `                                                                                                                                                                                                                             
    ltag.innerHTML = markup                                                                                                                                                                                                                           
    comment_stack.prepend(ltag)                                                                                                                                                                                                                           
    textarea.value = ""                                                                                                                                                                                                                           
}                                                                                                                                                                                                                             

function broadcastComment(data) {                                                                                                                                                                                                                             
    socket.emit('comment', data)                                                                                                                                                                                                                              
}                                                                                                                                                                                                                             

socket.on("comment2", (data) => {                                                                                                                                                                                                              
    console.log("I am connected");                                                                                                                                                                                                              
    console.log(data);                                                                                                                                                                                                  
    appendToDom(data)                                                                                                                                                                                                  
})                                                                                                                                                                                                                            
