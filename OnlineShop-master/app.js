var express = require('express');
var path = require('path');
var session = require('express-session');

var app = express();
var newUser;
// var flag1 = 0;
// var haveErr = 0;
// var login = 0;

// var galaxyToCart = 0;
// var boxingToCart = 0;
// var iphoneToCart = 0;
// var leavesToCart = 0;
// var sunToCart = 0;
// var tennisToCart = 0;

// var cart =0;

var products = ["Galaxy S21 Ultra","iPhone 13 Pro","Leaves of Grass","The Sun and Her Flowers","Boxing Bag","Tennis Racket"];
var links =["/galaxy","/iphone","/leaves","/sun","/boxing","/tennis"];
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session(
    {resave:false,
      saveUninitialized:true,
       secret:'mushimushi' }));

app.get('/', function (req, res) {
  res.render('login',{message:''})
});


app.get('/phones', function (req, res) {
  if (req.session.username != null) {

    res.render('phones')
  }
});

app.get('/books', function (req, res) {
  if (req.session.username != null) {

    res.render('books')
  }
});

app.get('/sports', function (req, res) {
  if (req.session.username != null) {
    res.render('sports')
  }
});

app.get('/boxing', function (req, res) {
  if (req.session.username != null) {
    res.render('boxing',{message:""})
  }
});

app.get('/galaxy', function (req, res) {
  if (req.session.username != null) {
    res.render('galaxy',{message:""})
  }
});



app.get('/iphone', function (req, res) {
  if (req.session.username != null) {
    res.render('iphone',{message:""})
  }
});

app.get('/leaves', function (req, res) {
  if (req.session.username != null) {
    res.render('leaves',{message:""})
  }
});

app.get('/sun', function (req, res) {
  if (req.session.username != null) {
    res.render('sun',{message:""})
  }
});

app.get('/tennis', function (req, res) {
  if (req.session.username != null) {
    res.render('tennis',{message:""})
  }
});






// Register
app.get('/registration', function (req, res) {
  res.render('registration',{message:""})
});

app.post('/register', async function (req, res) {
  newUser = { username: req.body.username, password: req.body.password , myCart : [String]};
  if(req.body.username=="" ||  req.body.password ==""){
    res.render('registration',{message:'Please Complete Your Information!'});

  }
  else{
  var { MongoClient } = require('mongodb');
  var uri ="mongodb+srv://admin:admin@cluster0.3gfp9.mongodb.net/first?retryWrites=true&w=majority";
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  await client.connect();
  var tmp = await client.db('first').collection('secondCollection').findOne({ username: newUser.username })
    if (tmp != null) {
      res.render('registration',{message:'This username already exists. Please choose a different one. '});

    } else {
      await client.db('first').collection('secondCollection').insertOne(newUser);
      req.session.username=req.body.username;
      req.session.password=req.body.password;
      res.render('home');
    }
    client.close();
  }
  }
  
);

//logging in succesful or not
app.post('/home', async function (req, res) {
  newUser = { username: req.body.username, password: req.body.password };
  req.session.username=req.body.username;
  req.session.password=req.body.password;
 // newUser = { username: req.body.username, password: req.body.password };
  var { MongoClient } = require('mongodb');
  var uri ="mongodb+srv://admin:admin@cluster0.3gfp9.mongodb.net/first?retryWrites=true&w=majority";
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
    var tmp = await client.db('first').collection('secondCollection').findOne(newUser);
    if (tmp != null) {
      res.render('home');
    }
  else{
    res.render('login',{message:'Invalid username or password'});
  }
  client.close();

});


// function errorMessage() {

//   var error = '/registration'.getElementById("error")



//   // Changing HTML to draw attention
//   error.innerHTML = "<span style='color: red;'>" +
//     "That username already exists</span>"

// }

