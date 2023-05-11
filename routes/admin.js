var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

/* GET users listing. */
router.get('/', function(req, res, next) {
  const products = [
    {
      name : "iphone",
      title: "mobile",
      description : "iOS",
      price : "$999",
      image : "https://idestiny.in/wp-content/uploads/2022/09/iPhone_14_Pro_Deep_Purple_PDP_Image_Position-1a_Avail__en-IN.jpg"
    },
    {
      name : "iphone",
      title: "mobile",
      description : "iOS",
      price : "$999",
      image : "https://idestiny.in/wp-content/uploads/2022/09/iPhone_14_Pro_Deep_Purple_PDP_Image_Position-1a_Avail__en-IN.jpg"
    },
    {
      name : "iphone",
      title: "mobile",
      description : "iOS",
      price : "$999",
      image : "https://idestiny.in/wp-content/uploads/2022/09/iPhone_14_Pro_Deep_Purple_PDP_Image_Position-1a_Avail__en-IN.jpg"
    },
    {
      name : "iphone",
      title: "mobile",
      description : "iOS",
      price : "$999",
      image : "https://idestiny.in/wp-content/uploads/2022/09/iPhone_14_Pro_Deep_Purple_PDP_Image_Position-1a_Avail__en-IN.jpg"
    }
  ]
  res.render('index', { products, admin:true });
});

router.post('/signup', (req,res)=>{
  console.log(req.body);  
  const result = req.body;
  res.send(result);
})

module.exports = router;
