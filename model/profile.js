var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var mongoosedb = mongoose.connection;
mongoosedb.on("error", console.error.bind(console, "connection error:"));
mongoosedb.once("open", function callback(){
        console.log("CONNECTED");
});

var profileSchema = new Schema({
	  // _id: ObjectId,
	  profileName: { type: String, required: true},
	  postCount: { type: Number, required: true },
	  profileImage : String,
	  preferenceTopic: {},
	  favourites: {},
	  rated: {},
	  userID: String,
	  createdOn: Number
	});

var profile = mongoose.model("model-profile", profileSchema,"codeProfile");

module.exports = profile;