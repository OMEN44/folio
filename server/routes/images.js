

import express from 'express'
import { checkUserData } from '../server.js'
import { addImage, getImage } from '../database.js'


const router = express.Router()
export default router


router.post('/upload', (req, res) => {
    const authUser = checkUserData(req, res)
    if (authUser.valid && authUser.value.access < 2) {
        const { data } = req.body
        addImage(data)
            .then((img) => res.json({ success: true, id: img.id }))
            .catch(error => {
                console.log(error)
                res.status(404).json({ success: false, error: error })
            })
    } else {
        res.status(401).json({ success: false, error: 'Access denied' })
    }
})

router.get("/:id", async (req, res) => {
    try {
        console.log("test")
        const image = await getImage(parseInt(req.params.id))
        var img = Buffer.from(image.data.toString(), 'base64');
        res.writeHead(200, {
            'Content-Type': getMimeType(image.data.toString()),
            'Content-Length': img.length
        });
        res.end(img);
    } catch (error) {
        console.error(error)
        res.status(404).json({ success: false, error: error })
    }
})

const getMimeType = (base64String) => {
    const mimeType = base64String.substring(base64String.indexOf('data:') + 5, base64String.indexOf(';'));
    return mimeType;
};

