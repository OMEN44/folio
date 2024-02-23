

import express from 'express'
import { checkUserData } from '../server.js'


const router = express.Router()
export default router


router.post('/upload', (req, res) => {
    const authUser = checkUserData(req, res)
    if (authUser.valid && authUser.value.access < 2) {
        const { title, data } = req.body
        addImage(title, data)
            .then(() => res.json({ success: true }))
            .catch(error => {
                console.log(error)
                res.status(404).json({ success: false, error: error })
            })
    } else {
        res.status(401).json({ success: false, error: 'Access denied' })
    }
})

router.get("/:id", (req, res) => {
    getImage(req.params.id)
        .then(data => res.json({ success: true, value: data }))
        .catch(error => res.status(404).json({ success: false, error: error }))
})