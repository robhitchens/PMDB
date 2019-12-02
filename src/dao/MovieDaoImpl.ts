import Movie from "../entity/Movie";
import MovieDao from "./MovieDao";
import {inject, injectable} from "inversify";
import bones from "../temp/BonesMovie";
import * as firebase from "firebase/app";
import "firebase/auth";//Don't know what I need to do here.//Auth might not be required here.
import "firebase/firestore";

import * as DataStore from "nedb";
import TYPES from "../constants/TYPES";
import EntityManager from "./EntityManager";

@injectable()
export default class MovieDaoImpl implements MovieDao{
    private dataStore: DataStore;
    //TODO need to make clearer
    public constructor(@inject(TYPES.EntityManager) entityManager: EntityManager){//TODO should create interface for use with database
        this.dataStore = entityManager.movies;
    }
    //TODO add code to actually use the datastore
    public findMovieByTitle(title: string): Movie{
        if(title === bones.title){//TODO: temporary
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