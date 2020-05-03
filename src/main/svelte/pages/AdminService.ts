import MovieEntity from "../../ts/entity/MovieEntity";
import {apiInstance} from "../service/ApiService";
import {ApiResponse} from "apisauce";

export const admin: Symbol = Symbol.for('admin');

export const postMovieEntry = async (data: MovieEntity): Promise<void> => {
    let url: string = "movie/create";
    let response: ApiResponse<MovieEntity> = await apiInstance.post(url, data, {headers: {"Content-Type": "application/json;charset=UTF-8"}});
    if(response.ok){
        console.info("Successfully saved movie: ", response.data);
    }else{
        console.error("Error occurred submitting movie entry: ", response.originalError);
        //TODO need to add proper error handling for displaying messages on UI.
    }
};