var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var mongoosedb = mongoose.connection;
mongoosedb.on("error", console.error.bind(console, "connection error:"));
mongoosedb.once("open", function callback(){
        console.log("CONNECTED");
});

var postschema = new Schema({
	  // _id: ObjectId,
	  postTitle: { type: String, required: true},
	  postContent: { type: String, required: true },
	  shortDescp: { type: String, required: true },
	  postUrl: String,
	  tags: [String],
	  userID: String,
	  alias: { type: String, required: true, unique: true },
	  createdOn: Number
	});

var Post = mongoose.model("model-post", postschema,"codePost");

module.exports = Post;