import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import Router from './routes'
import dbConfig from './service-config/database'

const PORT = process.env.PORT || 8000

const app: Application = express()

// Por culpa de las imagenes en base 64, necesitamos subir este limit
app.use(express.json({ limit: '50mb' }))
app.use(morgan('tiny'))
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.static('public'))

app.use(Router)

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT)
    })
  })
  .catch((err) => {
    console.log('Unable to connect to db', err)
    process.exit(1)
  })
