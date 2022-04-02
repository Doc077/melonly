import { createApp } from '@melonly/core'
import { AppController } from './modules/app.controller'

const app = createApp()

app.registerControllers([
  AppController,
])

app.start()
