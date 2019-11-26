//TODO types are place holders for now
export default class Movies {
    private _title: string;
    private _genre: string;//TODO could make separate entity. Or create separate microservice to handle
    private _runningTime: string;
    private _format: string; //TODO could make separate entity
    private _source: string; //TODO could make separate entity
    private _actors: Array<string>; //TODO could make some relation to separate entity
    private _audioFormats: Array<string>;//TODO same thing
    
    get title(): string {
        return this._title;
    }
    set title(title: string){
        this._title = title;
    }

    get genre(): string {
        return this._genre;
    }
    set genre(genre: string){
        this._genre = genre;
    }

    get runningTime(): string{
        return this._runningTime;
    }
    set runningTime(runningTime: string){
        this._runningTime = runningTime;
    }

    get format(): string {
        return this._format;
    }
    set format(format: string){
        this._format = format;
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