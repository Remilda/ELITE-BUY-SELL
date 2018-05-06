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

AuctionSchema.methods.toJSON = function(user, category, images){
	var fullname = '';
	if(typeof user.firstname != 'undefined'){
		fullname += user.firstname;
	}
	if(typeof user.lastname != 'undefined'){
		fullname = fullname+" "+user.lastname;
	}
	return {
		_id: this._id,
		title: this.title,
		location: this.location,
		start_date: this.start_date,
		end_date: this.end_date,
		owner:{
			name: fullname,
			email: user.email,
			image:user.image,
			_id:user._id
		},
		minimum_price: this.minimum_price,
		description: this.description,
		is_sold:this.is_sold,
		img_name:this.img_name
	};
};

mongoose.model('Auction', AuctionSchema);
