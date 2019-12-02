import EntityManager from "./EntityManager";
import * as DataStore from 'nedb';
import {inject, injectable} from "inversify";
import TYPES from "../constants/TYPES";
import PMDBEntity from "../entity/PMDBEntity";

@injectable()
export default class EntityManagerImpl implements EntityManager{
    private dataStore: DataStore;

    constructor(@inject(TYPES.DataStore) dataStore: DataStore){
        this.dataStore = dataStore;
    }

    delete(entity: PMDBEntity) {
        //TODO implement method
    }

    save(entity: PMDBEntity) {
        //TODO implement method.
    }


}