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
import {Logger} from "@overnightjs/logger";

@injectable()
export default class MovieDaoImpl implements MovieDao{
    private dataStore: DataStore;
    //TODO need to make clearer
    public constructor(@inject(TYPES.EntityManager) entityManager: EntityManager){//TODO should create interface for use with database
        this.dataStore = entityManager.movies;
    }
    //TODO add code to actually use the datastore
    public findMovieByTitle(title: string): Promise<Movie>{
        return new Promise<Movie>(
            (resolve, reject) => {
                this.dataStore.findOne({title: title}, (err, document) => {
                    if(err) {
                        Logger.Warn(`Error occurred finding movie for title: ${title}: error: ${err.message}`);
                        Logger.Warn(err, true);
                        reject(err);
                    }else {
                        resolve(<Movie> document);
                    }
                });
            }
        );
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

    findMoviesMatchingTitle(title: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
                this.dataStore.find({title: title}, (err: Error, documents: Array<any>) => {
                    if(err){
                        Logger.Warn(`Error occurred finding movies by title  ${title}. Error: ${err.message}`);
                        Logger.Warn(err, true);
                        reject(err);
                    }else{
                        resolve(<Array<Movie>> documents);
                    }
                });
            });
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