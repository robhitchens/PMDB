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
    public findMovieByTitle(title: string): Promise<Movie>{//TODO this may never be used
        return new Promise<Movie>(
            (resolve, reject) => {
                this.dataStore.findOne({title: title}, (err: Error, document: any) => {
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

    findMoviesByFormat(format: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            this.dataStore.find({format: format}, (err: Error, documents: Array<any>) => {
                if(err){
                    Logger.Warn(`Error occurred getting movies for format ${format}. Error: ${err.message}`);
                    Logger.Warn(err, true);
                    reject(err);
                }else{
                    resolve(<Array<Movie>> documents);
                }
            });
        });
    }

    findMoviesByFormats(format: Array<string>): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
           reject(new Error('TODO implement'));
        });
    }

    findMoviesByGenre(genre: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            reject(new Error('TODO implement'));
        });
    }

    findMoviesBySource(source: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            reject(new Error('TODO implement'));
        });
    }

    findMoviesCloseToRunningTime(runningTime: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            reject(new Error('TODO implement'));
        });
    }

    findMoviesFeaturingActor(actor: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            reject(new Error('TODO implement'));
        });
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

    findMoviesWithActors(actors: Array<string>): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            reject(new Error('TODO implement'));
        });
    }

    findMoviesWithAudioFormat(audioFormat: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            reject(new Error('TODO implement'));
        });
    }

    findMoviesWithAudioFormats(audioFormats: Array<string>): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            reject(new Error('TODO implement'));
        });
    }

}