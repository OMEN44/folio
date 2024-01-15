const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const {
    addUser,
    getUser,
    getTimelineData,
    addTimelineEvent,
    deleteTimelineEvent,
    getAllNotes,
    getAllPublicNotes,
    addNote,
    editNote,
    deleteNote
} = require('./database')
/*

editNote(4, 'got some ideas', 'blank', 1)

addUser('huon', 'huonswales@gmail.com', 'password', 0)
addUser('user2', 'user@gmail.com', 'password', 1)

addNote('Test note 1', '# Title', true, 'test-note', 1)
addNote('Electromagnetic induction', `\`\`\`cpp
#include <iostream>

using namespace std;

int main()
{
    int num = 0;
    cout << "The number is: " << num << endl;
    return 0;
}
\`\`\``, false, 'emi', 1)
addNote('Spider-man', '# Spider-man', false, 'spider-man', 1)
addNote('Running out of ideas', '# Running out of ideas', true, 'no-ideas', 1)
addNote('I LIKE ROBOTS', '# I LIKE ROBOTS', false, 'robots', 1)
*/

const app = express();
const secretKey = 'My-epic-secret-key-1234$'; // Replace with a secure secret key

app.use(bodyParser.json());
app.use(cors());

// Authenticate user and generate a JWT
app.get('/access-level', (req, res) => {
    res.json({ valid: true, access: checkAccess(req, res).access })
})

/*=================================================
*
* Login endpoints
*
=================================================*/

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


/*=================================================
*
* Timeline endpoints
*
=================================================*/

app.get('/timeline', (req, res) => {
    getTimelineData()
        .then((data) => res.json({message: 'success', value: data}))
        .catch(error => res.status(404).json({message: 'Could not access timeline data', error: error}))
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
    if (checkAccess(req, res).access === 0) {
        const {id} = req.body
        deleteTimelineEvent(id)
            .then(() => res.json({ message: 'Success' }))
            .catch(error => {
                res.status(404).json({message: `Event not found`, error: error})
            })
    }
})


/*=================================================
*
* Notes endpoints
*
=================================================*/

app.get('/notes', (req, res) => {
    if (checkAccess(req, res).access === 0) {
        getAllNotes()
            .then(data => res.json({message: 'success', value: data}))
            .catch(error => res.status(404).json({message: 'Could not access timeline data', error: error}))
    } else {
        getAllPublicNotes()
            .then(data => res.json({message: 'success', value: data}))
            .catch(error => res.status(404).json({message: 'Could not access timeline data', error: error}))
    }
})

app.post('/notes/update', (req, res) => {
    if (checkAccess(req, res).access === 0) {
        const {id, content, access} = req.body
        editNote(id, content, access)
            .then(() => res.json({ message: 'Success' }))
            .catch(error => {
                res.status(404).json({message: `Note not found`, error: error})
            })
    } else {
        res.status(401).json({ error: 'User not logged in' })
    }
})

app.post('/notes/create', (req, res) => {
    const user = checkAccess(req, res)
    if (user.access === 0) {
        const {title, access} = req.body
        addNote(title, '# Title\nAdd some content', access, title, user.userId)
            .then(() => res.json({ message: 'Success' }))
            .catch(error => {
                console.log(error)
                res.status(404).json({message: `Unable to create`, error: error})
            })
    } else {
        res.status(401).json({ error: 'User not logged in' })
    }
})

app.post('/notes/delete', (req, res) => {
    if (checkAccess(req, res).access === 0) {
        const {id} = req.body
        deleteNote(id)
            .then(() => res.json({ message: 'Success' }))
            .catch(error => {
                res.status(404).json({message: `Note not found`, error: error})
            })
    } else {
        res.status(401).json({ error: 'User not logged in' })
    }
})

const checkAccess = (req, res) => {

    const token = req.headers.authorization?.split(' ')[1];
    if (token === 'null') return false;

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
