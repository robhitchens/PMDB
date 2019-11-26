import * as express from 'express';
const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

export {usersRouter};
