var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers');
const userHelper = require('../helpers/user-helpers');
const bcrypt = require('bcrypt');

const verifyLogin = (req,res,next) => {
  if(req.session.loggedIn)
  {
    next(); //that is go to the next line of code, where it is called from
  }else{
    res.redirect('/login');
  }
}

// const app = express();
// const bodyParser = require('body-parser')

// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

/* GET home page. */
router.get('/', function(req, res, next) {

  let user = req.session.user; //if logged in, the details inside user object {} typically stored in router.post('/login') just check
  console.log(user);

  productHelper.getAllProducts().then((products)=>{
    // console.log(products);    //on enabling this, the whatever products that are listed in the homepage will be console logged
    res.render('users/index', { products, admin:false, user });
  })
});


router.get('/login',(req,res)=>{
  if(req.session.loggedIn)
  {
    res.redirect('/');
  }else{
    res.render('users/login', {"loginErr" : req.session.loginErr});
    req.session.loginErr = false;
  }
  
});

router.get('/signup', (req,res)=>{
  res.render('users/signup')
});

router.post('/signup', (req,res)=>{
  console.log(req.body);


  // (async () => {
  //   req.body.password = await bcrypt.hash(req.body.password, 10);
  //   console.log(req.body.password);
  // })();
  
  // res.send(req.body)

  // (async () => {
  //   const result = await bcrypt.hash("Password", 10);
  //   console.log(result);
  //   })();


  userHelper.doSignUp(req.body).then((response)=>{
    console.log(response);
  }).catch((err)=> console.log(err))
})

router.post('/login', (req,res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status)
    {

      req.session.loggedIn = true;
      req.session.user = response.user;

      res.redirect('/');
    }else{
      req.session.loginErr = "Invalid email or password";
      res.redirect('/login')
    }
    // res.send(response);
  })
})

router.get('/logout', (req,res)=>{
  req.session.destroy();
  res.redirect('/');
})

router.get('/cart', verifyLogin, (req,res)=>{

  res.render('users/cart');

  // if(req.session.loggedIn)
  // {
  //   res.render('users/cart');
  // }else{
  //   res.redirect('/login');
  // }                                          //instead of using this method, where whenever similar functioning button is required, we will have to write this code for every buttons, so to simplify it, we will use a middleware instead.
  
})

module.exports = router;
