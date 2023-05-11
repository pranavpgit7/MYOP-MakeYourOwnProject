var express = require('express');
var router = express.Router();

/* GET home page. */
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
  res.render('index', { products, admin:false });
});


router.post('/signup', (req,res)=>{
  console.log(req.body);  
})


module.exports = router;
