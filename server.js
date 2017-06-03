var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var pg = require('pg');
var config = {
  database: 'omega',
  host: 'localhost',
  port: 5432,
  max: 12
};
var pool = new pg.Pool( config );

app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

var searchData = [];

app.listen( 8000, function(){
  console.log('server 8000');
});

app.get('/', function(req, res){
  console.log('URL hit');
  res.sendFile( path.resolve( 'view/index.html' ) );
});

app.get('/list', function(req, res){
  var listResults = [];
  console.log('URL hit');
  pool.connect( function( err , connection , done ){
    if (err){
      console.log('error in connection', err);
      done();
      res.send( 400 );
    }
    else {
      var listData = connection.query('SELECT * FROM task_list');

      listData.on( 'row', function(row){
        listResults.push(row);
      });
      listData.on( 'end', function(){
        done();
        res.send(listResults);
      });
    }
  });
});

app.post('/list', function(req, res){
  console.log('Post hit');
  console.log(req.body);
  var name = (req.body).name;
  var details = (req.body).details;
  pool.connect( function( err , connection , done ){
    if (err){
      console.log('error in connection', err);
      done();
      res.send( 400 );
    }
    else {
      var listInfo = connection.query("INSERT INTO task_list (task_name, task_details, completed) Values ('" + name +
      "', '" + details + "', 'false' )");
      console.log(listInfo);
      done();
      res.send('success');
    }
  });
});

app.post('/listComp', function(req, res){
  console.log('Post hit');
  console.log(req.body);
  var name = (req.body).name;
  var details = (req.body).details;
  pool.connect( function( err , connection , done ){
    if (err){
      console.log('error in connection', err);
      done();
      res.send( 400 );
    }
    else {
      var listInfo = connection.query("UPDATE task_list SET completed = 'true' WHERE" +
    "(task_name = '" + name + "') AND (task_details = '" + details + "')");
      done();
      res.send('successful update');
    }
  });
});
