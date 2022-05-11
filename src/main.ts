import { createAppServer } from '@melonly/core'
import { AppController } from './controllers/app.controller'

const server = createAppServer()

server.registerControllers([
  AppController,
])

server.start(__dirname)
