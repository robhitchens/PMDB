import Movie from '../entity/Movie';
export default interface MovieDao {
    findMovies(movie: Movie): Promise<Array<Movie>>;

    findMovieByTitle(title: string): Promise<Movie>;
    findMoviesMatchingTitle(title: string): Promise<Array<Movie>>;
    findMoviesByGenre(genre: string): Promise<Array<Movie>>;
    findMoviesCloseToRunningTime(runningTime: string): Promise<Array<Movie>>;//TODO placeholder input type.
    findMoviesByFormat(format: string): Promise<Array<Movie>>;
    findMoviesByFormats(format: Array<string>): Promise<Array<Movie>>;
    findMoviesBySource(source: string): Promise<Array<Movie>>;
    findMoviesFeaturingActor(actor: string): Promise<Array<Movie>>;
    findMoviesWithActors(actors: Array<string>): Promise<Array<Movie>>;
    findMoviesWithAudioFormats(audioFormats: Array<string>): Promise<Array<Movie>>;
    findMovieById(id: string): Promise<Movie>;

    create(movie: Movie): Promise<Movie>;
    update(movie: Movie): Promise<Movie>;
    delete(movie: Movie): Promise<boolean>;//todo may just return boolean for successful deletion.
}