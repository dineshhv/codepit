var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var session = require('express-session')
var ObjectID = require('mongodb').ObjectID

router.use(function(req, res, next) {
  if(req.session.user)
    req.user = req.session.user;
  else
  	req.user =null;
  next();
});

router.get('/all', function(req, res) {
    var db = req.db;
    

    var collection = db.get('codePost');
    collection.find({ userID: req.user },'',function(e,docs){
       if(docs&&docs.length>0)
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

router.get('/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('codePost');
    var options = {
	    "limit": 10,
	    "sort": {createdOn: -1}
	}
    collection.find({ userID: req.params.id },options,function(e,docs){
    	if(docs&&docs.length>0)
        {
            var records={};
        		records.data=docs;
        		records.after=docs[docs.length-1].createdOn;
        		records.requested=req.params.dt;

            var returnMsg={"errorCode":0,"response":records}; 
           
        }
        else
        {
            var returnMsg={"errorCode":99,"msg":"no response"}; 
        }
        res.send(returnMsg);
    });
});

router.get('/viewby/:postid', function(req, res) {
    var db = req.db;
    var collection = db.get('codePost');
    var options = {
        "limit": 10,
        "sort": {createdOn: -1}
    }
    collection.find({ _id: req.params.postid },options,function(e,docs){
        if(docs&&docs.length>0)
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

router.get('/search/:query', function(req, res) {
    var db = req.db;
    var collection = db.get('codePost');
    var options = {
        "limit": 10,
        // "score" : { $meta: "textScore" },
        // "sort": { score: { $meta: "textScore" } }
    }
    // collection.find({$or:[{postTitle:{ $regex:req.params.query}},{postContent:{$regex:req.params.query}},{tags:{$regex:req.params.query}}]},options,function(e,docs){
    //     if(docs.length>0)
    //     {
    //         var returnMsg={"errorCode":0,"response":docs}; 
           
    //     }
    //     else
    //     {
    //         var returnMsg={"errorCode":99,"msg":"no response"}; 
    //     }
    //     res.send(returnMsg);
    // });
     
    collection.find({ $text: { $search: req.params.query }},options,function(e,docs){
        if(docs&&docs.length>0)
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

router.get('/:postid/related/:tags', function(req, res) {
    var db = req.db;
    var collection = db.get('codePost');
    var options = {
        "limit": 4,
        "sort": {createdOn: -1}
    }
    var _id = new ObjectID(req.params.postid);
    

    var list = req.params.tags.split(",");
    collection.find({ $and: [ { tags: { $in: list } }, { _id: { $ne: _id } } ] }, options,function(e,docs){
        if(docs&&docs.length>0)
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

router.get('/:id/after/:dt', function(req, res) {
    var db = req.db;
    var collection = db.get('codePost');
    var options = {
	    "limit": 10,
	    "sort": {createdOn: -1}
	}
    collection.find({ userID: req.params.id, createdOn: {$lt:parseInt(req.params.dt)} },options,function(e,docs){
    	// res.send(docs);
    	if(docs&&docs.length>0)
        {
        	var records={};
        		records.data=docs;
        		records.after=docs[docs.length-1].createdOn;
        		records.requested=req.params.dt;

            var returnMsg={"errorCode":0,"response":records}; 
           
        }
        else
        {
            var returnMsg={"errorCode":99,"msg":"no response"}; 
        }
        res.send(returnMsg);
    });
});

router.get('/:id/before/:dt', function(req, res) {
    var db = req.db;
    var collection = db.get('codePost');
    var options = {
	    "limit": 10,
	    "sort": {createdOn: -1}
	}
    collection.find({ userID: req.params.id, createdOn: {$gt:parseInt(req.params.dt)} },options,function(e,docs){
    	if(docs&&docs.length>0)
        {
        	var records={};
        		records.data=docs;
        		records.after=docs[docs.length-1].createdOn;
        		records.requested=req.params.dt;

            var returnMsg={"errorCode":0,"response":records}; 
           
        }
        else
        {
            var returnMsg={"errorCode":99,"msg":"no response"}; 
        }
        res.send(returnMsg);
    });
});

router.post('/addPost', function(req, res) {
	var db = req.db;
	var payload=req.body;
	// payload.userID=req.user;
    delete payload.createdOn;
	payload.createdOn=Date.now();
    console.log(payload.createdOn)
	if(req.user||payload.userID)
	{
		var collection = db.get('codePost');
		
	    collection.insert(payload, function (err, doc) {
	        if (err) {
	            
	            msg="There was a problem adding the information to the database.";
	            var returnMsg={"errorCode":101,"msg":msg}
	            res.send(returnMsg);
	        }
	        else {
	           
	            var collupdate = db.get('codeProfile');
	            
	            collupdate.update(
				    {userID:payload.userID},
				    {$inc:{postCount:1, "metrics.orders": 1}},
				    {upsert:true,safe:false},
				    function(err,data){
				        if (err){
				            
				        }else{
				            
				        }
				    });
	           	var returnMsg={"errorCode":0,"msg":"Successfully Added","postID":doc._id}
	            res.send(returnMsg);
	        }
	    });
	}
	else
	{
		 var returnMsg={"errorCode":99,"msg":"Session Expired"}
		 res.send(returnMsg);
	}

    
});


module.exports = router;