import Movie from '../entity/Movies';
export default interface MovieDao {
    findMovieByTitle(title: string): Movie;
}