var express = require('express');
var router = express.Router();
var fs = require('fs');
router.get('/read', function(req, res) {

  fs.readFile('book.json',function(err,content){
    if(err) throw err;
    console.log(JSON.parse(content));
    res.send({book:JSON.parse(content)})
  })

});

router.post('/save', function(req, res) {
  console.log(req.body.book);
  fs.writeFile('book.json',req.body.book,function(err){
      if(err) throw err;
    })
});

module.exports = router;
