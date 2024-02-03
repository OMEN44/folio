import express from 'express'
import { checkUserData } from '../server.js'
import {
    getAllNotes,
    getAllPublicNotes,
    addNote,
    editNote,
    deleteNote
} from '../database.js'

const router = express.Router()
export default router

router.get('', (req, res) => {
    if (checkUserData(req, res).access < 2) {
        getAllNotes()
            .then(data => res.json({ message: 'success', value: data }))
            .catch(error => res.status(404).json({ message: 'Could not access timeline data', error: error }))
    } else {
        getAllPublicNotes()
            .then(data => res.json({ message: 'success', value: data }))
            .catch(error => res.status(404).json({ message: 'Could not access timeline data', error: error }))
    }
})

router.get('/public', (req, res) => {
    getAllPublicNotes()
        .then(data => res.json({ message: 'success', value: data }))
        .catch(error => res.status(404).json({ message: 'Could not access timeline data', error: error }))
})

router.post('/update', (req, res) => {
    if (checkUserData(req, res).access < 2) {
        const { id, content, isPrivate } = req.body
        editNote(id, content, isPrivate)
            .then(() => res.json({ message: 'Success' }))
            .catch(error => {
                res.status(404).json({ message: `Note not found`, error: error })
            })
    } else {
        res.status(401).json({ error: 'User not logged in' })
    }
})

router.post('/create', (req, res) => {
    const user = checkUserData(req, res)
    if (user.access < 2) {
        const { title } = req.body
        addNote(title, '# Title\nAdd some content', true, title, user.userId)
            .then(() => res.json({ message: 'Success' }))
            .catch(error => {
                console.log(error)
                res.status(404).json({ message: `Unable to create`, error: error })
            })
    } else {
        res.status(401).json({ error: 'User not logged in' })
    }
})

router.post('/delete', (req, res) => {
    if (checkUserData(req, res).access < 2) {
        const { id } = req.body
        deleteNote(id)
            .then(() => res.json({ message: 'Success' }))
            .catch(error => {
                res.status(404).json({ message: `Note not found`, error: error })
            })
    } else {
        res.status(401).json({ error: 'User not logged in' })
    }
})