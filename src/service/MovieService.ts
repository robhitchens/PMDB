import Movie from "../entity/Movie";

export default interface MovieService{
    getMovieByTitle(title: string): Promise<Movie>;
    save(movie: Movie): Promise<Movie>;
}