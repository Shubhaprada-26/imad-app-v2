var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('pg').pool;

var config={
    user:'coco98',
    database:'coco98',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var pool=new pool(config);
app.get('/test-db',function(req,res){
  pool.query('SELECT * FROM test',function(err,res){
      if(err){
          res.status('500').send(err.toString());
      }else
      {
          res.send(JSON.stringify(result));
      }
  }  );
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});



app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
