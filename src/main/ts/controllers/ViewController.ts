import PMDBController from "./PMDBController";
import {injectable} from "inversify";
import {Controller, Get} from "@overnightjs/core";
import {Request, Response} from "express";
import {Logger} from "@overnightjs/logger";
import {indexView} from "../constants/VIEWS";

@Controller('')//Root path
@injectable()
export class ViewController implements PMDBController {
    public constructor() {
    }

    @Get()
    private getIndexView(req: Request, res: Response){
        Logger.Info(`Received Request for index view`);
        Logger.Info(`Rendering Index view`);
        res.render(indexView);
    }
}