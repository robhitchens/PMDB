import {Request, Response} from "express";
import {Controller, Middleware, Get, Put, Post, Delete} from "@overnightjs/core";
import {Logger} from "@overnightjs/logger";
import {inject, injectable, named} from "inversify";
import MovieService from "../service/MovieService";
import TYPES from "../constants/TYPES";
import PMDBController from "./PMDBController";
import Movie from "../entity/Movie";

@Controller('movie')
@injectable()
export class MovieController implements PMDBController{//TODO not sure if this will work as expected, with DI
    private _movieService: MovieService;
    public constructor(
        @inject(TYPES.MovieService)
        @named(TYPES.MovieService)
            movieService: MovieService
    ){
        this._movieService = movieService;
    }

    @Get()
    private queryMovies(req: Request, res: Response){
        Logger.Info({"message": "Request Parameters", "req-query": req.query}, true);
        let queriedMovie: Movie = <Movie> (<any> req.query);//this seems a little hacky
        this._movieService
            .getMovies(queriedMovie)
                .then((movies: Array<Movie>) => {
                    Logger.Info(`Found ${movies.length} movie(s) matching query ${JSON.stringify(queriedMovie)}`);
                    res.status(200).json(movies);
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

    @Post('create')
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

    @Delete()
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