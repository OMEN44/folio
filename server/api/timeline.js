app.get('/api/timeline', (req, res) => {
    getTimelineData()
        .then((data) => res.json({message: 'success', value: data}))
        .catch(error => res.status(404).json({message: 'Could not access timeline data', error: error}))
})

app.post('/api/timeline', (req, res) => {
    const { title, about, date } = req.body

    addTimelineEvent(title, date, about)
        .then(() => res.json({ message: 'Success' }))
        .catch(error => {
            console.log(error)
            if (error.name === 'SequelizeUniqueConstraintError')
                res.status(409).json({error: `Event with this title and time already exist`})
        })
})

app.post('/api/timeline/delete', (req, res) => {
    if (checkAccess(req, res).access === 0) {
        const {id} = req.body
        deleteTimelineEvent(id)
            .then(() => res.json({ message: 'Success' }))
            .catch(error => {
                res.status(404).json({message: `Event not found`, error: error})
            })
    }
})