var express = require('express');
var router = express.Router();
var profile = require('../model/profile');

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
            var returnMsg={"errorCode":99,"msg":"no response"}; 
        }
         res.send(returnMsg);
        
    });
});

router.post('/profileImage/update', function(req, res) {
    var payload = req.body;
    // console.log(payload.userID)
    // var data = req.body.profileImage.replace(/^data:image\/\w+;base64,/, "");
    // var buf = new Buffer(data, 'base64');
    // res.send({});
    if(payload.userID)
    {
    
         profile.findOneAndUpdate({ userID: payload.userID }, {$set: {"profileImage":payload.profileImage}}, function(err, profile) {
            if (err){
                var returnMsg={"errorCode":0,"msg":"failed to update the image"}
            }
            else{
                var returnMsg={"errorCode":0,"msg":"Image saved Successfully"}
            }
            res.send(returnMsg);
        });
    }
});

module.exports = router;