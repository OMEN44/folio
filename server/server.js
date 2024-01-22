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

addTimelineEvent('Mindstorms', new Date(2017, 1), 'I first started playing with mindstorms in 2017, this is where my initial love for programming and building robots came from! The Mindstorm lego sets let me build whatever I wanted and allowed me to teach myself basic programming skills, in the form of the Mindstorm programming app and scratch. Among the more memorable projects that I worked on in this time are: Making my first bipedal robot and entering the RoboCup Jr competition for my primary school and becoming a finalist.')
addTimelineEvent('Arduino', new Date(2020, 2), 'As a school project I was introduced to ')
addTimelineEvent('Genetic Algorithm', new Date(2023, 9), 'As a starting point for machine learning I decided to make some basic genetic algorithms. My first one was a terminal app that tried to solve a polynomial with three values and let you change the mutation rate, selection rate, and the population size. Then after this I decided to look into the c++ SFML library to make a UI based genetic algorithm. The code for all of these projects is available on my github.')
addTimelineEvent('Terrain Generator', new Date(2021, 2), 'My first attempt at creating a terrain generation algorithm.')
addTimelineEvent('Indrocraft MC server', new Date(2021, 5), 'I eventually took my newfound Java skills further creating the Indrocraft server, dedicated to students at my high school (at the time I was in grade 10). I launched this server at the start of a COVID-19 lockdown and had an instant rush of players! The server was running on a dell power edge server with 48GB of ram that I was given by a friend. At the servers peak it had 200 members and was always active boasting 3 worlds networked together each with a selection of custom plugins that can be found at this link:')
addTimelineEvent('Minecraft', new Date(2020, 10), 'My friends and I discover the amazing world of Minecraft servers! I tried a number of different server hosting providers setting with Shockbyte hosting for quite some time as their interface made it easy for us to test out different custom plugins. My curiosity then led me to learn Java so that I could make plugins of my own.')
*/
const app = express();
const secretKey = 'My-epic-secret-key-1234$'; // Replace with a secure secret key

app.use(bodyParser.json());
app.use(cors());

/*app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/index.html')

})*/


// app.use(function(req, res, next) {
//     console.log(req.url)
// });
// Authenticate user and generate a JWT
app.get('/api/access-level', (req, res) => {
    res.json({ valid: true, value: checkAccess(req, res) })
})

/*=================================================
*
* Login endpoints
*
=================================================*/

app.post('/api/login', (req, res) => {
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

app.post('/api/register', (req, res) => {
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

app.get('/api/timeline', (req, res) => {
    getTimelineData()
        .then((data) => res.json({message: 'success', value: data}))
        .catch(error => res.status(404).json({message: 'Could not access timeline data', error: error}))
})

app.post('/api/timeline', (req, res) => {
    const { title, about, date } = req.body

    if (checkAccess(req, res).access !== 0) {
        res.status(401).json({ error: 'You do not have permission to create Timeline Events.' })
    }

    addTimelineEvent(title, date, about)
        .then(() => res.json({ message: 'Success' }))
        .catch(error => {
            console.log(error)
            if (error.name === 'SequelizeUniqueConstraintError')
                res.status(409).json({error: `Event with this title and time already exist`})
        })
})

app.post('/api/timeline/delete', (req, res) => {
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

app.get('/api/notes', (req, res) => {
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

app.post('/api/notes/update', (req, res) => {
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

app.post('/api/notes/create', (req, res) => {
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

app.post('/api/notes/delete', (req, res) => {
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
