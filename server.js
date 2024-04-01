const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vmysql@90',
    database: 'apitesting'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Sign-up Endpoint
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error signing up');
        } else {
            console.log('User signed up successfully');
            res.status(200).send('User signed up successfully');
        }
    });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error logging in');
        } else {
            if (result.length > 0) {
                console.log('User logged in successfully');
                res.status(200).send('User logged in successfully');
            } else {
                console.log('Invalid email or password');
                res.status(401).send('Invalid email or password');
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
