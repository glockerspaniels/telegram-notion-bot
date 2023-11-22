import mongoose from 'mongoose'

const foodLoggerSchema = new mongoose.Schema({
  date: { type: Date },
  foodName: { type: String },
  mealType: { type: String },
  user: { type: String }
}, { collection: 'food-logger' })

const FoodLogger = mongoose.model('food-logger', foodLoggerSchema)

export default FoodLogger