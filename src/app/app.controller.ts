import { Controller, Get, Request, Response, ViewResponse } from '@melonly/core'

@Controller()
export class AppController {
  constructor(private request: Request, private response: Response) {}

  @Get('/')
  public index(): ViewResponse {
    return this.response.render('home', {
      message: 'Hello World',
    })
  }

  @Get('/session')
  public test(): string {
    return this.request.session.username ?? 'username not set in session'
  }
}
