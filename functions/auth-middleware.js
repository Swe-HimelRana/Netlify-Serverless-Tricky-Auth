const {ValidateToken} = require('./auth')

module.exports = function authMiddleware(config){
  return ({
    before: (handler, next) => {
        console.log('From Middleware headers', handler.event.headers)
        if(!handler.event.headers.token){
            handler.callback(null, {
                statusCode: 401,
                body: JSON.stringify({
                    status: 'failed',
                    error: 'Unauthorized',
                    msg: 'No Authentication token provided'
                })
            })
        }
        else if(handler.event.headers.token){
            // Token verificaiton success
            if(ValidateToken(handler.event.headers.token) == true){
                return next() 
            }else{
                handler.callback(null, {
                    statusCode: 401,
                    body: JSON.stringify({
                        status: 'failed',
                        error: 'Unauthorized',
                        msg: 'Your token expired!'
                    })
                })
            }
                       
        }else{
            handler.callback(null, {
                statusCode: 401,
                body: JSON.stringify({
                    status: 'failed',
                    error: 'Unauthorized',
                    msg: 'Unknown Issue, Contact with administrator'
                })
            })
        }
    },
    onError: (handler, next) => {
        return handler.callback(null, {
            statusCode: 500,
            body: JSON.stringify({
                status: 'failed',
                error: 'Unknown Request',
                msg: 'If you see this error please contact with server administrator'
            })
        })
    }
  })
}
 