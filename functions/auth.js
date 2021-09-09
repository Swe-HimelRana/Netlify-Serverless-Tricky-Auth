var md5 = require('md5');

function genToken(){
        let srv_username = process.env.SERVER_USERNAME
        let srv_password = process.env.SERVER_PASSWORD
        let ourString =  String(new Date().getDate()) + String(new Date().getMonth()) + String(new Date().getFullYear())
        gentoken = md5(srv_username + srv_password + ourString)
        console.log("From Gen Token: ", gentoken)
        return gentoken
}
 
module.exports = {
    ValidateToken(token){
        console.log('From Auth: received-token : ', token)
        
        console.log('From Auth: My token: ',  genToken())

        if(token == genToken()){
            return true
        }else{
            return false
        }
    },

    Login(username, password){
        let srv_username = process.env.SERVER_USERNAME
        let srv_password = process.env.SERVER_PASSWORD
        
        console.log("From Auth::login token: ", genToken())
    
        if(username == srv_username && password == srv_password){
            return {
                status: "success",
                token: genToken()
            }
        }else{
            return{
                status: "failed",
            }
        }
        
    }

}