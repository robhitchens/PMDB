import MovieDao from "../dao/MovieDao";
import MovieService from "./MovieService";
import {inject, injectable} from "inversify";
import Movie from "../entity/Movie";
import TYPES from "../constants/TYPES";

//TODO this doesn't really do anything more than the dao right now, but it will in future. maybe.
@injectable()
export default class MovieServiceImpl implements MovieService{
    private _movieDao: MovieDao;
    public constructor(//TODO might try to find a better way without requiring types constant to be updated for interface
        @inject(TYPES.MovieDao) movieDao: MovieDao
    ){
        this._movieDao = movieDao;
    }

    getMovieByTitle(title: string): Movie {
        return this._movieDao.findMovieByTitle(title);
    }


}