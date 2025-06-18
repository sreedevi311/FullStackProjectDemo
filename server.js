const express=require('express')
const cors =require('cors')
const app=express()
const port=3000


require('dotenv').config();
const { MongoClient } = require('mongodb');

async function connectToDB() {

  const client = await MongoClient.connect(process.env.MONGO_URL)
  db = client.db('sample_mflix')
  console.log('Connected to MongoDB')

}
connectToDB()

app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
    if (!db) {
        return res.status(503).json({ error: 'Database not connected yet' });
    }
    req.db=db
    next()
})


const moviesRoutes =require('./BackEnd/Routes/moviesRoutes')
app.use('/movies',moviesRoutes)

app.listen(port,()=>{console.log(`server is running on port ${port}`)})