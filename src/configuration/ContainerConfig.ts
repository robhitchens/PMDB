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
import {join} from "path";

function handleDBError(dbName: string, err): void{
    Logger.Err(`Unable to load ${dbName} database: ${err.message}`);
    Logger.Err(err, true);
    throw err;//Note: rethrowing error.
}

let container: Container = new Container();
const entityManager: EntityManager = {
    movies: new DataStore({//Movies "table" definition
        inMemoryOnly: false,
        filename: join(__dirname, "../../temp/movies.db")
    })
};
//Below could iterate through object keys and call load database on each.
entityManager.movies.loadDatabase((err) => { handleDBError('movies', err); });
//NOTE: Looks like this is the correct pattern to bind injectables
//container.bind<TargetInterface>(TypeOfToBeInjected).to(Injectable)
//Note: below seems to bn like bean declaration in spring.
//TODO: need to add configuration to use development db or not.
container.bind<EntityManager>(TYPES.EntityManager).toConstantValue(entityManager);
container.bind<MovieDao>(TYPES.MovieDao).to(MovieDaoImpl);
container.bind<MovieService>(TYPES.MovieService).to(MovieServiceImpl);
container.bind<PMDBController>(CONTROLLERS.PMDBController).to(MovieController).whenTargetNamed(CONTROLLERS.MovieController);
//TODO need to figure out how to switch entity managers when not in development/switching to firebase

export {container};
/*NOTE. to declare multiple concretions of same interface use
 .whenTargetNamed("name") during declaration and
 @named() when injecting.
 */