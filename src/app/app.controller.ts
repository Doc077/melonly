import { Controller, Get, Request, Response, ViewResponse } from '@melonly/core'

@Controller()
export class AppController {
    constructor(
        private readonly request: Request,
        private readonly response: Response,
    ) {}

    @Get('/')
    public index(): ViewResponse {
        return this.response.render('home', {
            message: 'Hello World',
        })
    }
}
