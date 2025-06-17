import express from 'express';
import cors from 'cors';
import router from './Routes/YtRoute.js';
const app = express();
import dotenv from 'dotenv';
import { dbconnection } from './Db/db.js';
dotenv.config();

app.use(express.json());

dbconnection();

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
    methods : ['GET','POST','PUT','DELETE']
}));

app.use('/api/v1',router);

const PORT = 4000;

app.listen(PORT , () => {
    console.log(`Server is listening on ${PORT}..`)
})