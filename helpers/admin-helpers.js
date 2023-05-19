const db = require('../config/connection');
const collections = require('../config/collections');
const bcrypt = require('bcrypt');

module.exports = {
    adminSignUp:(userData)=>{
        
        return new Promise(async (resolve,reject)=>{
            userData.password = await bcrypt.hash(userData.password,10); //creating hash
            console.log(JSON.stringify(userData));

            db.get().collection(collections.ADMIN_COLLECTION).insertOne(userData).then((data)=>{
                console.log(data.insertedId);
                resolve(data.insertedId);
            }).catch((error) => {
                console.error(error);
                reject(error);
        })
        
    })
},

    adminLogin:(userData)=>{

        return new Promise(async (resolve,reject)=>{
            let loginStatus = false;
            let response = {};

            let user = await db.get().collection(collections.USER_COLLECTION).findOne({email : userData.email}) //probably returns either true or false as the value resultant
            if(user) //that is if true then works the code below or following code
            {
                bcrypt.compare(userData.password, user.password).then((status)=>{
                    if(status)
                    {
                        response.user = user;
                        response.status = true;

                        console.log("Login Successful");
                        resolve(response);
                        // resolve("Login Success");
                    }else{
                        console.log("Login Failed");
                        resolve({status : false});
                    }
                })
                
            }else{
                console.log("Login Failed");
                resolve({status : false})
            }
        })
    }
}