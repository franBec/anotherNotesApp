import noteController from "../../../controllers/noteController";
import logger from "../../../services/logger";

//prettier-ignore
export default async function handler(req,res){
    const {method, query, body} = req
    var errorMessage = ''

    switch(method){
        case 'GET':
            try{
                logger.info('api/notes/index.js -> GET requested! query = '+JSON.stringify(query))                
                if(!query?.action){
                    errorMessage = 'api/notes/index.js -> action required'
                    logger.info(errorMessage)
                    
                    return res.status(400).json({
                      status: 400,
                      success: false,
                      data: [],
                      errorMessage: errorMessage
                    })
                }
        
                const results = await noteController(query)

                switch(results.status){
                    case 200:
                        return res.status(200).json(results)
                    case 400:
                        return res.status(400).json(results)
                    default:
                        return res.status(500).json(results)
                }

            }catch(error){
                errorMessage = 'api/notes/index.js -> GET error 500: exception = '+error.message
                logger.error(errorMessage)

                return res.status(500).json({
                    status: 500,
                    success: false,
                    data:[],
                    errorMessage: errorMessage
                })
            }
         
        case 'POST':
            try {
                logger.info('api/notes/index.js -> POST requested! body = '+JSON.stringify(body))
                if(!body?.action){
                    errorMessage = + 'api/notes/index.js -> action required'
                    logger.info(errorMessage)
                    
                    return res.status(400).json({
                        status: 400,
                        success: false,
                        data: [],
                        errorMessage: errorMessage
                    })
                }

                const results = await noteController(body)
                switch(results.status){
                    case 200:
                        return res.status(200).json(results)
                    case 400:
                        return res.status(400).json(results)
                    default:
                        return res.status(500).json(results)
                }

            } catch (error) {
                errorMessage = 'api/notes/index.js -> POST error 500: exception = '+error.message
                logger.error(errorMessage)
                return res.status(500).json({
                    status: 500,
                    success: false,
                    data:[],
                    errorMessage: errorMessage
                })
            }

        case 'PUT':
            try {
                logger.info('api/notes/index.js -> PUT requested! body = '+JSON.stringify(body))
                if(!body?.action){
                    errorMessage = 'api/notes/index.js -> action required'
                    logger.info(errorMessage)
                    errors.push(errorMessage)
                    
                    return res.status(400).json({
                    status: 400,
                    success: false,
                    data: [],
                    errorMessage: errorMessage
                    })
                }

                const results = await noteController(body)
                switch(results.status){
                    case 200:
                        return res.status(200).json(results)
                    case 400:
                        return res.status(400).json(results)
                    default:
                        return res.status(500).json(results)
                }
            } catch (error) {
                errorMessage = 'api/notes/index.js -> PUT error 500: exception = '+error.message
                logger.error(errorMessage)
                return res.status(500).json({
                    status: 500,
                    success: false,
                    data:[],
                    errorMessage: errorMessage
                })
            }

        case 'DELETE':
            try {
                logger.info('api/notes/index.js -> DELETE requested! body = '+JSON.stringify(body))
                if(!body?.action){
                    errorMessage = 'api/notes/index.js -> action required'
                    logger.info(errorMessage)
                    
                    return res.status(400).json({
                    status: 400,
                    success: false,
                    data: [],
                    errorMessage: errorMessage
                    })
                }

                const results = await noteController(body)
                switch(results.status){
                    case 200:
                        return res.status(200).json(results)
                    case 400:
                        return res.status(400).json(results)
                    default:
                        return res.status(500).json(results)
                }
            } catch (error) {
                errorMessage = 'api/notes/index.js -> DELETE error 500: exception = '+error.message
                logger.error(errorMessage)
                return res.status(500).json({
                    status: 500,
                    success: false,
                    data:[],
                    errorMessage: errorMessage
                })
            }

        default:
            errorMessage = 'api/notes/index.js -> DEFAULT error 405: method not allowed'
            logger.info(errorMessage)
            return res.status(405).json({
                status: 405,
                success: false,
                data:[],
                errorMessage: errorMessage
            })
    }
}
