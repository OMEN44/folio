const { Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'server/folio.sqlite'
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    access: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const Timeline = sequelize.define('timeline',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        about: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["title", "date"]
            }
        ]
    }
)



User.sync().then(() => {
    console.log('User table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

Timeline.sync().then(() => {
    console.log('Timeline table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = { sequelize, User, Timeline };