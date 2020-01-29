import MovieEntity from "../entity/MovieEntity";

export default interface MovieService{
    getMovieByTitle(title: string): Promise<MovieEntity>;
    getMovies(movie: MovieEntity): Promise<Array<MovieEntity>>;
    save(movie: MovieEntity): Promise<MovieEntity>;
    update(movie: MovieEntity): Promise<MovieEntity>;
    delete(movie: MovieEntity): Promise<boolean>;
}