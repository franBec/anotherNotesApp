import logger from "../../../services/logger";
import signupController from "../../../controllers/signupController";

//prettier-ignore
export default async function handler(req,res){
    try {
        //check for status 405 method not allowed
        if(req.method !== 'POST'){
            const errorMessage = 'api/signup/index.js -> error 405: method not allowed'
            logger.info(errorMessage)
            return res.status(405).json({
                status: 405,
                errorMessage: errorMessage
            })
        }

        //everything's ok! go to controller
        const results = await signupController(req.body)
        return res.status(results.status).json(results)
        
    } catch (error) {   
        const errorMessage = 'api/signup/index.js -> error 500: exception = '+error.message
        logger.error(errorMessage)
        return res.status(500).json({
            status: 500,
            errorMessage: errorMessage
        })
    }
}
