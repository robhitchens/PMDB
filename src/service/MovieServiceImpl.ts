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

    getMovieByTitle(title: string): Promise<Movie> {
        return this._movieDao.findMovieByTitle(title);
    }
//TODO so far this class just sits in front of the movieservice
    save(movie: Movie): Promise<Movie> {
        return this._movieDao.create(movie);
    }

    async update(movie: Movie): Promise<Movie> {
        try {
           let savedMovie: Movie = await this._movieDao.findMovieById(movie._id);
           if(savedMovie){
               return await this._movieDao.update(movie);
           }else{//TODO not sure what todo here
               return null;
           }
        }catch (err){
            throw err;
        }
    }

    delete(movie: Movie): Promise<boolean> {
        return this._movieDao.delete(movie);
    }
}