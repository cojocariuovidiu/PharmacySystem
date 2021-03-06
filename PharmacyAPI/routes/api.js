var express=require('express');
var router=express.Router();
var User=require('../models/User');

var jwt         = require('jwt-simple'); //to get the token in node js
var config      = require('../config/database'); // get db config file
var passport	= require('passport');// authentication library, sessions are apart of authorization
// var getToken=require('../commons/utilities');


router.get('/test',function (req, res) {
    return res.json({success:true});
});
router.get('/test2',function (req, res) {
    return res.json({success:true,msg:"Test 2"});
});

/**
 * sign up
 */


router.post('/sign-up',function (req, res) {
    // if(!req.body.email||!req.body.password||!req.body.userName||!req.body.firstName||!req.body.lastName||!req.body.position||!req.body.contactno){
    //     res.json({success:false,msg:'Enter the missing details'});
    // }
    if(1==2){

    }
    else{
        var newUser=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            userName:req.body.userName,
            position:req.body.position,
            email:req.body.email,
            contactno:req.body.contactno,
            password:req.body.password
        });
        newUser.save(function (err) {
            if(err){
                console.log(err)
                res.json({success:false,msg:'Your username or password is incorrect.'});
            }
            else{
                res.json({success:true,msg:'User created'});

            }
        })
    }
});

/**
 * user login
 * generate a token
 */
router.post('/authenticate',function (req, res) {
    User.findOne({userName:req.body.userName},function (err, user) {
        console.log(req.body.userName);
        if(err) throw err;
        if(!user){
            return res.status(403).send({success:false,msg:"Authentication fails find user"});
        }
        else{
            user.comparePassword(req.body.password,function (err, isMatch) {
                if(isMatch && !err){
                    var token=jwt.encode(user,config.secret);
                    return res.json({success:true,token:'JWT '+token,msg:"Authentication success",position:user.position,
                        firstName:user.firstName,lastName:user.lastName,email:user.email,contactno:user.contactno});

                }
                else{
                    return res.status(403).send({success:false,msg:"Authentication fails"});
                }
            })
        }
    })
});





module.exports=router;