import express from 'express';
const moviesRouter = express.Router();

moviesRouter.get('/', (req, res, next) => {
    console.info('Movies index router hit');
    res.send('movies index response');
});

export {moviesRouter};