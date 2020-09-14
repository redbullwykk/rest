//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
const route = require('./routes/route');

var app = express();

//defining port number
const port = process.env.PORT || 8080;

//************************ connect to mongodb *******************************//
//mongoose.connect('mongodb://localhost:27017/contactlist', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://admin:admin@kyonetine-6t3ql.mongodb.net/kyonetine?retryWrites=true&w=majority', { useNewUrlParser: true});
//on connection successful
mongoose.connection.on('connected', ()=>{
    console.log('Connected to database atlas mongodb');
});
//on connection error
mongoose.connection.on('error', (err)=>{
    if(err){
        console.log('Error in database connection: '+err);
    }
});
//**************************************************************************//


//adding middleware
app.use(cors());

//body - parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

//testing server
app.get('*',(req,res)=>{
    //res.send('footbar');
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port,()=>{
    console.log('Server started at port: '+port);
});