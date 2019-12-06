import MovieServiceImpl from "../../src/service/MovieServiceImpl";
import MovieService from "../../src/service/MovieService";
import MovieDao from "../../src/dao/MovieDao";
import {mocked} from "ts-jest/utils";
import Movie from "../../src/entity/Movie";
jest.mock('../../src/dao/MovieDao');

let movieService: MovieService;
let mockMovieDao: MovieDao;

beforeAll(() => {
    movieService = new MovieServiceImpl(mockMovieDao);//Note: constructor based dependency injection.
});
afterEach(() => {
    jest.clearAllMocks();
});
describe('When searching for a movie by title.', () => {
   it('returns a rejected promise', () => {
       //TODO need to figure out how to use ts-jest mocked. and mocking moviedao functions.
       let testErrorMessage: string = 'Test error';
       mockMovieDao.findMovieByTitle = jest.fn().mockImplementationOnce(() => {
           return Promise.reject(new Error(testErrorMessage));
       });
       let errorThrown: boolean = false;
       movieService.getMovieByTitle("Bones")
           .catch((err: Error) => {
               errorThrown = true;
               expect(err.message).toEqual(testErrorMessage);
           }).finally(() => {
               expect(errorThrown).toEqual(true);
       });
   });
});