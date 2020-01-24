import * as bodyparser from 'body-parser';
import {Server} from "@overnightjs/core";
import {Logger} from "@overnightjs/logger";
import * as Path from 'path';
import * as cookieParser from "cookie-parser";
import * as Express from "express";
import {container} from "./ContainerConfig";
import PMDBController from "../controllers/PMDBController";
import CONTROLLERS from "../constants/CONTROLLERS";
import {MovieController} from "../controllers/MovieController";
import TYPES from "../constants/TYPES";
import ScheduledPersistence from "../service/ScheduledPersistence";
import {ViewController} from "../controllers/ViewController";

const viewsFolder: string = "../views";
const staticFolder: string = "../../../../public";
const viewEngine: string = "pug";

export default class ServerContextInitializer extends Server {
    private readonly SERVER_STARTED = 'Example server started on port: ';

    constructor(){
        super(true);

        Logger.Info(`Initializing server`);
        super.app.use(bodyparser.json());
        super.app.use(bodyparser.urlencoded({extended: true}));
        super.app.use(cookieParser());
        this.setupControllers();
        this.setupViewResolver();
        this.setupPublicPath();
        this.setupNotFoundHandler();
        this.setupDefaultErrorHandler();
        this.setupScheduledServices();
    }

    private setupScheduledServices(): void{
        container
            .get<ScheduledPersistence>(TYPES.ScheduledPersistence)
            .pollCache();
    }

    private setupControllers(): void{
        Logger.Info(`Setting up controllers`);
        const controllerInstances = [];
        Logger.Info(`Adding MovieController`);//TODO may iterate over Controller symbols
        controllerInstances.push(container.get<MovieController>(CONTROLLERS.MovieController));
        Logger.Info(`Adding ViewController`);
        controllerInstances.push(container.get<ViewController>(CONTROLLERS.ViewController));
        super.addControllers(controllerInstances);
    }

    private setupViewResolver(): void{
        Logger.Info(`Setting up view resolver.`);
        Logger.Info(`Setting views folder to ${Path.join(__dirname, viewsFolder)}`);
        this.app.set('views', Path.join(__dirname, viewsFolder));
        Logger.Info(`Setting view engine to ${viewEngine}`);
        this.app.set('view engine', viewEngine);
    }

    private setupPublicPath(): void{
        Logger.Info(`Setting express static folder to ${Path.join(__dirname, staticFolder)}`);
        this.app.use(Express.static(Path.join(__dirname, staticFolder)));
    }

    private setupNotFoundHandler(): void {
        this.app.use((req, res, next) => {
            res.status(404);
            res.render('notFound', {message: "404: Page can not be found"});
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
        Logger.Info(`Initializing server on port ${port}`);
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}