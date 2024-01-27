import express from 'express'
import { checkAccess } from '../server.js'
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
    if (checkAccess(req, res).access === 0) {
        getAllNotes()
            .then(data => res.json({ message: 'success', value: data }))
            .catch(error => res.status(404).json({ message: 'Could not access timeline data', error: error }))
    } else {
        getAllPublicNotes()
            .then(data => res.json({ message: 'success', value: data }))
            .catch(error => res.status(404).json({ message: 'Could not access timeline data', error: error }))
    }
})

router.post('/update', (req, res) => {
    if (checkAccess(req, res).access === 0) {
        const { id, content, access } = req.body
        editNote(id, content, access)
            .then(() => res.json({ message: 'Success' }))
            .catch(error => {
                res.status(404).json({ message: `Note not found`, error: error })
            })
    } else {
        res.status(401).json({ error: 'User not logged in' })
    }
})

router.post('/create', (req, res) => {
    const user = checkAccess(req, res)
    if (user.access === 0) {
        const { title, access } = req.body
        addNote(title, '# Title\nAdd some content', access, title, user.userId)
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
    if (checkAccess(req, res).access === 0) {
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