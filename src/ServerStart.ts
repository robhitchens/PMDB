import PMDBServer from './configuration/PMDBServer';

const exampleServer = new PMDBServer();
exampleServer.start(8080);

//NOTE: Source for overnightJS https://github.com/seanpmaxwell/overnight