import Movie from "../entity/Movies";

export default interface MovieService{
    getMovieByTitle(title: string): Movie;
}