var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var AuctionSchema = new mongoose.Schema({
	title: {type:String, require: [true, "Title is required"]},
	location: {type:String, require:[true, "Location is required"]},
	start_date: {type:Date, require: [true, "Mention when will be aution starts"]},
	end_date: Date,
	owner: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'User',
	    default:null
	},
	minimum_price:{type:Number, require:[true, "Price must be given"]},
	description: {type:String, require:[true, "Description is required"]},
	img_name: {type:String},
	img_path: {type:String}
}, {timestamps: true});


mongoose.model('Auction', AuctionSchema);
