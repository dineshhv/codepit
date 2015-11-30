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
	  username: { type: String, required: true, unique: true },
	  email: { type: String, required: true, unique: true },
	  password: String,
	  salt: String
	});

var User = mongoose.model("model-user", profileSchema,"codeUser");

module.exports = User;