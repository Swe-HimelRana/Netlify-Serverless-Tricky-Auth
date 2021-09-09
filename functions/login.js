const {Login} = require('./auth')

exports.handler = async(event, context, callback) => {
  
    // Handle error
    if(!event.body){
        return {
            statusCode: 403,
            body: JSON.stringify({
                status: 'failed',
                msg: 'Forbidden'
            })
        }
    }
    // Now we have something let's start 
    
    let {username, password} = JSON.parse(event.body)

    console.log("Found username: ", username)
    console.log("Found password: ", password)

    let failed = {
        status: 'failed',
        msg: "Login Failed!"
    }
    if(!username && !password){
        return {
            statusCode: 200,
            body: JSON.stringify(failed)
        }
    }else if(username && password){
        // Checking login
        result = Login(username, password)
        
        if(result.status == "success"){
           let token = result.token
           return{
                statusCode: 200,
                body: JSON.stringify({
                    msg: "Login success",
                    token: token
                })
           }
        }else{
            return {
                statusCode: 401,
                body: JSON.stringify(failed)
            }
        }
         

    }else{
        return {
            statusCode: 401,
            body: JSON.stringify(failed)
        }
    }
}