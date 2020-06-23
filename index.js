const express = require('express');
const mysql   = require('mysql');
const bodyParser = require('body-parser')

const port    = 3000;

const app = express();
app.use(bodyParser.json())



//Create Connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'DamianMade7',
    database : 'Ment2Be'
  });

//Connect
db.connect();
 
db.query('SELECT 1 + 1 AS solution', function (err, res, fields) {
  if (err) throw err;
  console.log('The solution is: ', res[0].solution);
});




// Test
app.get('/', function (req, res) {
    res.send('Hello World')
});

// Insert test
app.get('/user', (req, res) => {
    let user = {
        first_name: 'john',
        last_name: 'doe',
        email: 'joedoe@gmail.com',
        phone_number: '911'
    }
    let sql = 'INSERT INTO user SET ?';
    let query = db.query(sql, user, (err, result) => {
        if(err) throw(err);
        console.log(result);
        console.log(user)
        res.send('User added')
        
    });
});

// Read test
app.get('/users', (req, res) => {
    
    let sql = 'SELECT * FROM user';
    let query = db.query(sql, (err, result) => {
        if(err) throw(err);
        console.log(result);
        res.send(result)
        
    });
});

app.listen(port, () => {
    console.log("Server started on port " + port)
});
