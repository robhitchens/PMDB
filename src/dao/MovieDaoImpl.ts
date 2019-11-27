import Movie from "../entity/Movies";
import MovieDao from "./MovieDao";

export default class MovieDaoImpl implements MovieDao{
    private dummyMovie: Movie;
    constructor(){
        this.dummyMovie = new Movie();
        this.dummyMovie.title = "Bones";
    }
    public findMovieByTitle(title: string): Movie{
        if(title === this.dummyMovie.title){
            return this.dummyMovie;
        }
        throw new Error(`Movie with title ${title} not found`);
    }
}