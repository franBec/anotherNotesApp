import noteController from "../../../controllers/noteController";
import getCurrentUser from "../../../services/auth/getCurrentUser";

import logger from "../../../services/logger";

//prettier-ignore
export default async function handler(req,res){
    try {
        //get current user information
        const cookiename = process.env.COOKIENAME;
        const cookie = req.cookies[cookiename]
        const {currentUser, message} = await getCurrentUser(cookie)
        
        //check for status 403 forbidden
        if(!currentUser){
            const errorMessage = 'api/notes/index.js -> error 403: '+ message
            logger.info(errorMessage)
            return res.status(403).json({
                status: 403,
                success: false,
                data:[],
                errorMessage: errorMessage
            })  
        }
        
        //check for status 405 method not allowed
        const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']
        if(!allowedMethods.includes(req.method)){
            const errorMessage = 'api/notes/index.js -> error 405: method not allowed'
            logger.info(errorMessage)
            return res.status(405).json({
                status: 405,
                success: false,
                data:[],
                errorMessage: errorMessage
            })
        }

        //set params
        const params = req.method==='GET'? req.query : req.body

        //add current user to params, so controller can use it if needed
        params.currentUser = currentUser
        logger.info(`api/notes/index.js -> ${req.method} requested! params = ${JSON.stringify(params)}`)                
        
        //check for status 400 bad request
        if(!params?.action){
            const errorMessage = 'api/notes/index.js -> error 400: bad request, action required'
            logger.info(errorMessage)
            
            return res.status(400).json({
                status: 400,
                success: false,
                data: [],
                errorMessage: errorMessage
            })
        }

        //everything's ok! go to controller
        const results = await noteController(params)
        return res.status(results.status).json(results)
        
    } catch (error) {   
        const errorMessage = 'api/notes/index.js -> error 500: exception = '+error.message
        logger.error(errorMessage)
        return res.status(500).json({
            status: 500,
            success: false,
            data:[],
            errorMessage: errorMessage
        })
    }
}