app.post ('/galaxy', async function (req, res) {
  var { MongoClient } = require('mongodb');
  var uri ="mongodb+srv://admin:admin@cluster0.3gfp9.mongodb.net/first?retryWrites=true&w=majority";
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const c = await client.db('first').collection('secondCollection').findOne({username:req.session.username,password:req.session.password});
  var cobj=JSON.parse(JSON.stringify(c));
  var cart =cobj.myCart ;
  for (var i in cart){
      if(cart[i]=="Galaxy S21 Ultra"){
        res.render('galaxy', {message:"Product already in Cart"});
        client.close();
        return;
      }
  }
  await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "Galaxy S21 Ultra"}} );
  res.render('galaxy',{message:"Product Added Succesfuly!"});
  client.close();
}); 
app.post ('/boxing', async function (req, res) {
  var { MongoClient } = require('mongodb');
  var uri ="mongodb+srv://admin:admin@cluster0.3gfp9.mongodb.net/first?retryWrites=true&w=majority";
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const c = await client.db('first').collection('secondCollection').findOne({username:req.session.username,password:req.session.password});
  var cobj=JSON.parse(JSON.stringify(c));
  var cart =cobj.myCart ;
  for (var i in cart){
      if(cart[i]=="Boxing Bag"){
        res.render('boxing', {message:"Product already in Cart"});
        client.close();
        return;
      }
  }
  await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "Boxing Bag"}} );
  res.render('boxing',{message:"Product Added Succesfuly!"});
  client.close();
}); 

app.post ('/leaves', async function (req, res) {
  var { MongoClient } = require('mongodb');
  var uri ="mongodb+srv://admin:admin@cluster0.3gfp9.mongodb.net/first?retryWrites=true&w=majority";
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const c = await client.db('first').collection('secondCollection').findOne({username:req.session.username,password:req.session.password});
  var cobj=JSON.parse(JSON.stringify(c));
  var cart =cobj.myCart ;
  for (var i in cart){
      if(cart[i]=="Leaves of Grass"){
        res.render('leaves', {message:"Product already in Cart"});
        client.close();
        return;
      }
  }
  await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "Leaves of Grass"}} );
  res.render('leaves',{message:"Product Added Succesfuly!"});
  client.close();
}); 

app.post ('/tennis', async function (req, res) {
  var { MongoClient } = require('mongodb');
  var uri ="mongodb+srv://admin:admin@cluster0.3gfp9.mongodb.net/first?retryWrites=true&w=majority";
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const c = await client.db('first').collection('secondCollection').findOne({username:req.session.username,password:req.session.password});
  var cobj=JSON.parse(JSON.stringify(c));
  var cart =cobj.myCart ;
  for (var i in cart){
      if(cart[i]=="Tennis Racket"){
        res.render('tennis', {message:"Product already in Cart"});
        client.close();
        return;
      }
  }
  await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "Tennis Racket"}} );
  res.render('tennis',{message:"Product Added Succesfuly!"});
  client.close();
}); 
app.post ('/iphone', async function (req, res) {
  var { MongoClient } = require('mongodb');
  var uri ="mongodb+srv://admin:admin@cluster0.3gfp9.mongodb.net/first?retryWrites=true&w=majority";
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const c = await client.db('first').collection('secondCollection').findOne({username:req.session.username,password:req.session.password});
  var cobj=JSON.parse(JSON.stringify(c));
  var cart =cobj.myCart ;
  for (var i in cart){
      if(cart[i]=="iPhone 13 Pro"){
        res.render('iphone', {message:"Product already in Cart"});
        client.close();
        return;
      }
  }
  await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "iPhone 13 Pro"}} );
  res.render('iphone',{message:"Product Added Succesfuly!"});
  client.close();
}); 
app.post ('/sun', async function (req, res) {
  var { MongoClient } = require('mongodb');
  var uri ="mongodb+srv://admin:admin@cluster0.3gfp9.mongodb.net/first?retryWrites=true&w=majority";
  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const c = await client.db('first').collection('secondCollection').findOne({username:req.session.username,password:req.session.password});
  var cobj=JSON.parse(JSON.stringify(c));
  var cart =cobj.myCart ;
  for (var i in cart){
      if(cart[i]=="The Sun and Her Flowers"){
        res.render('sun', {message:"Product already in Cart"});
        client.close();
        return;
      }
  }
  await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "The Sun and Her Flowers"}} );
  res.render('sun',{message:"Product Added Succesfuly!"});
  client.close();
  }); 


