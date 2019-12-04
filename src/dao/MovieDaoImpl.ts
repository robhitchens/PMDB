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

//TODO need to figure out how to handle transaction management later.
//TODO need to figure out entity relationships.
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
                this.dataStore.findOne({title: title}, (err: Error, document: Movie) => {
                    if(err) {
                        Logger.Warn(`Error occurred finding movie for title: ${title}: error: ${err.message}`);
                        Logger.Err(err, true);
                        reject(err);
                    }else {
                        resolve(document);
                    }
                });
            }
        );
    }

    findMoviesByFormat(format: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            this.dataStore.find({format: format}, (err: Error, documents: Array<Movie>) => {
                if(err){
                    Logger.Warn(`Error occurred getting movies for format ${format}. Error: ${err.message}`);
                    Logger.Err(err, true);
                    reject(err);
                }else{
                    resolve(documents);
                }
            });
        });
    }

    findMoviesByFormats(format: Array<string>): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
           this.dataStore.find({format: {$in: format}}, (err: Error, documents: Array<Movie>) => {
              if(err){
                  Logger.Warn(`Error occurred finding Movies for format(s) ${format}. Error: ${err.message}`);
                  Logger.Err(err, true);
                  reject(err);
              } else {
                  resolve(documents);
              }
           });
        });
    }

    findMoviesByGenre(genre: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            this.dataStore.find({genre: genre}, (err: Error, documents: Array<Movie>) => {
                if(err){
                    Logger.Warn(`Error occurred finding movies by genre: ${genre}. Error: ${err.message}`);
                    Logger.Err(err, true);
                    reject(err);
                }else{
                    resolve(documents);
                }
            });
        });
    }

    findMoviesBySource(source: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            this.dataStore.find({source: source}, (err: Error, documents: Array<Movie>) => {
                if(err){
                    Logger.Warn(`Error occurred finding Movies for source: ${source}. Error: ${err.message}`);
                    Logger.Err(err, true);
                    reject(err);
                }else{
                    resolve(documents);
                }
            });
        });
    }

    findMoviesCloseToRunningTime(runningTime: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            this.dataStore.find({runningTime: runningTime}, (err: Error, documents: Array<Movie>) => {
                    if(err){
                        Logger.Warn(`Error occurred finding Movies by runningTime: ${runningTime}. Error: ${err.message}`);
                        Logger.Err(err, true);
                        reject(err);
                    }else{
                        resolve(documents);
                    }
            });
        });
    }

    findMoviesFeaturingActor(actor: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            reject(new Error('TODO implement'));
        });
    }

    findMoviesMatchingTitle(title: string): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
                this.dataStore.find({title: title}, (err: Error, documents: Array<Movie>) => {
                    if(err){
                        Logger.Warn(`Error occurred finding movies by title  ${title}. Error: ${err.message}`);
                        Logger.Warn(err, true);
                        reject(err);
                    }else{
                        resolve(documents);
                    }
                });
            });
    }

    findMoviesWithActors(actors: Array<string>): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            this.dataStore.find({actors: {$in: actors}}, (err: Error, documents: Array<Movie>) => {
                if (err) {
                    Logger.Warn(`Error occurred finding Movies with actors: ${actors}. Error: ${err.message}`);
                    Logger.Err(err, true);
                    reject(err);
                } else {
                    resolve(documents);
                }
            })
        });
    }

    findMoviesWithAudioFormats(audioFormats: Array<string>): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            this.dataStore.find({audioFormats: {$in: audioFormats}}, (err: Error, documents: Array<Movie>) => {
                if(err){
                    Logger.Warn(`Error occurred finding Movies with audio formats: ${audioFormats}. Error: ${err.message}`);
                    Logger.Err(err, true);
                    reject(err);
                } else {
                    resolve(documents);
                }
            });
        });
    }

    save(movie: Movie): Promise<Movie> {
        return new Promise((resolve, reject) => {
           this.dataStore.insert(movie, (err: Error, document: Movie) => {
               if(err){
                   Logger.Err(`Unable to save movie ${JSON.stringify(movie)}`);
                   Logger.Err(err, true);
                   reject(err);
               }else{
                   Logger.Info(`Movie ${document.title} saved with id ${document._id}`);
                   resolve(document)
               }
           });
        });
    }

}