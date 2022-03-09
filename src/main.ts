import { createApp } from '@melonly/core'
import { AppController } from './app/app.controller'

const app = createApp()

app.registerControllers([
    AppController,
])

app.start()