app.post('/search', async function (req, res) {
  var searchword = req.body.Search;
  var res1 = ["","","","","",""]; //y
  var res2 = ["","","","","",""]; //x
  var counter = 0;
  for (let i =0; i<products.length ; i++){
    
    if(products[i].toLowerCase().includes(searchword.toLowerCase())){
       res1[counter] = products[i];
       res2[counter]= links[i];
       counter++;
    }
  }
  if(res1[0]=="")
    res.render('searchresults',{message:"Not found",x1:res2[0],x2:res2[1],x3:res2[2],x4:res2[3],x5:res2[4],x6:res2[5],
      y1:res1[0], y2:res1[1],y3:res1[2],y4:res1[3],y5:res1[4],y6:res1[5]})
  else{
  res.render('searchresults',{message:"",x1:res2[0],x2:res2[1],x3:res2[2],x4:res2[3],x5:res2[4],x6:res2[5],
                              y1:res1[0], y2:res1[1],y3:res1[2],y4:res1[3],y5:res1[4],y6:res1[5]});
  }
});


//view cart
app.get('/cart',async function (req, res) {
  var { MongoClient } = require('mongodb');
  var uri ="mongodb+srv://admin:admin@cluster0.3gfp9.mongodb.net/first?retryWrites=true&w=majority";

  var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  await client.connect();
  var res1=["","","","","",""];
  const c = await client.db('first').collection('secondCollection').findOne({username:req.session.username,password:req.session.password});
  var cobj=JSON.parse(JSON.stringify(c));
  var cart =cobj.myCart ;
  for (var i in cart){
      res[i]=cart[i];
  }
  res.render('cart',{x1:res[0],x2:res[1],x3:res[2],x4:res[3],x5:res[4],x6:res[5]});
  client.close();
});

//mongoDB connection
// async function main(req,res) {
//   var { MongoClient } = require('mongodb');
//   var uri ="mongodb+srv://admin:admin@cluster0.3gfp9.mongodb.net/first?retryWrites=true&w=majority";

//   var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
//   await client.connect();
  
//   // if (req.session.flag1 == 1) {
//   //   var tmp = await client.db('first').collection('secondCollection').findOne({ username: newUser.username })
//   //  // console.log(tmp);
//   //   req.session.haveErr = 0;
//   //   if (tmp != null) {
//   //     req.session.haveErr = 1;

//   //   } else {
//   //     await client.db('first').collection('secondCollection').insertOne(newUser);
//   //   }
//   //   req.session.flag1 = 0;

//   }
//   if (req.session.login == 1) {
//     var tmp = await client.db('first').collection('secondCollection').findOne(newUser);
    
//     if (tmp != null) {
//       req.session.login = 2;
     
      
//     }

//   }

// //   if (galaxyToCart == 1){
// //     await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "Galaxy S21 Ultra"}} );
// //     galaxyToCart =2
// //   }

// //   if (boxingToCart == 1){
// //     await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "Boxing Bag"}} );
// //     boxingToCart =2
// //   }

// // if (iphoneToCart == 1){
// //   await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "iPhone 13 Pro"}} );
// //   iphoneToCart =2
  
// // }

// // if (tennisToCart == 1){
// //   await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "Tennis Racket"}} );
// //   tennisToCart =2
  
// // }
// // if (sunToCart == 1){
// //   await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "The Sun and Her Flowers"}} );
// //   sunToCart =2
  
// // }
// // if (leavesToCart == 1){
// //   await client.db('first').collection('secondCollection').findOneAndUpdate( {username: req.session.username}, {$push : {myCart: "Leaves of Grass"}} );
// //   leavesToCart =2
  
// // }



//   // await client.db('first').createCollection("secondCollection");
//   //var user = {username: "User1", password: "pass1"};

//   // await client.db('first').collection('secondCollection').insertOne(user) ;

//   //var output = await client.db('first').collection('secondCollection').find().toArray();
//   //console.log(output);

//   client.close();
// }


// main().catch(console.error);
 if(process.env.PORT){
   app.listen(process.env.PORT,function(){console.log('Server started')});
 }
 else{
   app.listen(3000,function(){console.log('Server started on port 3000')});
 }

