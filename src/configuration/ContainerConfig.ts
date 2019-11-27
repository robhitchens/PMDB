import "reflect-metadata";
import {Container} from "inversify";
import MovieService from "../service/MovieService";
import MovieDao from "../dao/MovieDao";
import {TYPES} from "../constants/TYPES";
import MovieServiceImpl from "../service/MovieServiceImpl";
import MovieDaoImpl from "../dao/MovieDaoImpl";

let container = new Container();

//NOTE: Looks like this is the correct pattern to bind injectables
//container.bind<TargetInterface>(TypeOfToBeInjected).to(Injectable)
container.bind<MovieDao>(TYPES.MovieDao).to(MovieDaoImpl);
container.bind<MovieService>(TYPES.MovieService).to(MovieServiceImpl);
//TODO: figure out how injection works with inversify. Does container binding do injection?
//NOTE: use container.get<MovieService>(Types.MovieService); to access singletons.
//NOTE: use container.getNamed for a specific bean.
//TODO figure out how to tag/name beans.
export {container};
/*NOTE. to declare multiple concretions of same interface use
 .whenTargetNamed("name") during declaration and
 @named() when injecting.

 */