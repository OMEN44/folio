import express from 'express'
import { checkUserData } from '../server.js'
import {
    getTimelineData,
    addTimelineEvent,
    deleteTimelineEvent
} from '../database.js'

const router = express.Router()
export default router

router.get('/', (req, res) => {
    getTimelineData()
        .then((data) => res.json({ success: true, value: data }))
        .catch(error => res.status(404).json({ success: false, error: error }))
})

router.post('/create', (req, res) => {
    const { title, about, date, noteId } = req.body

    const authUser = checkUserData(req, res)
    if (authUser.valid && authUser.value.access < 2) {
        addTimelineEvent(title, date, about, noteId)
            .then(() => res.json({ success: true }))
            .catch(error => {
                if (error.name === 'SequelizeUniqueConstraintError')
                    res.status(409).json({ success: false, error: `Event with this title and time already exist` })
                else
                    res.status(409).json({ success: false, error: error.message })
            })
    } else {
        res.status(401).json({ success: false, error: 'Access denied' })
    }
})

router.post('/delete', (req, res) => {
    const authUser = checkUserData(req, res)
    if (authUser.valid && authUser.value.access < 2) {
        const { id } = req.body
        deleteTimelineEvent(id)
            .then(() => res.json({ success: true }))
            .catch(error => {
                res.status(404).json({ success: false, error: error })
            })
    } else {
        res.status(401).json({ success: false, error: 'Access denied' })
    }
})