import ServerContextInitializer from "./configuration/ServerContextInitializer";
import * as firebase from "firebase/app";

//TODO need to init firebase config as shown here: https://firebase.google.com/docs/web/setup
/*
* // TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  // ...
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
*/
const exampleServer = new ServerContextInitializer();
exampleServer.start(8080);

//NOTE: Source for overnightJS https://github.com/seanpmaxwell/overnight
//NOTE: InversifyJS source documentation https://github.com/inversify/InversifyJS