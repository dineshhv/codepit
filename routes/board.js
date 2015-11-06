var express = require('express');
var router = express.Router();

router.get('/info/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('codeProfile');
    collection.find({ userID: req.params.id },function(e,docs){
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