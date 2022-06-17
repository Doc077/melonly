import { createServer } from '@melonly/core'
import { AppController } from './controllers/app.controller'

const server = createServer({
  controllers: [
    AppController,
  ],
  channels: [],
})

server.start(__dirname)
