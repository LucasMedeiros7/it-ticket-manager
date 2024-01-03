import express from 'express'
import { registerRoutes } from './infra/Routes'

const app = express()

app.use(express.json())
registerRoutes(app)

export { app }
