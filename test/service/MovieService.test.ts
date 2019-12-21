import "reflect-metadata";
import MovieServiceImpl from "../../src/service/MovieServiceImpl";
import MovieService from "../../src/service/MovieService";
import MovieDao from "../../src/dao/MovieDao";
import {mocked} from "ts-jest/utils";
import Movie from "../../src/entity/Movie";
import bones from "../temp/BonesMovie";
import MovieDaoImpl from "../../src/dao/MovieDaoImpl";
//jest.mock('../../src/dao/MovieDao');

let movieService: MovieService;
let mockMovieDao: MovieDao = jest.genMockFromModule<MovieDao>('../../src/dao/MovieDaoImpl');

beforeAll(() => {
    movieService = new MovieServiceImpl(mockMovieDao);//Note: constructor based dependency injection.
});
afterEach(() => {
    jest.clearAllMocks();
});
describe('When searching for a movie by title', () => {
    it('returns a rejected promise', async () => {
        //TODO need to figure out how to use ts-jest mocked. and mocking moviedao functions.
        let testErrorMessage: string = 'Test error';
        mockMovieDao.findMovieByTitle = jest.fn()
            .mockImplementationOnce(() => {
                return Promise.reject(new Error(testErrorMessage));
            });

        try {
            await movieService.getMovieByTitle("Bones");
        } catch (e) {
            expect(mockMovieDao.findMovieByTitle).toHaveBeenCalled();
            expect(mockMovieDao.findMovieByTitle).toHaveBeenCalledTimes(1);
            expect(e.message).toEqual(testErrorMessage);
        }
    });
    it('should return the requested movie', async () => {
        mockMovieDao.findMovieByTitle = jest.fn()
            .mockImplementationOnce((title: string) => {
                if (title === bones.title) {
                    return Promise.resolve(bones);
                } else {
                    return Promise.reject(`title: ${title} no exist`);
                }
            });
        let result: Movie = await movieService.getMovieByTitle("Bones");

        expect(mockMovieDao.findMovieByTitle).toHaveBeenCalled();
        expect(mockMovieDao.findMovieByTitle).toHaveBeenCalledTimes(1);
        expect(result).not.toBeNull();
        expect(result).toEqual(bones);

    });
   afterEach(() => {
       mocked(mockMovieDao.findMovieByTitle).mockClear();
   });
});

describe('When getting all movies matching criteria', () => {
    it('returns a rejected promise if an error occurs', async () => {
        let errorMessage: string = 'Test error message.';
        mockMovieDao.findMovies = jest.fn()
            .mockImplementationOnce(() => {
                return Promise.reject(new Error(errorMessage));
            });

        try {
            await movieService.getMovies(bones);
        }catch (e) {
            expect(mockMovieDao.findMovies).toHaveBeenCalled();
            expect(mockMovieDao.findMovies).toHaveBeenCalledTimes(1);
            expect(e.message).toBe(errorMessage);
        }
    });
    it('should return the an array of matching movies', async () => {
        mockMovieDao.findMovies = jest.fn()
            .mockImplementationOnce(() => {
            return Promise.resolve(new Array<Movie>(bones));
        });
        let results: Array<Movie> = await movieService.getMovies(bones);
        expect(mockMovieDao.findMovies).toHaveBeenCalled();
        expect(mockMovieDao.findMovies).toHaveBeenCalledTimes(1);
        expect(mockMovieDao.findMovies).toHaveBeenCalledWith(bones);
        expect(results[0]).toEqual(bones);
    });
    afterEach(() =>{
       mocked(mockMovieDao.findMovies).mockClear();
    });
});

describe('When update is called', () => {
    it('should throw an error if it can\'t find the movie', async () => {
        let errorMessage: string = 'Test error message';
        mockMovieDao.findMovieById = jest.fn()
            .mockImplementationOnce((id: string) =>{
            console.debug(`mock findMovieById implementation called with: ${id}`);
            return Promise.reject(new Error(errorMessage));
        });
        mockMovieDao.update = jest.fn()
            .mockImplementationOnce((movie: Movie) => {
            console.debug(`mock update implementation called with:`, movie);
            return Promise.resolve(movie);
        });
        try {
            await movieService.update(bones);
        }catch (e) {
            expect(mockMovieDao.findMovieById).toHaveBeenCalled();
            expect(mockMovieDao.findMovieById).toHaveBeenCalledTimes(1);
            expect(mockMovieDao.findMovieById).toHaveBeenCalledWith(bones._id);
            expect(mockMovieDao.update).not.toHaveBeenCalled();
            expect(e.message).toEqual(errorMessage);
        }
    });//TODO add test for returning null
    it('should return the updated movie', async () => {
        mockMovieDao.findMovieById = jest.fn()
            .mockImplementationOnce((id: string) => {
            console.debug(`mock findMovieById implementation called with: ${id}`);
            return Promise.resolve(bones);
        });
        mockMovieDao.update = jest.fn()
            .mockImplementationOnce((movie: Movie) => {
            console.debug(`mock update implementation called with:`, movie);
            return Promise.resolve(movie);
        });
        let result: Movie = await movieService.update(bones);

                expect(mockMovieDao.findMovieById).toHaveBeenCalled();
                expect(mockMovieDao.findMovieById).toHaveBeenCalledTimes(1);
                expect(mockMovieDao.findMovieById).toHaveBeenCalledWith(bones._id);
                expect(mockMovieDao.update).toHaveBeenCalled();
                expect(mockMovieDao.update).toHaveBeenCalledTimes(1);
                expect(mockMovieDao.update).toHaveBeenCalledWith(bones);
                expect(result).toEqual(bones);

    });
    afterEach(() => {
        mocked(mockMovieDao.findMovieById).mockClear();
        mocked(mockMovieDao.update).mockClear();
    });
});