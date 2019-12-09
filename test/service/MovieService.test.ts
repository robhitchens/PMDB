import MovieServiceImpl from "../../src/service/MovieServiceImpl";
import MovieService from "../../src/service/MovieService";
import MovieDao from "../../src/dao/MovieDao";
import BonesMovie from "../temp/BonesMovie";
import {mocked} from "ts-jest/utils";
import Movie from "../../src/entity/Movie";
import bones from "../temp/BonesMovie";
jest.mock('../../src/dao/MovieDao');

let movieService: MovieService;
let mockMovieDao: MovieDao;

beforeAll(() => {
    movieService = new MovieServiceImpl(mockMovieDao);//Note: constructor based dependency injection.
});
afterEach(() => {
    jest.clearAllMocks();
});
describe('When searching for a movie by title', () => {
   it('returns a rejected promise', () => {
       //TODO need to figure out how to use ts-jest mocked. and mocking moviedao functions.
       let testErrorMessage: string = 'Test error';
       mocked(mockMovieDao.findMovieByTitle)
           .mockImplementationOnce(() => {
           return Promise.reject(new Error(testErrorMessage));
       });
       let errorThrown: boolean = false;
       movieService.getMovieByTitle("Bones")
           .catch((err: Error) => {
               errorThrown = true;
               expect(mockMovieDao.findMovieByTitle).toHaveBeenCalled();
               expect(mockMovieDao.findMovieByTitle).toHaveBeenCalledTimes(1);
               expect(err.message).toEqual(testErrorMessage);
           }).finally(() => {
               expect(errorThrown).toBe(true);
       });
   });
   it('should return the requested movie', () => {
        mocked(mockMovieDao.findMovieByTitle)
            .mockImplementationOnce((title: string) => {
            if(title === bones.title) {
                return Promise.resolve(bones);
            }else{
                return Promise.reject(`title: ${title} no exist`);
            }
        });
        movieService.getMovieByTitle("Bones")
            .then((result) => {
                expect(mockMovieDao.findMovieByTitle).toHaveBeenCalled();
                expect(mockMovieDao.findMovieByTitle).toHaveBeenCalledTimes(1);
                expect(result).not.toBeNull();
                expect(result).toEqual(bones);
            }).catch((err) => {//Note: error shouldn't be thrown here.
                expect(err).toBeNull();
        });
   });
   afterEach(() => {
       mocked(mockMovieDao.findMovieByTitle).mockClear();
   });
});

describe('When getting all movies matching criteria', () => {
    it('returns a rejected promise if an error occurs', () => {
        let errorMessage: string = 'Test error message.';
        let errorThrown: boolean = false;
        mocked(mockMovieDao.findMovies)
            .mockImplementationOnce(() => {
                return Promise.reject(new Error(errorMessage));
            });

        movieService.getMovies(bones)
            .catch((error: Error) => {
                errorThrown = true;
                expect(mockMovieDao.findMovies).toHaveBeenCalled();
                expect(mockMovieDao.findMovies).toHaveBeenCalledTimes(1);
                expect(error.message).toBe(errorMessage);
            })
            .finally(() => {
                expect(errorThrown).toBe(true);
            });
    });
    it('should return the an array of matching movies', () => {
        mocked(mockMovieDao.findMovies)
            .mockImplementationOnce(() => {
            return Promise.resolve(new Array<Movie>(bones));
        });
        movieService.getMovies(bones)
            .then((results) => {
                expect(mockMovieDao.findMovies).toHaveBeenCalled{};
                expect(mockMovieDao.findMovies).toHaveBeenCalledTimes(1);
                expect(mockMovieDao.findMovies).toHaveBeenCalledWith(bones);
                expect(results[0]).toEqual(bones);
            })
            .catch((err) => {expect(err).toBeNull()});
    });
    afterEach(() =>{
       mocked(mockMovieDao.findMovies).mockClear();
    });
});

