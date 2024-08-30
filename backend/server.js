const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories')
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8000;

//middlewar
app.use(bodyParser.json());
app.use(cors());



//connect to mongodb

mongoose.connect('mongodb://localhost:27017/blog')
.then(()=>
    console.log("MongoDB connected"))
.catch(err=> console.log("DB error",err));



//use routes

app.use('/api/posts',postRoutes);
app.use('/api/categories',categoryRoutes);

app.listen(PORT,()=> console.log(`server running on port ${PORT}`))


   
    
