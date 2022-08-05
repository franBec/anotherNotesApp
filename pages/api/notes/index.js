import noteController from "../../../controllers/noteController";

//prettier-ignore
export default async function handler(req,res){
    const {method, query, body} = req
    var errorMessage = ''

    switch(method){
        case 'GET':
            try{
                console.log(new Date().toUTCString()+' api/notes/index.js -> GET requested! query = '+JSON.stringify(query))                
                if(!query?.action){
                    errorMessage = new Date().toUTCString() + ' api/notes/index.js -> action required'
                    console.log(errorMessage)
                    
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
                errorMessage = new Date().toUTCString()+' api/notes/index.js -> GET error 500: exception = '+error.message
                console.log(errorMessage)

                return res.status(500).json({
                    status: 500,
                    success: false,
                    data:[],
                    errorMessage: errorMessage
                })
            }
         
        case 'POST':
            try {
                console.log(new Date().toUTCString() + ' api/notes/index.js -> POST requested! body = '+JSON.stringify(body))
                if(!body?.action){
                    errorMessage = new Date().toUTCString() + ' api/notes/index.js -> action required'
                    console.log(errorMessage)
                    
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
                errorMessage = new Date().toUTCString()+' api/notes/index.js -> POST error 500: exception = '+error.message
                console.log(errorMessage)
                return res.status(500).json({
                    status: 500,
                    success: false,
                    data:[],
                    errorMessage: errorMessage
                })
            }

        case 'PUT':
            try {
                console.log(new Date().toUTCString() + ' api/notes/index.js -> PUT requested! body = '+JSON.stringify(body))
                if(!body?.action){
                    errorMessage = new Date().toUTCString() + ' api/notes/index.js -> action required'
                    console.log(errorMessage)
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
                errorMessage = new Date().toUTCString()+' api/notes/index.js -> PUT error 500: exception = '+error.message
                console.log(errorMessage)
                return res.status(500).json({
                    status: 500,
                    success: false,
                    data:[],
                    errorMessage: errorMessage
                })
            }

        case 'DELETE':
            try {
                console.log(new Date().toUTCString() + ' api/notes/index.js -> DELETE requested! body = '+JSON.stringify(body))
                if(!body?.action){
                    errorMessage = new Date().toUTCString() + ' api/notes/index.js -> action required'
                    console.log(errorMessage)
                    
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
                errorMessage = new Date().toUTCString()+' api/notes/index.js -> DELETE error 500: exception = '+error.message
                console.log(errorMessage)
                return res.status(500).json({
                    status: 500,
                    success: false,
                    data:[],
                    errorMessage: errorMessage
                })
            }

        default:
            errorMessage = new Date().toUTCString()+' api/notes/index.js -> DEFAULT error 405: method not allowed'
            console.log(errorMessage)
            return res.status(405).json({
                status: 405,
                success: false,
                data:[],
                errorMessage: errorMessage
            })
    }
}
