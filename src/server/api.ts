import { remultExpress } from 'remult/remult-express'
import { createKnexDataProvider } from "remult/remult-knex"
import { Account } from '../shared/Acount'
import { Image } from '../shared/Image'
import { Note } from '../shared/Note'
import { NoteFolder } from '../shared/NoteFolder'
import { Spotlight } from '../shared/Spotlight'
import { Timeline } from '../shared/Timeline'

export const api = remultExpress({
    dataProvider: createKnexDataProvider({
        client: 'sqlite3',
        connection: {
            filename: './portfolio.sqlite'
        },
        useNullAsDefault: true
    }),
    admin: true,
    entities: [
        Account,
        Image,
        Note,
        NoteFolder,
        Spotlight,
        Timeline
    ]
})