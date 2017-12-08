const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  title: String,
  description: String,
  image: String,
  rating: Number,
  from:{type: Schema.ObjectId, ref:'User'},
  place:{type: Schema.ObjectId, ref:'Place'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
