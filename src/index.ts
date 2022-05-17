import express from 'express';
import api from './routes/api';

const app = express();
const port = 3000;

app.use('/api', api);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
