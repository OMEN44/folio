const {Sequelize, DataTypes, Op} = require('sequelize')
const {sequelize, User, Timeline} = require('./databaseConfig')

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
        }).catch((error) => console.log('Failed to synchronize with the database:', error))
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
        }).catch((error) => console.log('Failed to synchronize with the database:', error))
    })
}

const deleteTimelineEvent = (id) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(async () => {
            resolve(await Timeline.destroy({ where: { id: id }}))
        }).catch(error => reject(error))
    })
}

module.exports = {addUser, getUser, addTimelineEvent, getTimelineData, deleteTimelineEvent}