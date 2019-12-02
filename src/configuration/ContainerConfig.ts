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
import EntityManager from "../dao/EntityManager";
import EntityManagerImpl from "../dao/EntityManagerImpl";
import {Logger} from "@overnightjs/logger";

let container: Container = new Container();
const dataStore: DataStore = new DataStore({
    inMemoryOnly: true,
    filename: "./temp/development.db"
});
dataStore.loadDatabase((err) => {
    Logger.Err(`Unable to load neDB database: ${err.message}`);
    Logger.Err(err, true);
    throw err;//Note: rethrowing error.
});
//NOTE: Looks like this is the correct pattern to bind injectables
//container.bind<TargetInterface>(TypeOfToBeInjected).to(Injectable)
container.bind<MovieDao>(TYPES.MovieDao).to(MovieDaoImpl);
container.bind<MovieService>(TYPES.MovieService).to(MovieServiceImpl);
container.bind<PMDBController>(CONTROLLERS.PMDBController).to(MovieController).whenTargetNamed(CONTROLLERS.MovieController);
//TODO need to figure out how to switch entity managers when not in development/switching to firebase
container.bind<EntityManager>(TYPES.EntityManager).to(EntityManagerImpl);

//Note: below seems to bn like bean declaration in spring.
//TODO: need to add configuration to use development db or not.
container.bind<DataStore>(TYPES.DataStore).toConstantValue(dataStore);


export {container};
/*NOTE. to declare multiple concretions of same interface use
 .whenTargetNamed("name") during declaration and
 @named() when injecting.
 */