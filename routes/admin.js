var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers');
// const mv = require('mv'); /npm package mv for img.mv, not that important I guess
// const fs = require('fs'); /for moving or deleting files

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products', { products, admin:true });
  })
  
});

router.get('/add-products', (req,res)=>{
  res.render('admin/add-products', {admin:true});
});

router.post('/add-products', (req,res)=>{
  console.log(req.body);
  console.log(req.files.image);

  productHelper.addProduct(req.body, (id)=>{
    let img = req.files.image;
    img.mv('./public/product-images/' + id + '.jpg', (err,done)=>{
      if(!err)
      {
        res.render('admin/add-products', {admin:true});
      }else{
        console.log(err);
      }
    })
    
  });

});

router.get('/delete-product/:id', (req,res)=>{
  let proId = req.params.id;            
  
  productHelper.deleteProduct(proId).then((response)=>{
    res.redirect('/admin');
  })
  
  // console.log(proId);
  // console.log(req.query.name);
});

router.get('/edit-product/:id', async (req,res)=>{
  let product = await productHelper.getProductDetails(req.params.id)
  console.log(product);

  res.render('admin/edit-product', {admin:true, product})
});

router.post('/edit-product/:id', (req, res) => {
  let image = req.files.image;
  productHelper.editProductDetails(req.params.id, req.body).then(() => {
    if (req.files.image) {
      image.mv('./public/product-images/' + req.params.id + '.jpg', (error) => {
        if (error) {
          console.error(error);
        }
        console.log("Image uploaded successfully");
        res.redirect('/admin');
      });
    } else {
      console.log("updated !!!");
      res.redirect('/admin');
    }
  });
});



module.exports = router;
