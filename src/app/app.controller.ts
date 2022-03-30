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
  public sessionTest(): string {
    // dodawanie zmiennych do sesji
    this.request.setSession('username', 'michał')

    // czyszczenie sesji
    //this.request.deleteSession()

    // pobieranie z sesji
    return this.request.session.username
  }
}
