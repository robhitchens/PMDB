import MovieServiceImpl from "../../src/service/MovieServiceImpl";
import MovieService from "../../src/service/MovieService";
import MovieDao from "../../src/dao/MovieDao";
import {mocked} from "ts-jest/utils";
jest.mock('../../src/dao/MovieDao');

let movieService: MovieService;
let mockMovieDao: MovieDao;

beforeAll(() => {
    movieService = new MovieServiceImpl(mockMovieDao);//Note constructor based dependency injection.
});
afterEach(() => {
    jest.clearAllMocks();
});
describe('When searching for a movie by title.', () => {
   it('', () => {
       //TODO need to figure out how to use ts-jest mocked. and mocking moviedao functions.
       movieService.getMovieByTitle("Bones");
   });
});