import {json, urlencoded} from 'body-parser';
import {ExampleController} from '../controllers/ExampleController';
import {Server} from "@overnightjs/core";
import {Logger} from "@overnightjs/logger";
import {join} from 'path';
import CookieParser from "cookie-parser";
import Express from "express";

export default class PMDBServer extends Server {
    private readonly SERVER_STARTED = 'Example server started on port: ';

    constructor(){
        super(true);
        this.app.use(json());
        this.app.use(urlencoded({extended: true}));
        this.app.use(CookieParser());
        this.setupControllers();
        this.setupViewResolver();
        this.setupPublicPath();
        this.setupNotFoundHandler();
        this.setupDefaultErrorHandler();
    }

    private setupControllers(): void{
        const controllerInstances = [];
        controllerInstances.push(new ExampleController());
        super.addControllers(controllerInstances);
    }

    private setupViewResolver(): void{
        this.app.set('views', join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
    }

    private setupPublicPath(): void{
        this.app.use(Express.static(join(__dirname, 'public')));
    }

    private setupNotFoundHandler(): void {
        this.app.use((req, res, next) => {
            res.send('notFound');
        });
    }

    private setupDefaultErrorHandler(): void{
        this.app.use((err, req, res, next) => {
           res.locals.message = err.message;
           res.locals.error = req.app.get('env') === 'development' ? err : {};

           res.status(err.status || 500);
           res.render('error');
        });
    }

    public start(port: number): void{
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}