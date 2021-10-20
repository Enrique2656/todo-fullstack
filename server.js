const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://duane:123@cluster0.l8vrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "toDo";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('list').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {list: result})
  })
})

app.post('/list', (req, res) => {
  console.log(req.body.name)
  console.log(req.body.list)
  db.collection('list').insertOne({name: req.body.list}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})





app.delete('/list', (req, res) => {
  db.collection('list').findOneAndDelete({name: req.body.list}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
