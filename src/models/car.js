import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  vin: String,
  brand: String,
  model: String,
  vehicleType: String,
  year: Number,
  mileage: String,
  condition: String,
  price: Number,
  dateOfAquisition: Date,
  available: String,
  image: String,
  color: String,
});

const Car = mongoose.model("cars", carSchema);

export default Car;