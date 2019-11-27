import Movie from "../entity/Movie";
import MovieDao from "./MovieDao";
import {injectable} from "inversify";
import bones from "../temp/BonesMovie";

@injectable()
export default class MovieDaoImpl implements MovieDao{

    public findMovieByTitle(title: string): Movie{
        if(title === bones.title){//TODO: temporary git
            return bones;
        }
        throw new Error(`Movie with title ${title} not found`);
    }

    findMoviesByFormat(format: string): Array<Movie> {
        return undefined;
    }

    findMoviesByFormats(format: Array<string>): Array<Movie> {
        return undefined;
    }

    findMoviesByGenre(genre: string): Array<Movie> {
        return undefined;
    }

    findMoviesBySource(source: string): Array<Movie> {
        return undefined;
    }

    findMoviesCloseToRunningTime(runningTime: string): Array<Movie> {
        return undefined;
    }

    findMoviesFeaturingActor(actor: string): Array<Movie> {
        return undefined;
    }

    findMoviesMatchingTitle(title: string): Array<Movie> {
        return undefined;
    }

    findMoviesWithActors(actors: Array<string>): Array<Movie> {
        return undefined;
    }

    findMoviesWithAudioFormat(audioFormat: string): Array<Movie> {
        return undefined;
    }

    findMoviesWithAudioFormats(audioFormats: Array<string>): Array<Movie> {
        return undefined;
    }

}