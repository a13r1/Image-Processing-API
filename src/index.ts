import express from 'express';
import api from './routes/api';

const app = express();
const port = 3000;

const response_style =
    'color: #404040; background: #fdfad8; font-family: consolas; font-size: 20px; padding: 24px;';

app.get('/', (req: express.Request, res: express.Response): void => {
    res.send(`<p style="${response_style}">main route</p>`);
});

app.use('/api', api);

app.listen(port, (): void => {
    console.log(`server started at localhost:${port}`);
});
