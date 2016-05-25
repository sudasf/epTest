var express = require('express');
var router = express.Router();
var mongoose=require('mongoose')
var bcrypt=require('bcrypt')
var db=mongoose.connect('mongodb://localhost/test')
var UserSchema=new mongoose.Schema({
	name:String,
	password:String,
})
// var a=require('./a').a
// var add=require('./a').add

global.a1=1

var User=mongoose.model('User',UserSchema)

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' });
});

router.get('/login',function(req, res, next){
	res.render('login');
}).post('/login',function(req,res,next){
	var obj=req.body
	//console.log(obj)
	var username=obj.name
	var psd=obj.password
	if(username&&psd){
		User.findOne({name:username},function(err,doc){
			if(err) return next(err)
			//console.log(setHash(psd))
			if(doc){
				if(doc.password==psd){
				req.session.user=username
				res.redirect('/home')
				}else{
					res.redirect('/login')
				}
			}else{
				res.redirect('/login')
			}
			
		})
	}else{
		res.redirect('/login')
	}
})

router.get('/register',function(req, res, next){

	res.render('register');
}).post('/register',function(req, res, next){
	var obj=req.body
	//console.log(obj)
	var username=obj.name
	var psd=obj.password
	if(username&&psd){
		User.find({name:username},function(err,doc){
			if(err) return next(err)
			//console.log(setHash(psd),psd)
			if(doc.length==0){
				var myuser=new User({
					name:username,
					password:psd
				})
				myuser.save(function(err){
					req.session.user=username
					res.redirect('/home')
				})
			}else{
				res.redirect('/register')
			}
			
		})
	}else{
		res.redirect('/register')
	}
})

router.get('/home',function(req, res, next){

	res.render('home');
})

router.get('/logout',function(req, res, next){
	req.session.user=null
	res.redirect('/login')
})

router.get('/rn',function(req,res,next){
	res.json({name:'sunfeng'})
})

router.get('/map/:x/:y',function(req,res,next){
	res.render('map',{x:req.params.x,y:req.params.y})
})

function setHash(psd){
	var salt=bcrypt.genSaltSync(6)
	var hash=bcrypt.hashSync(psd,salt)
	return hash 
}

module.exports = router;
