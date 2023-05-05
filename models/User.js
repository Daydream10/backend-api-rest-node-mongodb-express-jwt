import {Schema, model} from "mongoose";

const userSchema = new Schema ({
  email: {
    type: String, 
    requiered: true,
    trim: true,
    unique: true, 
    lowercase: true,
    index: {unique: true},
  },
  password:{
    type: String,
    required: true
  }
})

export const User = model('user',userSchema);