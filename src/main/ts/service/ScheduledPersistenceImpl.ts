import ScheduledPersistence from "./ScheduledPersistence";
import {inject, injectable} from "inversify";
import TYPES from "../constants/TYPES";
import {Properties} from "../../resources/Properties";
import MovieDao from "../dao/MovieDao";
import {Logger} from "@overnightjs/logger";
import MovieEntity from "../entity/MovieEntity";

@injectable()
export default class ScheduledPersistenceImpl implements ScheduledPersistence{

    private properties: Properties;
    private movieDao: MovieDao;
    //TODO will have to create scheduler for all entities.

    constructor(
        @inject(TYPES.Properties) properties: Properties,
        @inject(TYPES.MovieDao) movieDao: MovieDao
        ) {
        this.properties = properties;
        this.movieDao = movieDao;
    }

    pollCache(): void {
        setInterval(() => {
                this.writeCacheToPersistence()//todo could also maybe use a message queue to keep caches up to date for multiple instances.
                    .then(() => {//TODO increase interval, actually do something. also maybe use worker threads once available in node
                        Logger.Info(`MovieDao cache has been written to persistence`);
                    }).catch((err: Error) => {
                    Logger.Err({
                        message: `Error occurred writing cache to persistence: ${err.message}`,
                        error: Error
                    }, true);
                });//TODO not sure if should wait
            },
            this.properties.scheduler.interval);
    }

    async writeCacheToPersistence(): Promise<void> {
        let results: MovieEntity[] = await this.movieDao.getOnlyCachedMovies();
        results.forEach((value: MovieEntity, index: number, array: MovieEntity[]) => {
            Logger.Info({
                message: `Writing movie with id ${value._id} to database`,
                value: value
                }, true);
            console.debug('todo need to implement persistence layer');
        });
        return;
    }
}