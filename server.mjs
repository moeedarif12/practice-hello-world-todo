// import express, { text } from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';

// let todoSchema =  new mongoose.Schema({
//   text:{type:String, required: true},
//   claasId:String,
//   createdOn: { type: Date, default: Date.now },
// });
// const todoModel = mongoose.model('todos', todoSchema);

// const app = express()
// const port = process.env.PORT || 3000;



// // let todos = [];

// app.use(express.json());
// app.use(cors())

// app.post('/todo', (req, res) => {
//   console.log(req.body) 
  
//   // todos.push(req.body.text);

//   todoModel.create({text:req.body.text,},(err, saved)=> {
//       if (!err){
//         console.log(saved)
//         res.send({
//         message: "your todo is saved"
//       })
//     } else {
//       res.status(500).send({
//         message: "server error",
//     })}

//   })

// })


// app.get('/todos', (req, res) => {

//   todoModel.find({}, (err, data) => {
//     if(!err){
//       res.send({
//         message: "here is you todo list",
//         data: data
//       })
//     }else{
//       res.status(500).send({
//         message: "server error"
//       })
//     }

//   });
  

// })

// // app.get('/coffee', (req, res) => {
// //   console.log('someone is asking for coffee');
// // res.send('here is your coffee')
// // })

// // app.get('/icecream', (req, res) => {
// //   console.log('someone is asking for icecream');
// // res.send('here is your icecream')
// // })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })




// /////////////////////////////////////////////////////////////////////////////////////////////////
// let dbURI = 'mongodb+srv://dbmoeed:dbtest@cluster0.0gc754c.mongodb.net/abcdatabase?retryWrites=true&w=majority';

// mongoose.connect(dbURI);


// ////////////////mongodb connected disconnected events///////////////////////////////////////////////
// mongoose.connection.on('connected', function() {//connected
//     console.log("Mongoose is connected");
//     // process.exit(1);
// });

// mongoose.connection.on('disconnected', function() {//disconnected
//     console.log("Mongoose is disconnected");
//     process.exit(1);
// });

// mongoose.connection.on('error', function(err) {//any error
//     console.log('Mongoose connection error: ', err);
//     process.exit(1);
// });

// process.on('SIGINT', function() {/////this function will run jst before app is closing
//     console.log("app is terminating");
//     mongoose.connection.close(function() {
//         console.log('Mongoose default connection closed');
//         process.exit(0);
//     });
// });





import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';



let todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    classId: String,
    createdOn: { type: Date, default: Date.now }
});
const todoModel = mongoose.model('todos', todoSchema);



const app = express()
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.post('/todo', (req, res) => {

    todoModel.create({ text: req.body.text }, (err, saved) => {
        if (!err) {
            console.log(saved);

            res.send({
                message: "your todo is saved"
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    })
})
app.get('/todos', (req, res) => {

    todoModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                message: "here is you todo list",
                data: data
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

app.put('/todo/:id', async (req, res) => {

    try {
        let data = await todoModel
            .findByIdAndUpdate(
                req.params.id,
                { text: req.body.text },
                { new: true }
            )
            .exec();

        console.log('updated: ', data);

        res.send({
            message: "todo is updated successfully",
            data: data
        })

    } catch (error) {
        res.status(500).send({
            message: "server error"
        })
    }
})


app.delete('/todos', (req, res) => {

    todoModel.deleteMany({}, (err, data) => {
        if (!err) {
            res.send({
                message: "All Todo has been deleted successfully",
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})
app.delete('/todo/:id', (req, res) => {

    todoModel.deleteOne({ _id: req.params.id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "Todo has been deleted successfully",
                })
            } else {
                res.send({
                    message: "No todo found with this id: " + req.params.id,
                })
            }


        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

app.listen(port, () => {
    console.log(`Server app is listening on port ${port}`)
})


/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = 'mongodb+srv://dbuser:dbpassword@cluster0.gq9n2zr.mongodb.net/abcdatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////








// // index 

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Apna Air Sys Borg</title>
//     <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.1.2/axios.min.js" integrity="sha512-bHeT+z+n8rh9CKrSrbyfbINxu7gsBmSHlDCb3gUF1BjmjDzKhoKspyB71k0CIRBSjE5IVQiMMVBgCWjF60qsvA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
// <link rel="stylesheet" href="style.css">
// </head>
// <body>
//     <h1>Todo App with Server</h1>

//     <form onsubmit="postTodo(); return false">
//         Todo: <input id="todo" type="text" required>
//         <button type="submit">Add</button>
//     </form>
//     <button onclick="getAllTodos()">Refresh</button>
//     <h5 id="message"> </h5>

//     <h3 id="result">  </h3>

//     <script>
//        let api="https://lonely-flannel-shirt-goat.cyclic.app"
//    // let api="https://embarrassed-boa-cummerbund.cyclic.app";
//         function postTodo() {
//             let todoText = (document.querySelector("#todo").value)

//             document.querySelector("#result").innerHTML += todoText;   
//             document.querySelector("#result").innerHTML += '<br>';

//          axios.post(`${api}/todo`, {
//             text: todoText
//          })
//                 .then(function (response) {
//                      console.log(response.data);
                     
//                      getAllTodos();2

//                     document.querySelector("#message").innerHTML = response.data.message
                    
                    
//                     // response.data.data.map(eachTodo=>{
//                     //     document.querySelector("#result").innerHTML += eachTodo
//                     //     document.querySelector("#result").innerHTML += '<br>'

//                     // })

//                 })
//                 .catch(function (error) {
//                     // handle error
//                     console.log(error);
//                 })


//         }
   
 
//      function getAllTodos(){
//         axios.get(`${api}/todos`)
//                 .then(function (response) {

//                     // handle success
//                     console.log(response.data);
//                     document.querySelector("#result").innerHTML = "" 
                  
//                     response.data.data.map(eachTodo=>{
//                         document.querySelector("#result").innerHTML += eachTodo.text    
//                         document.querySelector("#result").innerHTML += '<br>'

//                     })

//                 })
//                 .catch(function (error) {
//                     // handle error
//                     console.log(error); 
//                 })

//             }
     
//             getAllTodos();
//             setInterval(getAllTodos, 1000 );
//         </script>


// </body>
// </html>