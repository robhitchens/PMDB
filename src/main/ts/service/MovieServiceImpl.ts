import MovieDao from "../dao/MovieDao";
import MovieService from "./MovieService";
import {inject, injectable} from "inversify";
import MovieEntity from "../entity/MovieEntity";
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

    getMovies(movie: MovieEntity): Promise<Array<MovieEntity>> {//TODO should really separate database and domain layers better.
        return this._movieDao.findMovies(movie);//NOTE: using movie class here like query. need to see if this will actually work. probably not like I expect it to.
    }

    getMovieByTitle(title: string): Promise<MovieEntity> {
        return this._movieDao.findMovieByTitle(title);
    }
//TODO so far this class just sits in front of the movieservice
    save(movie: MovieEntity): Promise<MovieEntity> {
        return this._movieDao.create(movie);
    }

    async update(movie: MovieEntity): Promise<MovieEntity> {
        try {
           let savedMovie: MovieEntity = await this._movieDao.findMovieById(movie._id);
           if(savedMovie){
               savedMovie._persisted = false;
               return await this._movieDao.update(movie);
           }else{//TODO not sure what todo here
               return null;
           }
        }catch (err){
            throw err;
        }
    }

    delete(movie: MovieEntity): Promise<boolean> {
        return this._movieDao.delete(movie);
    }
}