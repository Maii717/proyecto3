const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  description:String,
  image:String,
  address: String,
  city: String,
  zipCode: String,
  location: { lat: Number, long: Number },
  category: {type: Schema.ObjectId, ref:'Category'},
  review:[{type: Schema.ObjectId, ref:'Review'}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
