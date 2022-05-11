import { createAppServer } from '@melonly/core'
import { AppController } from './app/app.controller'

const server = createAppServer()

server.registerControllers([
  AppController,
])

server.start(__dirname)
