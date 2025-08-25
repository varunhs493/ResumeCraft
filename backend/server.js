import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import { connect } from 'mongoose';
import userRouter from './routes/userRoutes.js';


import path from 'path';
import { fileURLToPath } from 'url';
import resumeRouter from './routes/resumeRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();
const PORT=4000;

app.use(cors())

//Connect db
connectDB();

//MIDDLEWARE
app.use(express.json());

app.use('/api/auth',userRouter)
app.use('/api/resume',resumeRouter);

app.use('/uploads',express.static(path.join(__dirname,'uploads'),{
setHeaders:(res,__path)=>{
  res.set('Access-Control-Allow-Origin','https://resumecraft-frontend-fglt.onrender.com')
}
})
)
  

//ROUTES
app.get('/', (req, res) => {
  res.send('API Working');
})

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
})