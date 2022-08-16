import noteController from "../../../controllers/noteController";
import { getCurrentUser_id } from "../../../services/auth/getCurrentUser";

import logger from "../../../services/logger";

//prettier-ignore
export default async function handler(req,res){
    try {
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

        //get current user information
        const cookiename = process.env.COOKIENAME;
        const cookie = req.cookies[cookiename]
        const {currentUserId, message} = await getCurrentUser_id(cookie)
        
        //check for status 401 unauthorized
        if(!currentUserId){
            const errorMessage = 'api/notes/index.js -> error 401: '+ message
            logger.info(errorMessage)
            return res.status(401).json({
                status: 401,
                success: false,
                data:[],
                errorMessage: errorMessage
            })  
        }
        
        //add current user to params, so controller can use it if needed
        params.currentUserId = currentUserId

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
