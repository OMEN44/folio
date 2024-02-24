import { Sequelize, DataTypes } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'folio.sqlite',
    logging: false
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export const User = sequelize.define('user', {
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

export const Timeline = sequelize.define('timeline',
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


export const Notes = sequelize.define('notes',
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
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        private: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        route: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

Timeline.belongsTo(Notes)
Notes.hasOne(Timeline)

User.hasMany(Notes)
Notes.belongsTo(User)

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

Notes.sync().then(() => {
    console.log('Notes table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
