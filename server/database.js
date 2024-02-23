import { Op } from 'sequelize'
import { sequelize, Notes, User, Timeline } from './databaseConfig.js'

export const addImage = (title, data) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await images.create({
                title: title,
                data: data
            }))
        }).catch(error => {
            reject(error)
        })
    }
    )
}

export const getImage = (id) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await images.findByPk(id))
        }).catch((error) => reject(error))
    });
}



export const addUser = (username, email, password, access) => {
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

export const getUser = (username, email) => {
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

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await User.findAll({
                raw: true,
                attributes: ['id', 'username', 'email', 'access']
            }))
        }).catch((error) => reject(error))
    })
}

export const updateUser = (id, access) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            const user = await User.findByPk(id)
            user.access = access
            resolve(await user.save())
        }).catch((error) => reject(error))
    })
}

export const addTimelineEvent = (title, date, about, note) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await Timeline.create({
                title: title,
                date: date,
                about: about,
                noteId: note
            }))
        }).catch(error => {
            reject(error)
        })
    }
    )
}

export const getTimelineData = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await Timeline.findAll({
                raw: true
            }))
        }).catch((error) => reject(error))
    })
}

export const deleteTimelineEvent = (id) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await Timeline.destroy({ where: { id: id } }))
        }).catch(error => reject(error))
    })
}

export const getAllNotes = () => {
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
export const getAllPublicNotes = () => {
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

export const addNote = (title, content, access, route, author) => {
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

export const editNote = (id, content, isPrivate) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            const note = await Notes.findByPk(id)
            note.content = content
            note.private = isPrivate
            resolve(await note.save())
        }).catch(error => {
            reject(error)
        })
    }
    )
}

export const deleteNote = (id) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await Notes.destroy({ where: { id: id } }))
        }).catch(error => reject(error))
    })
}