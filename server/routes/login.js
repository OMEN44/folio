import express from 'express'
import jwt from 'jsonwebtoken'
import { secretKey } from '../server.js'
import {
    addUser,
    getUser
} from '../database.js'

const router = express.Router()
export default router

router.post('/', (req, res) => {
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

router.post('/register', (req, res) => {
    const { username, password, email } = req.body

    addUser(username, email, password, 1)
        .then(() => res.json({ message: 'Successfully registered' }))
        .catch(error => {
            if (error.name === 'SequelizeUniqueConstraintError')
                res.status(409).json({ error: `User: ${username} or email: ${email} are already in use.` })
        })
})