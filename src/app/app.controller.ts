import { Controller, Get, RenderResponse, Request, Response } from '@melonly/core'
import { User } from './users/user.model'

@Controller()
export class AppController {
  constructor(private request: Request, private response: Response) {}

  @Get('/')
  public index(): RenderResponse {
    const users = User.select().where('name', 'like', `%name%`).where('email', '>', 'a').orWhere('age', '=', 20).fetch()

    return this.response.render('home', {
      message: 'Hello World',
    })
  }
}
