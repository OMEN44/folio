import express from 'express'
import jwt from 'jsonwebtoken'
import { checkUserData, secretKey } from '../server.js'
import {
    addUser,
    getUser,
    getUsers,
    updateUser
} from '../database.js'

const router = express.Router()
export default router

/*
User access levels:
0 - Super User: Super user access to everything and can propmote and demote other users
1 - Admin: Edit notes and timeline events
2 - Editor: Can view timeline and private notes but cannot edit them
3 - Nitwit: Can only view public sections of the site
*/

router.post('/', (req, res) => {
    const { username, password } = req.body;
    getUser(username, username).then(result => {
        if (result.length === 1) {
            if (result[0].password === password) {
                const token = jwt.sign({ userId: result[0].id, username: result[0].username, access: result[0].access }, secretKey, { expiresIn: '7d' });
                res.json({ token: token, id: result[0].id, name: result[0].username, access: result[0].access });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });

            }
        } else {
            res.status(401).json({ error: 'No user found' });
        }
    })
});

router.get('/', (req, res) => {
    const userData = checkUserData(req, res)
    if (!userData.valid) res.status(401).json({ success: false, error: 'Invalid token' })
    else
        res.json({
            "accessLevel": userData.value.access,
            "userId": userData.value.userId,
            "username": userData.value.username
        })
})

router.get('/all', (req, res) => {
    const userData = checkUserData(req, res)
    if (!userData.valid) res.status(401).json({ success: false, error: 'Invalid token' })
    else if (userData.value.access !== 0) res.status(401).json({ success: false, error: 'Access denied' })
    else {
        getUsers().then(response => {
            res.json({ success: true, value: response })
        })
    }
})

router.post('/register', (req, res) => {
    const { username, password, email } = req.body

    addUser(username, email, password, 3)
        .then(() => res.json({ success: true }))
        .catch(error => {
            if (error.name === 'SequelizeUniqueConstraintError')
                res.status(409).json({ error: `User: ${username} or email: ${email} are already in use.` })
        })
})

router.post('/update', (req, res) => {
    const userData = checkUserData(req, res)
    if (!userData.valid) res.status(401).json({ success: false, error: 'Invalid token' })
    else if (userData.value.access !== 0) res.status(401).json({ success: false, error: 'Access denied' })
    else {
        const { id, access } = req.body
        updateUser(id, access).then(response => {
            res.json({ success: true, value: response })
        })
            .catch(error => {
                res.json(error)
            })
    }
})