import Movie from "../entity/Movie";
import MovieDao from "./MovieDao";
import {inject, injectable} from "inversify";
import bones from "../../test/temp/BonesMovie";
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

    public constructor(
        @inject(TYPES.EntityManager) entityManager: EntityManager
    ){
        this.dataStore = entityManager.movies;
    }

    findMovies(movie: Movie): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
           this.dataStore.find(movie, (err: Error, documents: Array<Movie>) => {
                if(err){
                    Logger.Err({
                        message: `Unable to find movies for query:`,
                        movie: movie,
                        error: err
                    }, true);
                    reject(err);
                }else{
                    resolve(documents);
                }
           });
        });
    }

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

    findMovieById(id: string): Promise<Movie> {
        return new Promise((resolve, reject) => {
            this.dataStore.findOne({_id: id}, (err: Error, document: Movie) => {
                if(err){
                    Logger.Warn(`Unable to find movie for Id: ${id}`);
                    Logger.Err(err, true);
                    reject(err);
                }else{
                    resolve(document);
                }
            });
        });
    }

    create(movie: Movie): Promise<Movie> {
        return new Promise((resolve, reject) => {
           this.dataStore.insert(movie, (err: Error, document: Movie) => {
               if(err){
                   Logger.Err({
                       message: `Unable to save movie ${JSON.stringify(movie)}`,
                       err: err
                   }, true);
                   reject(err);
               }else{
                   Logger.Info(`Movie ${document.title} saved with id ${document._id}`);
                   resolve(document);
               }
           });
        });
    }

    update(movie: Movie): Promise<Movie> {
        return new Promise((resolve, reject) => {
            this.dataStore.update({_id: movie._id}, movie, {returnUpdatedDocs: true},
                (err: Error, numAffected: number, affectedDocuments: Array<Movie>, upsert: boolean) => {
                    if(err){
                        Logger.Err({
                            message: `Unable to update movie with id:${movie._id}`,
                            movie: movie,
                            error: err
                        }, true);
                        reject(err);
                    }else{
                        Logger.Info(`Movie with id ${movie._id} successfully updated`);
                        Logger.Info(`Number of documents affected: ${numAffected}`);
                        resolve(affectedDocuments[0]);
                    }
                });
        });
    }

    delete(movie: Movie): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.dataStore.remove({_id: movie._id}, {}, (err: Error, numRemoved: number) => {
                if(err){
                    Logger.Err({
                        message: `Unable to delete movie`,
                        movie: movie,
                        error: err
                    }, true);
                    reject(err);
                }else if(numRemoved === 1){
                    Logger.Info(`Movie with id ${movie._id} successfully deleted`);
                    resolve(true);
                }else{
                    Logger.Info(`Movie with ${movie._id} was not deleted. Movie may have already been removed.`);
                    resolve(false);
                }
            });
        });
    }

    getOnlyCachedMovies(): Promise<Array<Movie>> {
        return new Promise((resolve, reject) => {
            this.dataStore.find({_persisted: false}, (err: Error, documents: Array<Movie>) => {
                if(err){
                    Logger.Err({
                        message: 'Error occurred looking for only cached movies',
                        error: err
                    }, true);
                    reject(err);
                }else{
                    resolve(documents);
                }
            });
        });
    }
}