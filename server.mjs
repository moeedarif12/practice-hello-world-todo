import express, { text } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

let todoSchema =  new mongoose.Schema({
  text:{type:String, required: true},
  claasId:String,
  createdOn: { type: Date, default: Date.now },
});
const todoModel = mongoose.model('todos', todoSchema);

const app = express()
const port = process.env.PORT || 3000;



// let todos = [];

app.use(express.json());
app.use(cors())

app.post('/todo', (req, res) => {
  console.log(req.body) 
  
  // todos.push(req.body.text);

  todoModel.create({text:req.body.text,},(err, saved)=> {
      if (!err){
        console.log(saved)
        res.send({
        message: "your todo is saved"
      })
    } else {
      res.status(500).send({
        message: "server error",
    })}

  })

})


app.get('/todos', (req, res) => {

  todoModel.find({}, (err, data) => {
    if(!err){
      res.send({
        message: "here is you todo list",
        data: data
      })
    }else{
      res.status(500).send({
        message: "server error"
      })
    }

  });
  

})

// app.get('/coffee', (req, res) => {
//   console.log('someone is asking for coffee');
// res.send('here is your coffee')
// })

// app.get('/icecream', (req, res) => {
//   console.log('someone is asking for icecream');
// res.send('here is your icecream')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = 'mongodb+srv://dbmoeed:dbtest@cluster0.0gc754c.mongodb.net/abcdatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function() {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function() {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function(err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function() {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function() {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});