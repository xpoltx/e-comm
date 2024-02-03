import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/router';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', router());

mongoose.Promise = Promise;
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', (error: Error) => console.log(error));

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server runnig on port http://localhost:3000');
});

