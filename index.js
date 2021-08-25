const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql');
const port = process.env.POSt || 9000;
const partials_path = path.join(__dirname, '/templates/partials');
const view_path = path.join(__dirname, '/templates/views');

const bodyParser = require('body-parser');
const { connect } = require('http2');

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.set('views', view_path);
hbs.registerPartials(partials_path);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/scripts/'));

// connecting to my sql 

// connecting to my sql 
var con;
app.get('/', (req, res) => {

    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "players",
        debug: false,
    });


    con.connect(function(err) {
        if (err) throw err;
        console.log("connected");


        const table = `CREATE TABLE if not exists users(id int Primary Key auto_increment, username varchar(25), password varchar(50) )`;
        con.query(table, function(err, result) {
            if (err) throw err;
            console.log("users  table  created");
        });

    });

    res.render('assesment');

});


app.get('connected', (req, res) => {
    res.send("connected ");
    res.render('assesment');
});

var actual_user = "";
app.post('/login_user', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    con.query(`select * from users where username = '${username}' and password = '${password}' `, (err, data) => {
        try {
            console.log(data);
            if (username == data[0].username && password == data[0].password) {
                res.status(201).render('dashboard', {
                    u_name: username,
                    u_password: password
                });
                actual_user = data[0].username;
            } else
                res.send("email or password is incorrect");

        } catch (err) {
            console.log(err);
        }

    });
});


app.get('/signup', (req, res) => {
    res.render('signup');
});


app.post('/register_user', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    con.query(`insert into users(username, password) values('${username}', '${password}' )`, (err, data) => {
        try {
            console.log(err + data);
            res.render('assesment', {
                username: username,
                password: password
            });
        } catch (err) {
            console.log(err);
        }
    });


});


const server = app.listen(port, () => {
    console.log('service started at port 9000');
});

//  -----------------socket io -------------

var all_data;
const io = require('socket.io')(server);
io.on('connection', (socket) => {

    console.log("new connection " + socket.id);
    //   receive msg 
    socket.on('message', (data) => {
        all_data = {
            msg: data,
            id: socket.id,
            ac_user: actual_user
        }
        console.log(all_data.id + "msg  :  " + all_data.msg + " user" + all_data.ac_user);

        // sending msg to  every user 
        socket.broadcast.emit('message', all_data);
        // sending msg to  every user 

    });

});


//  -----------------socket io -------------