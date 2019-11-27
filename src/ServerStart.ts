import ServerContextInitializer from './configuration/PMDBServer';

const exampleServer = new ServerContextInitializer();
exampleServer.start(8080);

//NOTE: Source for overnightJS https://github.com/seanpmaxwell/overnight