

// logger -  certain event happens log it 

//  event type
//  event message
//  time 

import mongoose from "mongoose";

const LoggerSchema = new mongoose.Schema({
     type : String,
     message : String,
},{
    timestamps : true,
})

// kind of table name 
export const LoggerModel = mongoose.model('MainLogger',LoggerSchema)



