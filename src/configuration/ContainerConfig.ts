import "reflect-metadata";
import {Container} from "inversify";
import MovieService from "../service/MovieService";
import MovieDao from "../dao/MovieDao";
import {TYPES} from "../constants/TYPES";
import MovieServiceImpl from "../service/MovieServiceImpl";
import MovieDaoImpl from "../dao/MovieDaoImpl";
import PMDBController from "../controllers/PMDBController";
import {MovieController} from "../controllers/MovieController";
import {CONTROLLERS} from "../constants/CONTROLLERS";

let container = new Container();

//NOTE: Looks like this is the correct pattern to bind injectables
//container.bind<TargetInterface>(TypeOfToBeInjected).to(Injectable)
container.bind<MovieDao>(TYPES.MovieDao).to(MovieDaoImpl);
container.bind<MovieService>(TYPES.MovieService).to(MovieServiceImpl);
container.bind<PMDBController>(CONTROLLERS.PMDBController).to(MovieController).whenTargetNamed(CONTROLLERS.MovieController);

export {container};
/*NOTE. to declare multiple concretions of same interface use
 .whenTargetNamed("name") during declaration and
 @named() when injecting.
 */