import Movie from '../entity/Movie';
export default interface MovieDao {
    findMovieByTitle(title: string): Movie;
}