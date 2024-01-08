const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const { addUser, getUser, getTimelineData, addTimelineEvent, deleteTimelineEvent} = require('./database')
const {response} = require("express");


const app = express();
const secretKey = 'My-epic-secret-key-1234$'; // Replace with a secure secret key

app.use(bodyParser.json());
app.use(cors());

// Authenticate user and generate a JWT
app.get('/access-level', (req, res) => {
    res.json({ valid: true, access: checkAccess(req, res).access })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    getUser(username, username).then(result => {
        if (result.length === 1) {
            if (result[0].password === password) {
                const token = jwt.sign({ userId: result[0].id, username: result[0].username, access: result[0].access }, secretKey, { expiresIn: '1h' });
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

    addUser(username, email, password, 1)
        .then(() => res.json({ message: 'Successfully registered'}))
        .catch(error => {
            if (error.name === 'SequelizeUniqueConstraintError')
                res.status(409).json({error: `User: ${username} or email: ${email} are already in use.`})
        })
})

app.get('/timeline', (req, res) => {
    getTimelineData()
        .then((data) => res.json({message: 'success', data: data}))
        .catch(error => res.status(404).json({error: 'Could not access timeline data'}))
})

app.post('/timeline', (req, res) => {
    const { title, about, date } = req.body

    addTimelineEvent(title, date, about)
        .then(() => res.json({ message: 'Success' }))
        .catch(error => {
            console.log(error)
            if (error.name === 'SequelizeUniqueConstraintError')
                res.status(409).json({error: `Event with this title and time already exist`})
        })
})

app.post('/timeline/delete', (req, res) => {
    console.log(checkAccess(req, res))
    if (checkAccess(req, res).access === 0) {
        console.log('error')
        const {id} = req.body
        deleteTimelineEvent(id)
            .then(() => res.json({ message: 'Success' }))
            .catch(error => {
                res.status(404).json({message: `Event not found`, error: error})
            })
    }
})


const checkAccess = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        try {
            return jwt.verify(token, secretKey)
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
    return false
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
