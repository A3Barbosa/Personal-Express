const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://a3barbosa21:stackup@cluster0.ck4epij.mongodb.net/?retryWrites=true&w=majority";
const dbName = "demo";

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
  db.collection('comments').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {comments: result})
  })
})

app.post('/comments', (req, res) => {
  db.collection('comments').insertOne({name: req.body.name, thoughts: req.body.thoughts, theStar:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/comments', (req, res) => {
  db.collection('comments')
  .findOneAndUpdate({name: req.body.name, thoughts: req.body.thoughts}, {
    $set: {
      theStar:req.body.theStar + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


//  app.put('/comments/thumbDown', (req, res) => {
//   db.collection('comments')
//   .findOneAndUpdate({name: req.body.name, thoughts: req.body.thoughts}, {
//      $set: {
//       thumbUp:req.body.thumbUp -1
//      }
//     }, {
//     sort: {_id: -1},
//      upsert: true 
//       }, (err, result) => {
//       if (err) return res.send(err)
//      res.send(result)
//     })
//  })

app.delete('/comments', (req, res) => {
  db.collection('comments').findOneAndDelete({name: req.body.name, thoughts: req.body.thoughts}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
