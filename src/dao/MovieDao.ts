import Movie from '../entity/Movie';
export default interface MovieDao {
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
}