const express = require('express')
const sqlite3 = require('sqlite3')
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors);

const db = new sqlite3.Database('server/folio.db')

app.get('/', (req, res) => {
    res.send("Server side listening!!");
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})