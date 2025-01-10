import 'dotenv/config'
import cors from 'cors'
import http from 'http'
import helmet from 'helmet'
import express from 'express'
import router from './router/router'
import compression from 'compression'
import { Borgen, Logger } from 'borgen'
import cookieParser from 'cookie-parser'

const app = express()

const server = http.createServer(app)

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)

app.use(helmet())
app.use(Borgen({}))
app.use(compression())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

const startServer = async () => {
  server.listen(8001, () => {
    Logger.info({
      message: `Server is listening on port 8001`,
      messageColor: 'greenBright',
      infoColor: 'whiteBright',
    })
  })
}

startServer()
