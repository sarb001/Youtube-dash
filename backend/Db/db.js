import mongoose from "mongoose";


export const dbconnection = async() => {

    try {
        const Response  = await mongoose.connect(process.env.MONGO_URI,{
                dbName : 'logger'
       });
       const DbName = Response?.connection?.name;
       console.log(` ${DbName} Database is connected Successfully `);          
     } catch (error) {
        console.log('error -',error);   
        throw error
     }
}

