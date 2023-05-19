const db = require('../config/connection');
const collections = require('../config/collections');
const objectId = require('mongodb').ObjectId;

module.exports = {
    
    addProduct:(product, callback)=>{
        console.log(product);

        // creates collection "product" if doesn't exists already (default creates, no need to add specifically going to dbcompass one)
        db.get().collection(collections.PRODUCT_COLLECTION).insertOne(product).then((data)=>{
            console.log(data.insertedId);
            callback(data.insertedId);
        });
    },

    getAllProducts:()=>{
        return new Promise(async (resolve,reject)=>{
            let products = await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray();
            resolve(products)
        })
    },

    //remember for using objectId(productId) like this in the code, remember to require('mongodb').ObjectID, like in the above

    deleteProduct:(productId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).deleteOne({_id: new objectId(productId)}).then((response)=>{ 
                console.log(response);
                resolve(response);
            })
        })
    },

    getProductDetails:(productId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id : new objectId(productId)}).then((product)=>{
                resolve(product);
            })
        })
    },

    editProductDetails:(productId, productDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).updateOne({_id: new objectId(productId)}, 
                        {$set:{
                            title : productDetails.title,
                            category : productDetails.category,
                            description : productDetails.description,
                            price : productDetails.price
                        }}).then(()=>{
                            
                        })
            })
        }
    }
