let socket = io();

var user;

let text_area = document.getElementById('text_area');
let send = document.getElementById('btn_submit');
let u_name = document.getElementById('u_name');
send.addEventListener('click', (e) => {
    e.preventDefault();
    let msg = text_area.value;
    // actual_user_msg(msg);
    // other_users_message(msg);
    post_msg(msg);
    text_area.value = "";
    broadcat_msg(msg);
    // append_msg();
    // append_other_users_msg();
    console.log(user);

});

function post_msg(user_message) {
    actual_user_msg(user_message);
    other_users_message(user_message);
}

function actual_user_msg(msg, c_user = "default") {
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() +
        "/" + currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" + currentdate.getSeconds();
    let users_div = document.createElement('div');
    users_div.classList.add('media', 'media-chat', 'media-chat-reverse');
    users_div.setAttribute('id', 'pointer');
    let pntr = document.getElementById('pointer');
    let inner_ele = `<div class="media-body">
                                        <p> ${c_user}  ${msg} </p>
                                        <p class="meta"><time datetime="2018" color="color:black;">${datetime}</time></p>
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
     
    <p>${c_user}  ${msg}</p>
    <p class="meta"><time datetime="2018">23:58</time></p>
</div>`;

    new_div.insertAdjacentHTML('afterbegin', material);
    document.getElementById('chat-content').insertAdjacentElement('afterbegin', new_div);

}


function broadcat_msg(msg) {
    socket.emit('message', msg);
}

socket.on('message', (data) => {
    alert("  message and user  " + data.msg + "     " + data.ac_user);
    actual_user_msg(data.msg, data.ac_user);
    other_users_message(data.msg, data.ac_user);
});





// <div class="media media-meta-day">Today</div>
//                             <div class="media media-chat media-chat-reverse">
//                                 <div class="media-body">

//                                     <p>Long time no see! Tomorrow office. will be free on sunday.</p>
//                                     <p class="meta"><time datetime="2018">00:06</time></p>
//                                 </div>
//                             </div>