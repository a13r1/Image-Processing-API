import express from 'express';
import images from './api/images';

const api = express.Router();

api.get('/', (req, res) => {
    res.send('main api route');
});

api.use('/images', images);

export default api;