var mongoose = require('mongoose');

var BidsSchema = new mongoose.Schema({
	email:{type:String, require:[true, "Email must be given"]},
	bid_amount:{type:Number, require:[true, "Price must be given"]},
	auction: {
	    type: mongoose.Schema.Types.ObjectId,
	    ref: 'Auction'
	}
}, {timestamps: true});


mongoose.model('Bids', BidsSchema);
