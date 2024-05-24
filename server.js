import express from 'express';
import colors from "colors" ;
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js' 
import  cors  from "cors";
import categoryRoutes  from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
 import path from 'path';
 import { fileURLToPath } from 'url';

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app= express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

 // Define __dirname for ES modules
 const  __filename = fileURLToPath(import.meta.url);
 const  __dirname = path.dirname(__filename);
 console.log(__dirname)

//  //static file
  app.use(express.static(path.join(__dirname, '/client/build')))

//  //render client
  // app.get('*', (req,res)=>     res.sendFile(path.join(__dirname, '/client/build/index.html')))

  //rest api 
app.get('/',(req,res)=>{
  res.send("<h1>Welcome to ecommerce app</h1>")
})

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

//  //render client
app.get('*', (req,res)=>     res.sendFile(path.join(__dirname, '/client/build/index.html')))

//PORT
const PORT= process.env.PORT || 8080;

//run listen
app.listen(PORT,()=>{
     console.log(`Server running  on ${PORT}`.bgCyan.white)
})