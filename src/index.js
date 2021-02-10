const { response } = require('express');
const express = require('express');
const { request } = require('http');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const users = [];
const crypto  = require('crypto');
const jwt = require('jsonwebtoken');
const { secretKey } = require('./config');


app.use(bodyParser.urlencoded({extended : true}));

app.get('/',(request, response)=>{
    response.status(200);
    response.send('Hello world');
});

app.post('/signup',(request, response)=>{
    console.log(request.body);
    const row =  users.find((user => user.username === request.body.username));
    if (row != undefined){
        response.status(409);
        response.send(`Username existed`);
        console.log('Existed User');
    }
    else {
        users.push({'username': request.body.username, 
        'password': crypto.createHash('sha256').update(request.body.password).digest('hex'),
    });
        console.log(users);
        response.status(201);
        response.send(`Create user successful`);
    }
});

app.post('/login',(request, response)=> {
    const row =  users.find((user => user.username === request.body.username));
    if (row != undefined ) {
        let password =  crypto.createHash('sha256').update(request.body.password).digest('hex');
        if (password === row.password) {
            // Tao payload
            let payload = {
                username: request.body.username,
                type: 'access'
            };
            let token = jwt.sign(payload,secretKey,{expiresIn:'1'});
            console.log('Success');
            response.status(200).send(token);
        }
        else {
            response.status(401).send('Wrong password');
        }
    }
    else {
        response.status(401).send('User does not exist');
    }
});

app.listen(PORT);

console.log('Server is running on port: '+ PORT);



