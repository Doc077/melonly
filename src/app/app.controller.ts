import { Controller, Get, RenderResponse, Request, Response } from '@melonly/core'

@Controller()
export class AppController {
  constructor(private request: Request, private response: Response) {}

  @Get('/')
  public index(): RenderResponse {
    return this.response.render('home', {
      message: 'Hello World',
    })
  }
}
