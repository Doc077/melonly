import { callController } from '@melonly/core'
import { AppController } from '../src/app/app.controller'

test('assert app controller returns a valid response', () => {
  const response = callController(AppController, 'index')

  expect(response).toBe('Home page')
})
