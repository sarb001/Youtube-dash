
import { LoggerModel } from "./Schema/Logger.js";

async function loggerfn({ type , message }){
    try {
        const Response = await LoggerModel.create({
            type,
            message
        });
         await Response.save();
         console.log('Response =',Response);
         
    } catch (error) {
         console.log(' logger error  =',error);
    }
}

export default  loggerfn