import Movie from '../entity/Movie';
export default interface MovieDao {
    findMovieByTitle(title: string): Movie;
    findMoviesMatchingTitle(title: string): Array<Movie>;
    findMoviesByGenre(genre: string): Array<Movie>;
    findMoviesCloseToRunningTime(runningTime: string): Array<Movie>;//TODO placeholder input type.
    findMoviesByFormat(format: string): Array<Movie>;
    findMoviesByFormats(format: Array<string>): Array<Movie>;
    findMoviesBySource(source: string): Array<Movie>;
    findMoviesFeaturingActor(actor: string): Array<Movie>;
    findMoviesWithActors(actors: Array<string>): Array<Movie>;
    findMoviesWithAudioFormat(audioFormat: string): Array<Movie>;
    findMoviesWithAudioFormats(audioFormats: Array<string>): Array<Movie>;
}