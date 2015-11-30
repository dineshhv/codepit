var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var session = require('express-session')
var user = require('../model/user');
var profile = require('../model/profile');

router.use(function(req, res, next) {
  if(req.session.user)
    req.user = req.session.user;
  else
    req.user =null;
  next();
});

/**
 * @api {get} /users/all
 * @apiName all users
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiSampleRequest  http://localhost:3003/users/all
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3003/users/all
 *
 * @apiSuccess {String} _id  _id of the User. 
 * @apiSuccess {String} username  username of the User.
 */
router.get('/all', function(req, res) {
    var db = req.db;
    
    var collection = db.get('User');
    collection.find({}, {fields : { salt:0, password:0} },function(e,docs){
    	res.send(docs);
    });

});

/**
 * @api {get} /users/session Request User information
 * @apiName GetSession
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiSampleRequest  http://localhost:3003/users/session
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3003/users/session
 *
 * @apiSuccess {String} session session of the User.
 */

router.get('/session', function(req, res) {
    if(req.session.user)
        var returnMsg={"errorCode":0,"UHash":req.session.user};
    else
        var returnMsg={"errorCode":99,"msg":"no session details available "+req.session.user};
    res.send(returnMsg);
});


/**
 * @api {get} /users/:id
 * @apiName  user by id
 * @apiGroup User
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} [id]  Optional Firstname of the User.
 *
 * @apiSampleRequest  http://localhost:3003/users/:id
 *
 * 
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3003/users/:id
 *
 *
 * @apiSuccess {String} _id  _id of the User. 
 * @apiSuccess {String} username  username of the User.
 */

router.get('/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('User');
    collection.find({ _id: req.params.id }, {fields : { salt:0, password:0} },function(e,docs){
    	// res.render('userlist', {
     //        "userlist" : docs
     //    });
        res.send(docs);
    });
});



router.post('/login', function(req, res) {
    

    var payload=req.body;

    payload.password = new Buffer(payload.password, 'base64').toString('ascii');
    if(payload.username&&payload.password)
    {
        user.find({ username: payload.username }, function(err, user) {
          if (err){
                msg="No user info found, please register";
                var returnMsg={"errorCode":101,"msg":msg}
                res.send(returnMsg);
            }
            var hash = user[0]['password'];
            console.log(payload.password)
            bcrypt.compare(payload.password, hash, function(err, response) {
                console.log(response)
                if(response)
                {
                   req.session.user=user[0]._id;
                   req.session.save(function(err) {
                      // session saved
                    })
                   var returnMsg={"errorCode":0,"msg":"Successfully login","UHash":req.session.user}; 
                }
                else
                {
                    var returnMsg={"errorCode":99,"msg":"Login failed"};
                }
                
                res.send(returnMsg);
            });
         
        });
        

    }
    else
    {
        var returnMsg={"errorCode":100,"msg":"Failed"+buf}
        res.send(returnMsg);
    }
})

router.post('/adduser', function(req, res) {

    
    var payload = req.body;
    payload.password = new Buffer(payload.password, 'base64').toString('ascii');
    if(payload.username&&payload.password)
    {

	    bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(payload.password, salt, function(err, hash) {
                payload.password = hash;
                payload.salt = salt;
                var newUser= user(payload);
                

                newUser.save(function(err, doc) {
                    if (err) {
                        if(err.code==11000)
                        {
                            msg="Username Already available";
                        }
                        else
                        {
                            msg="There was a problem adding the information to the database.";
                        }
                        var returnMsg={"errorCode":101,"msg":msg}
                        res.send(returnMsg);
                    }
                    else {
                        
                        var mydocID = doc._id;
                        req.session.user=mydocID;

                        var newProf = {
                          profileName     : doc.username,
                          postCount       : 0,
                          preferenceTopic : {},
                          favourites      : {},
                          rated           : {},
                          userID          : doc._id,
                          profileImage    : "",
                        }
                        profile.createdOn = Date.now()
                        
                        var newProfile = profile(newProf);
                        // res.send(newProfile);
                        
                        newProfile.save(function(err,doc) {
                          if (err){
                            var returnMsg={"errorCode":101,"msg":err}
                            res.send(returnMsg);
                          }
                          var returnMsg={"errorCode":0,"msg":"Successfully Added","UHash":mydocID}
                          res.send(returnMsg);
                          
                        });
                       
                    }
                });
            });
        });
    //     // Submit to the DB
	    

    }
    else
    {
    	var returnMsg={"errorCode":100,"msg":"Failed"}
	    res.send(returnMsg);
    }
});



router.post('/profile', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    
    // Get our form values. These rely on the "name" attributes
    var UHash = req.param('userHash');
    // Set our collection
    var collus = db.get('codeUser');
    collus.find({ _id: UHash },{},function(e,docs){
        if(docs.length>0)
        {
            profileName=docs[0].username;
            postCount=0;
            preferenceLanguage=[];
            favourites={};
            rated={};
            var collection = db.get('codeProfile');
            collection.insert({
                "profileName"            : profileName,
                "postCount"          : postCount,
                "preferenceLanguage"    : preferenceLanguage,
                "favourites" : favourites,
                "rated": rated,
                "userID":UHash
                }, function (err, doc) {
                    if (err) {
                                // If it failed, return error
                        var returnMsg={"errorCode":101,"msg":"There was a problem adding the information to the database."}
                        res.send(returnMsg);
                    }
                    else {
                        var returnMsg={"errorCode":0,"msg":"Successfully Added"}
                        res.send(returnMsg);
                        
                    }
                 
                
            });
        }
        else
        {
            var returnMsg={"errorCode":0,"msg":"no response"};
            res.send(returnMsg); 
        }
    });

    
     
});
module.exports = router;
