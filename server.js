const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

// ========================
// Link to Database
// ========================
// Updates environment variables
// @see https://zellwk.com/blog/environment-variables/
//require('./dotenv')

// Replace process.env.DB_URL with your actual connection string
const connectionString = 'mongodb+srv://IronMark:Temp^Pass1@starwarscluster2.i7xsk.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('starwars2')
    const quotesCollection = db.collection('quotes')

    // ========================
    // Middlewares
    // ========================
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    // ========================
    // Routes
    // ========================
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(quotes => {
          res.render('index.ejs', { quotes: quotes })
        })
        .catch(/* ... */)
    })

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted Darth Vadar\'s quote')
        })
        .catch(error => console.error(error))
    })

    // ========================
    // Listen
    // ========================
    const isProduction = process.env.NODE_ENV === 'production'
    const port = isProduction ? 7500 : 3000
    app.listen(port, function () {
      console.log(`listening on ${port}`)
    })
  })
  .catch(console.error)







// console.log('May Node be with you')

// const express = require('express');
// const bodyParser= require('body-parser')
// const app = express();
// const MongoClient = require('mongodb').MongoClient


// // MongoClient.connect('mongodb+srv://IronMark:Temp^Pass1@starwarscluster2.i7xsk.mongodb.net/?retryWrites=true&w=majority', 
// // { useUnifiedTopology: true}, 
// // (err, client) => {
// //     if (err) return console.error(err)
// //     console.log('Connected to Database')
// //   })

// // Same code as above, but with Promises:

// MongoClient.connect('mongodb+srv://IronMark:Temp^Pass1@starwarscluster2.i7xsk.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('STARWARS2')
//     const quotesCollection = db.collection('quotes')
//     app.use(bodyParser.urlencoded({ extended: true }))
//     app.get('/', (req, res) => {
//         res.sendFile('/Users/marka/Assignments/Star_Wars' + '/index.html')
//       })
//       app.set('view engine', 'ejs')
//       // app.post('/quotes', (req, res) => {
//       //   console.log(req.body)
//       // })
//       app.post('/quotes', (req, res) => {
//         quotesCollection.insertOne(req.body)
//           .then(result => {
//             console.log(result)
//           })
//       // app.listen(3000, function() {
//       //   console.log('listening on 3000')
//       // })

//   })
//    .catch(error => console.error(error))
//   })










// // Body-Parser
// // app.use(bodyParser.urlencoded({ extended: true }))



// // HANDLERS BELOW


// // app.listen(3000, function() {
// //     console.log('listening on 3000')
// //   })

// //   app.get('/', (req, res) => {
// //     res.sendFile('/Users/marka/Assignments/Star_Wars' + '/index.html')
// //   })

// //   app.post('/quotes', (req, res) => {
// //     console.log(req.body)
// //   })