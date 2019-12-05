import Movie from "../entity/Movie";

export default interface MovieService{
    getMovieByTitle(title: string): Promise<Movie>;
    getMovies(movie: Movie): Promise<Array<Movie>>;
    save(movie: Movie): Promise<Movie>;
    update(movie: Movie): Promise<Movie>;
    delete(movie: Movie): Promise<boolean>;
}