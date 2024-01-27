import express from 'express'
import { checkAccess } from '../server.js'
import {
    getTimelineData,
    addTimelineEvent,
    deleteTimelineEvent
} from '../database.js'

const router = express.Router()
export default router

router.get('/', (req, res) => {
    getTimelineData()
        .then((data) => res.json({ message: 'success', value: data }))
        .catch(error => res.status(404).json({ message: 'Could not access timeline data', error: error }))
})

router.post('/', (req, res) => {
    const { title, about, date } = req.body

    if (checkAccess(req, res).access !== 0) {
        res.status(401).json({ error: 'You do not have permission to create Timeline Events.' })
    }

    addTimelineEvent(title, date, about)
        .then(() => res.json({ message: 'Success' }))
        .catch(error => {
            if (error.name === 'SequelizeUniqueConstraintError')
                res.status(409).json({ error: `Event with this title and time already exist` })
            else
                res.status(409).json({ error: error.message })
        })
})

router.post('/delete', (req, res) => {
    if (checkAccess(req, res).access === 0) {
        const { id } = req.body
        deleteTimelineEvent(id)
            .then(() => res.json({ message: 'Success' }))
            .catch(error => {
                res.status(404).json({ message: `Event not found`, error: error })
            })
    }
})