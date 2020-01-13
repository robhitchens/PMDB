import PMDBController from "./PMDBController";
import {Controller, Get} from "@overnightjs/core";
import {injectable} from "inversify";
import {Request, Response} from "express";

@Controller('')
@injectable()
export class ViewController implements PMDBController{
    constructor() {
        //TODO autowire dependencies as needed.
    }
    //TODO need to add middleware for auth and redirection based on auth
    @Get()
    private getHomeView(req: Request, res: Response){

    }
}