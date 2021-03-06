let socket = io();

let text_area = document.getElementById('text_area');
let send = document.getElementById('btn_submit');
let u_name = document.getElementById('u_name');
send.addEventListener('click', (e) => {
    e.preventDefault();
    let msg = text_area.value;
    text_area.value = "";
    broadcat_msg(msg);

});


document.getElementById('text_area').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn_submit").click();
    }
})

var datetime;

function actual_user_msg(msg, c_user = "default") {
    var currentdate = new Date();
    datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    let users_div = document.createElement('div');
    users_div.classList.add('media', 'media-chat', 'media-chat-reverse');
    users_div.setAttribute('id', 'pointer');
    let pntr = document.getElementById('pointer');
    let inner_ele = `<div class="media-body">
                                        <p> ${msg} </p>
                                        <p class="meta"><time datetime="2018" style="color:black;">${datetime}</time></p>
                                    </div>`;
    users_div.insertAdjacentHTML('afterbegin', inner_ele);
    let user_msg = document.getElementById('users_msg');
    user_msg.insertAdjacentElement('beforebegin', users_div);
}


function other_users_message(msg, c_user = "default") {
    const new_div = document.createElement('div');
    new_div.classList.add('media', 'media-chat');
    const material = `
    <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
    <div class="media-body">
     
    <p>  <span style=" font-weight: bold;"> ${c_user} </span> ${msg} </p>

</div>`;

    new_div.insertAdjacentHTML('afterbegin', material);
    document.getElementById('users_msg').insertAdjacentElement('beforebegin', new_div);

}


function broadcat_msg(msg) {
    socket.emit('message', msg);
}

socket.on('message', (data) => {

    if (data.ac_user == u_name.innerText)
        actual_user_msg(data.msg, data.ac_user);
    else
        other_users_message(data.msg, data.ac_user);
});



// <div class="media media-meta-day">Today</div>
//                             <div class="media media-chat media-chat-reverse">
//                                 <div class="media-body">

//                                     <p>Long time no see! Tomorrow office. will be free on sunday.</p>
//                                     <p class="meta"><time datetime="2018">00:06</time></p>
//                                 </div>
//                             </div>