import PMDBEntity from "../entity/PMDBEntity";

export default interface EntityManager{
    save(entity: PMDBEntity);
    delete(entity: PMDBEntity);
    //TODO add more methods;
}