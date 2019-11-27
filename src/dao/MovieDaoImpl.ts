import Movie from "../entity/Movie";
import MovieDao from "./MovieDao";
import {injectable} from "inversify";

@injectable()
export default class MovieDaoImpl implements MovieDao{
    private bones: Movie;
    constructor(){
        this.bones = new Movie();
        this.bones.title = "Bones";
        this.bones.actors = new Array<string>();
        this.bones.actors.push("Snoop Dog", "Pam Grier");
        this.bones.formats = new Array<string>();
        this.bones.formats.push("DVD");
        this.bones.genres = new Array<string>();
        this.bones.genres.push("Horror");
    }
    public findMovieByTitle(title: string): Movie{
        if(title === this.bones.title){
            return this.bones;
        }
        throw new Error(`Movie with title ${title} not found`);
    }
}