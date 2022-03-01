import { App } from '@melonly/core'
import { AppController } from './app/app.controller'

const app = App.createApp()

app.registerControllers([
    AppController,
])
