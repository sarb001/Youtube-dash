import express from 'express';
import router from './Routes/YtRoute.js';
const app = express();

app.use(express.json());
app.use('/',router);

app.get('/api/v1' , async(req,res) => {
 return res.status(200).json({
    message : "Backend  working"
  })
})

const PORT = 3000;

app.listen(PORT , () => {
    console.log(`Server is listening on ${PORT}..`)
})