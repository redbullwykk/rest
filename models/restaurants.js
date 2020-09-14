const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

const RestaurantSchema = mongoose.Schema({
    restaurant_name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: false
    },
    address:{
        type: String,
        required: false
    }
});

const Restaurant = module.exports = mongoose.model('Restaurant', RestaurantSchema);