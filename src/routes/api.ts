import express from 'express';
import images from './api/images';

const api = express.Router();

const response_style =
    'color: #404040; background: #fdfad8; font-family: consolas; font-size: 20px; padding: 24px;';

api.get('/', (req, res) => {
    res.send(`<p style="${response_style}">main api route</p>`);
});

api.use('/images', images);

export default api;
