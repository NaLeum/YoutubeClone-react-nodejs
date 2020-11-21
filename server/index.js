const express = require('express') ;
const app = express();
const path = require('path');
const cors = require('cors');


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const config = require('./config/key')


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, 
    useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB Connected...å'))
  .catch(err=>console.log(err))

app.use(cors());

app.use('/api/users',require('./routes/users'));
app.use('/api/video',require('./routes/video'));
app.use('/api/subscribe',require('./routes/subscribe'));
app.use('/api/comment',require('./routes/comment'));


app.use('/uploads', express.static('uploads'));

if(process.env.NODE_ENV === 'production'){

  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });

}

const port = 5000;

app.listen(port,()=>console.log(`Example app listening on port ${port}`))