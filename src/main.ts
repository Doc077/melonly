import { createServer } from '@melonly/core'
import { AppController } from './controllers/app.controller'

const server = createServer({
  controllers: [
    AppController,
  ],
})

server.start(__dirname)
