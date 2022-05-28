import { Controller, render, RenderResponse, Request, Response, Route } from '@melonly/core'

@Controller()
export class AppController {
  constructor(private request: Request, private response: Response) { }

  @Route.get('/')
  public index(): RenderResponse {
    return render('home', {
      message: 'Hello World',
    })
  }
}
