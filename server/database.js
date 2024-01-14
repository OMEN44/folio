const {Op} = require('sequelize')
const {sequelize, Notes, User, Timeline} = require('./databaseConfig')

const addUser = (username, email, password, access) => {
    return new Promise((resolve, reject) => {
            sequelize.sync().then(async () => {
                resolve(await User.create({
                    username: username,
                    email: email,
                    password: password,
                    access: access
                }))
            }).catch(error => {
                reject(error)
            })
        }
    )
}

const getUser = (username, email) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await User.findAll({
                raw: true,
                where: {
                    [Op.or]: {
                        username: username,
                        email: email
                    }
                }
            }))
        }).catch((error) => reject(error))
    })
}

const addTimelineEvent = (title, date, about) => {
    return new Promise((resolve, reject) => {
            sequelize.sync().then(async () => {
                resolve(await Timeline.create({
                    title: title,
                    date: date,
                    about: about
                }))
            }).catch(error => {
                reject(error)
            })
        }
    )
}

const getTimelineData = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await Timeline.findAll({
                raw: true
            }))
        }).catch((error) => reject(error))
    })
}

const deleteTimelineEvent = (id) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await Timeline.destroy({ where: { id: id }}))
        }).catch(error => reject(error))
    })
}

const getAllNotes = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await Notes.findAll({
                raw: true,
                order: [
                    ['title', 'ASC']
                ],
                include: User
            }))
        }).catch((error) => reject(error))
    })
}
const getAllPublicNotes = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await Notes.findAll({
                raw: true,
                where: {
                    private: false
                },
                order: [
                    ['title', 'ASC']
                ],
                include: User
            }))
        }).catch((error) => reject(error))
    })
}

const addNote = (title, content, access, route, author) => {
    return new Promise((resolve, reject) => {
            sequelize.sync().then(async () => {
                resolve(await Notes.create({
                    title: title,
                    content: content,
                    private: access,
                    route: route,
                    userId: author
                }))
            }).catch(error => {
                reject(error)
            })
        }
    )
}

const editNote = (id, title, content, access) => {
    return new Promise((resolve, reject) => {
            sequelize.sync().then(async () => {
                const note = await Notes.findByPk(id)
                note.title = title
                note.content = content
                note.access = access
                resolve(await note.save())
            }).catch(error => {
                reject(error)
            })
        }
    )
}

module.exports = {
    addUser,
    getUser,
    addTimelineEvent,
    getTimelineData,
    deleteTimelineEvent,
    getAllNotes,
    getAllPublicNotes,
    addNote,
    editNote
}