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
    const authUser = checkUserData(req, res)
    if (authUser.valid && authUser.value.access < 3) {
        getAllNotes()
            .then(data => res.json({ success: true, value: data }))
            .catch(error => res.status(404).json({ success: false, error: error }))
    } else {
        getAllPublicNotes()
            .then(data => res.json({ success: true, value: data }))
            .catch(error => res.status(404).json({ success: false, error: error }))
    }
})

router.get('/public', (req, res) => {
    getAllPublicNotes()
        .then(data => res.json({ success: true, value: data }))
        .catch(error => res.status(404).json({ success: false, error: error }))
})

router.post('/update', (req, res) => {
    const authUser = checkUserData(req, res)
    if (authUser.valid && authUser.value.access < 2) {
        const { id, content, isPrivate } = req.body
        editNote(id, content, isPrivate)
            .then(() => res.json({ success: true }))
            .catch(error => {
                res.status(404).json({ success: false, error: error })
            })
    } else {
        res.status(401).json({ success: false, error: 'Access denied' })
    }
})

router.post('/create', (req, res) => {
    const authUser = checkUserData(req, res)
    if (authUser.valid && authUser.value.access < 2) {
        const { title } = req.body
        addNote(title, '# Title\nAdd some content', true, title, user.userId)
            .then(() => res.json({ success: true }))
            .catch(error => {
                console.log(error)
                res.status(404).json({ success: false, error: error })
            })
    } else {
        res.status(401).json({ success: false, error: 'Access denied' })
    }
})

router.post('/delete', (req, res) => {
    const authUser = checkUserData(req, res)
    if (authUser.valid && authUser.value.access < 2) {
        const { id } = req.body
        deleteNote(id)
            .then(() => res.json({ success: true }))
            .catch(error => {
                res.status(404).json({ success: false, error: error })
            })
    } else {
        res.status(401).json({ success: false, error: 'Access denied' })
    }
})