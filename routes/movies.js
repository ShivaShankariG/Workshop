var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var db;
mongoClient.connect("mongodb://127.0.0.1:27017", function(err, connection){
  db=connection.db("projector");
})

/* GET users listing. */
router.get('/', function(req, res) {
  var moviesCollection=db.collection("movies");
  moviesCollection.find().toArray(function(err, data){
    res.json(data);
  })
 /* res.json(
    {
      "name":"avatar"
    }
  )*/
});
router.get('/all', function(req, res, next) {
  res.send('respond with another resource');
});

router.get('/:movieName', function(req, res) {
  var mn = req.params.movieName;
  var moviesCollection=db.collection("movies");
  moviesCollection.find({"name":mn}).toArray(function(err, data){
    res.json(data);
/*  res.json(
    {
      "name":mn
        }
  )*/
});
});

router.post('/addMovie',function(req, res, next) {
  var movie =req.body;
  var moviesCollection=db.collection("movies");
  moviesCollection.insert(movie, (function(err, data){
    if(!err) res.json({ isSuccess: true})
    else res.json({isSuccess: false})
    }))
});


module.exports = router;
