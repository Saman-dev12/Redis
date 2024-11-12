import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createClient } from 'redis';

const redisClient = createClient();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.post('/submit', async(req: Request, res: Response) => {
   const {problemId,userId,code,language} = req.body;
   //push to db
   try{
    await redisClient.lPush('submissions', JSON.stringify({problemId, userId, code, language}));
    res.json("done")
   }catch(err){
    console.log(err);
   }
   
});

async function startServer() {
    try {
        await redisClient.connect();
        app.listen(8000, () => console.log('Listening on port 8000'));    
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
}

startServer()