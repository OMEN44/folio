const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('server/folio.db', (err) => {
    if (err) console.error(err.message)
    else console.log("Successfully connected to database!")
})

const addUser = (userName, password, email, access) => {
  
}

db.run(`
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY, 
    username text not null, 
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
);

`, (err) => {
    if (err) console.error(err.message)
})

/*
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});*/
