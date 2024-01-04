const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');


//const { db } = require('./databaseConfig')
const { addUser, getUser} = require('./database')
/*addUser("Blorp", "blorp@gmail.com", 'pass', 0).then(result => console.log(result))
    .catch(error => {
        if (error.name === 'SequelizeUniqueConstraintError')
            console.log('user already exists')
    })*/

const app = express();
const secretKey = 'My-epic-secret-key-1234$'; // Replace with a secure secret key

app.use(bodyParser.json());
app.use(cors());

// Authenticate user and generate a JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    getUser(username, username).then(result => {
        if (result.length === 1) {
            if (result[0].password === password) {
                const token = jwt.sign({ userId: result[0].id, username: result[0].username }, secretKey, { expiresIn: '1h' });
                res.json({ token: token, username: username });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        } else {
            res.status(401).json({ error: 'No user found' });
        }
    })
});

app.post('/register', (req, res) => {
    const { username, password, email } = req.body

    addUser(username, email, password, 0)
        .then(() => res.json({ message: 'Successfully registered'}))
        .catch(error => {
            if (error.name === 'SequelizeUniqueConstraintError')
                res.status(409).json({error: `User: ${username} or email: ${email} are already in use.`})
        })
})

// Example protected route
app.get('/api/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey);
            res.json({ message: 'Protected resource', user: decoded });
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
