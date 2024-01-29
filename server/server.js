import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import cors from 'cors'

// Other routes
import timeline from './routes/timeline.js'
import login from './routes/login.js'
import notes from './routes/notes.js'

/*editNote(4, 'got some ideas', 'blank', 1)

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
export const secretKey = 'My-epic-secret-key-1234$'; // Replace with a secure secret key

app.use(bodyParser.json());
app.use(cors());
app.use('/api/timeline', timeline)
app.use('/api/login', login)
app.use('/api/notes', notes)
app.use((req, res, next) => {
    if (!req.url.includes('api'))
        res.sendFile(__dirname + '/public/index.html')
    else next()
})

app.get('/api/auth', (req, res) => {
    res.json({ valid: true, value: checkUserData(req, res) })
})

export const checkUserData = (req, res) => {
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

const stdin = process.openStdin();
stdin.addListener("data", (d) => {
    switch (d.toString().trim()) {
        case 'exit':
            process.exit()
            break
        case 'help':
            console.log('Commands: \nexit\t- closes the server and website')
            break
    }
});