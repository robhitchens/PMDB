import "reflect-metadata";
import {Container} from "inversify";
import MovieService from "../service/MovieService";
import MovieDao from "../dao/MovieDao";
import TYPES from "../constants/TYPES";
import MovieServiceImpl from "../service/MovieServiceImpl";
import MovieDaoImpl from "../dao/MovieDaoImpl";
import PMDBController from "../controllers/PMDBController";
import {MovieController} from "../controllers/MovieController";
import CONTROLLERS from "../constants/CONTROLLERS";
import * as DataStore from "nedb";
import {Logger} from "@overnightjs/logger";
import EntityManager from "../dao/EntityManager";
import {join, resolve} from "path";
import {readFileSync} from "fs";
import {Properties} from "../resources/Properties";
import ScheduledPersistence from "../service/ScheduledPersistence";
import ScheduledPersistenceImpl from "../service/ScheduledPersistenceImpl";

//TODO need to make more robust for properties for running in different environments.
const propertiesPath: string = resolve(__dirname, "../resources/properties.json");
const moviesDB: string = resolve(__dirname, "../../temp/movies.db");//join(__dirname, "../../temp/movies.db");

const properties: Properties = <Properties> (<any> readFileSync(propertiesPath));


function onDBLoad(dbName: string, err: Error): void{
    if(err) {
        Logger.Err(`Unable to load ${dbName} database: ${err}`);
        Logger.Err(err, true);
        throw err;//Note: rethrowing error.
    }else{
        Logger.Info(`Database at ${moviesDB}, loaded.`);
    }
}

let container: Container = new Container();
const entityManager: EntityManager = {
    movies: new DataStore({//Movies "table" definition
        inMemoryOnly: false,
        filename: moviesDB
    })
};

//TODO use nedb as an in memory database for caching entities. Use another database for full persistence.
//Below could iterate through object keys and call load database on each.
Logger.Info(`Movies resolved path ${moviesDB}`);
entityManager.movies.loadDatabase((err) => { onDBLoad('movies', err); });
//NOTE: Looks like this is the correct pattern to bind injectables
//container.bind<TargetInterface>(TypeOfToBeInjected).to(Injectable)
//Note: below seems to bn like bean declaration in spring.
//TODO: need to add configuration to use development db or not.
container.bind<EntityManager>(TYPES.EntityManager).toConstantValue(entityManager);
container.bind<MovieDao>(TYPES.MovieDao).to(MovieDaoImpl);
container.bind<MovieService>(TYPES.MovieService).to(MovieServiceImpl);
container.bind<MovieController>(CONTROLLERS.MovieController).to(MovieController);
container.bind<Properties>(TYPES.Properties).toConstantValue(properties);
container.bind<ScheduledPersistence>(TYPES.ScheduledPersistence).to(ScheduledPersistenceImpl);
//TODO need to figure out how to switch entity managers when not in development/switching to fir&ebase

export {container};
/*NOTE. to declare multiple concretions of same interface use
 .whenTargetNamed("name") during declaration and
 @named() when injecting.
 */