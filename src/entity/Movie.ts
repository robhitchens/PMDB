//TODO types are place holders for now
export default class Movie {
    private _title: string;
    private _genres: Array<string>;//TODO could make separate entity. Or create separate microservice to handle
    private _runningTime: string;
    private _formats: Array<string>; //TODO could make separate entity
    private _source: string; //TODO could make separate entity
    private _actors: Array<string>; //TODO could make some relation to separate entity
    private _audioFormats: Array<string>;//TODO same thing
    
    get title(): string {
        return this._title;
    }
    set title(title: string){
        this._title = title;
    }

    get genres(): Array<string> {
        return this._genres;
    }
    set genres(genres: Array<string>){
        this._genres = genres;
    }

    get runningTime(): string{
        return this._runningTime;
    }
    set runningTime(runningTime: string){
        this._runningTime = runningTime;
    }

    get formats(): Array<string> {
        return this._formats;
    }
    set formats(formats: Array<string>){
        this._formats = formats;
    }

    get source(): string{
        return this._source;
    }
    set source(source: string){
        this._source = source;
    }

    get actors(): Array<string>{
        return this._actors;
    }
    set actors(actors: Array<string>){
        this._actors = actors;
    }

    get audioFormats(): Array<string>{
        return this._audioFormats;
    }
    set audioFormats(audioFormats: Array<string>) {
        this._audioFormats = audioFormats;
    }
    
}