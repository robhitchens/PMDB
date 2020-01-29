import MovieEntity from '../entity/MovieEntity';
export default interface MovieDao {
    findMovies(movie: MovieEntity): Promise<Array<MovieEntity>>;

    findMovieByTitle(title: string): Promise<MovieEntity>;
    findMoviesMatchingTitle(title: string): Promise<Array<MovieEntity>>;
    findMoviesByGenre(genre: string): Promise<Array<MovieEntity>>;
    findMoviesCloseToRunningTime(runningTime: string): Promise<Array<MovieEntity>>;//TODO placeholder input type.
    findMoviesByFormat(format: string): Promise<Array<MovieEntity>>;
    findMoviesByFormats(format: Array<string>): Promise<Array<MovieEntity>>;
    findMoviesBySource(source: string): Promise<Array<MovieEntity>>;
    findMoviesFeaturingActor(actor: string): Promise<Array<MovieEntity>>;
    findMoviesWithActors(actors: Array<string>): Promise<Array<MovieEntity>>;
    findMoviesWithAudioFormats(audioFormats: Array<string>): Promise<Array<MovieEntity>>;
    findMovieById(id: string): Promise<MovieEntity>;

    create(movie: MovieEntity): Promise<MovieEntity>;
    update(movie: MovieEntity): Promise<MovieEntity>;
    delete(movie: MovieEntity): Promise<boolean>;//todo may just return boolean for successful deletion.

    getOnlyCachedMovies(): Promise<Array<MovieEntity>>;
}