import {Request, Response} from "express";
import {Controller, Middleware, Get, Put, Post, Delete} from "@overnightjs/core";
import {Logger} from "@overnightjs/logger";

@Controller('movie')
export class MovieController{

    @Get(':movie')
    private getMovie(req: Request, res: Response){
        Logger.Info(req.params.movie);
        res.status(200).json({
           message: req.params.movie,
        });
    }

    @Put(':movie')
    private putMovie(req: Request, res: Response){
        Logger.Info(req.params.movie);
        res.status(400).json({
            error: req.params.movie
        });
    }

    @Post(':movie')
    private postMovie(req: Request, res: Response){
        Logger.Info(req.params.movie);
        return res.status(400).json({
            error: req.params.movie
        });
    }

    @Delete(':movie')
    private delMovie(req: Request, res: Response){
        try{
            throw new Error(req.params.movie);
        }catch (err) {
            Logger.Err(err, true);
            return res.status(400).json({
                error: req.params.movie
            });
        }
    }
}