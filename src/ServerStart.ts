import ServerContextInitializer from "./configuration/ServerContextInitializer";

const exampleServer = new ServerContextInitializer();
exampleServer.start(8080);

//NOTE: Source for overnightJS https://github.com/seanpmaxwell/overnight
//NOTE: InversifyJS source documentation https://github.com/inversify/InversifyJS