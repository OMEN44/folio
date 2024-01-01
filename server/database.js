const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'server/folio.sqlite'
})

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

let db = null
let tablesCreated = false;


class DbHelper {
//constructor
    static getDbHelper() {
        db = new sqlite3.Database('server/folio.db', (err) => {
            if (err) console.error(err.message)
            else {
                console.log("Successfully connected to database!")
            }
        });
        createTables()
        console.log("init helper");
        return new DbHelper()
    }

    async addUser(userName, password, email, access)  {
        console.log("inserting")
        try {
            return await new Promise((resolve, reject) => {
                db.run(
                    `INSERT INTO users (username, access, password, email) VALUES (?, ?, ?, ?)`,
                    [userName, access, password, email],
                    (err) => {
                        if (err) reject(new Error(err.message))
                        else resolve('success')
                    }
                )}
            )
        } catch (e) {
            console.error(e)
            return false;
        }
    }

    getUser(userName) {
        db.all('select * from users where username = ?')
    }

    getUser(userName, email) {
        db.all('select')
    }

}

const createTables = async () => {
    try {
        await new Promise(async (resolve, reject) => {
            await db.run(`
                CREATE TABLE IF NOT EXISTS users(
                    id INTEGER PRIMARY KEY, 
                    username text not null unique, 
                    access integer not null, 
                    password text not null, 
                    email text not null unique
                );
                `).run(`
                CREATE TABLE IF NOT EXISTS timeline(
                    id INTEGER PRIMARY KEY, 
                    title text not null, 
                    date text not null,  
                    about text not null
                );
                `).run(`
                CREATE TABLE IF NOT EXISTS notes(
                    id INTEGER PRIMARY KEY, 
                    public bool default false not null, 
                    date text not null,  
                    author integer,
                    FOREIGN KEY (author) REFERENCES users (id)
                        ON DELETE CASCADE
                        ON UPDATE NO ACTION
                );
                `).run(`
                CREATE TABLE IF NOT EXISTS project_links(
                   project_id INTEGER,
                   note_id INTEGER,
                   PRIMARY KEY (project_id, note_id),
                   FOREIGN KEY (project_id) 
                      REFERENCES timeline (id) 
                         ON DELETE CASCADE 
                         ON UPDATE NO ACTION,
                   FOREIGN KEY (note_id) 
                      REFERENCES notes (id) 
                         ON DELETE CASCADE 
                         ON UPDATE NO ACTION
                );`)
            tablesCreated = true;
            resolve();
            console.log("finished promise")
        })
        return true;
    } catch (e) {
        console.error(e)
        return false;
    }
}

/*
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});*/

module.exports = DbHelper