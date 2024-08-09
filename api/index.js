const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articleRouter = require('../routes/article.js');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.use('/article', articleRouter)

app.get('*', (req,res) => {
  return res.status(404).send('This route is not in use.')
})


const port = 8000;

mongoose.connect(process.env.CONNECTION_STRING, {}
)
.then((result) =>{
  app.listen(port,()=>{
    console.log(`Server Started at port ${port}`)
})
}).catch((err)=>{
console.log(err)
})


module.exports =  app;