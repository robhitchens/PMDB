import {Request, Response} from "express";
import {Controller, Middleware, Get, Put, Post, Delete} from "@overnightjs/core";
import {Logger} from "@overnightjs/logger";
import {inject, injectable, named} from "inversify";
import MovieService from "../service/MovieService";
import TYPES from "../constants/TYPES";
import PMDBController from "./PMDBController";
import Movie from "../entity/Movie";
import {container} from "../configuration/ContainerConfig";

@Controller('movie')
@injectable()
export class MovieController implements PMDBController{//TODO not sure if this will work as expected, with DI
    private _movieService: MovieService;
    public constructor(
        @inject(TYPES.MovieService) @named(TYPES.MovieService) movieService: MovieService
    ){
        this._movieService = movieService;
        //this._movieService = container.getNamed<MovieService>(TYPES.MovieService, TYPES.MovieService);
    }

    @Get('test')
    private test(req: Request, res: Response){
        res.status(200).json({message: 'working'});
    }

    @Get(':movie')
    private getMovie(req: Request, res: Response){
        Logger.Info(req.params.movie);
        this._movieService.getMovieByTitle(req.params.movie)
                .then((movie: Movie) => {
                    Logger.Info(`Requested movie ${JSON.stringify(movie)}`);
                    res.status(200).json(movie);
                })
                .catch((err: Error) => {
                    Logger.Err(err, true);
                    res.status(500).json({error: err.message});
                });
    }

    /*@Put(':id')//TODO this path should be used for updating an entity?
    private putMovie(req: Request, res: Response){
        Logger.Info(req.params.id);
        res.status(400).json({
            error: req.params.movie
        });
    }*/

    @Post()//TODO this request would be creating a new movie
    private postMovie(req: Request, res: Response){
        Logger.Info(req, true);
        let newMovie: Movie = <Movie> req.body;
        this._movieService.save(newMovie)
            .then((savedMovie) => {
                res.status(200).json(savedMovie);
            })
            .catch((err) => {
                Logger.Err(err, true);
                res.status(500).json({error: err.message});
            });
    }

    @Post('update')
    private updateMovie(req: Request, res: Response){
        let movieToUpdate: Movie = <Movie> req.body;
        this._movieService.update(movieToUpdate)
            .then(updatedMovie => {
                res.status(200).json(updatedMovie);
            })
            .catch(err => {
                Logger.Err(err, true);
                res.status(500).json({error: err.message});
            });
    }

    @Delete(':movie')
    private delMovie(req: Request, res: Response){
        let movieToDelete: Movie = <Movie> req.body;
        this._movieService.delete(movieToDelete)
            .then(result => {
                let response: any = {
                    message: (result)
                        ?`Movie was successfully removed from database`
                        :`Movie may have already been deleted. Unable to find id ${movieToDelete._id}`
                };
                res.status(200).json(response);
            })
            .catch(err => {
                Logger.Err(err, true);
                res.status(500).json({error: err.message});
            });
    }
}