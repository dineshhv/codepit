var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res) {
  res.render("index");
});*/

router.get('/login', function(req, res) {
  res.render("login");
});

router.get('/create', function(req, res) {
  res.render("create");
});
router.get('/dashboard', function(req, res) {
  var UHash=req.session.user
  res.render("dashboard", {title: 'res vs app render'});
});
router.get('/postadd', function(req, res) {
  var UHash=req.session.user
  res.render("postadd", {title: 'res vs app render'});
});
router.get('/view/:id', function(req, res) {
  var UHash=req.session.user
  res.render("view", {title: 'res vs app render'});
});

router.get('/index', function(req, res){
  res.render("index");
})


router.get('/appInfo', function(req, res) {
    var db = req.db;
    var collection = db.get('codeConfig');
    collection.find({},function(e,docs){
        if(docs.length>0)
        {
            var returnMsg={"errorCode":0,"response":docs}; 
           
        }
        else
        {
            var returnMsg={"errorCode":0,"msg":"no response"}; 
        }
         res.send(returnMsg);
        
    });
});

module.exports = router;
