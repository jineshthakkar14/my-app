const mongoose = require("mongoose");

// Define the Tags schema
const solarSchema = new mongoose.Schema({
	positionX: {
		type:Number,
		
	},
    positionY: {
		type:Number,
		
	},
	links:[
		{
			type:Object,
		}
	],
	
});

// Export the Tags model
module.exports = mongoose.model("Solar", solarSchema);