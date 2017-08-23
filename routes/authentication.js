const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

  router.post('/register', (req,res) =>{
    //req.body.email
    if(!req.body.email){
      res.json({ success: false, message:"You need to enter your email"});
    }else{
      if(!req.body.username){
        res.json({ success: false, message:"You need to enter your username"});
      }if(!req.body.password){
        res.json({ success: false, message:"You need to enter your password"});
      }else{
        let user = new User({
          email: req.body.email.toLowerCase(),
          username: req.body.username.toLowerCase(),
          password: req.body.password
        });
        user.save((err) => {
          if(err){
            if(err.code === 1100){
                res.json({ success: false, message:"Username or email already exsists"});
            } else {
              if(err.errors){
                if(err.errors.email){
                  res.json({ success: false, message: err.errors.email.message});
                }else{
                  if(err.errors.username){
                    res.json({ success: false, message: err.errors.username.message});
                  }else{
                    if(err.errors.password){
                      res.json({ success: false, message: err.errors.password.message});
                    }else {
                      res.json({ success: false, message: err});
                    }
                  }
                }
              } else{
                res.json({ success: false, message:"Username or E-mail already exsists"});
            }
          }
        } else {
            res.json({success:true, message:"User saved"})
          }

        });
    }
  }
  });

  // Query to verify if the email is available

  router.get('/checkEmail/:email', (req,res) => {
    if(!req.params.email){
      res.json({ success: false, message: 'E-mail was not provided'});
    }else{
      User.findOne({ email: req.params.email}, (err,user) => {
        if(err){
          res.json({ success: false, message: err});
        }else{
          if(user){
            res.json({ success:false, message: 'E-mail already exsists'});
          }else{
            res.json({ success:true, message: 'Email is available'});
          }
        }
      });
    }
  });

// Query to verify if the username is available

  router.get('/checkUsername/:username', (req,res) => {
    if(!req.params.username){
      res.json({ success: false, message: 'Username was not provided'});
    }else{
      User.findOne({ username : req.params.username}, (err,user) => {
        if(err){
          res.json({ success: false, message: err});
        }else{
          if(user){
            res.json({ success:false, message: 'Username already exsists'});
          }else{
            res.json({ success: true , message: 'Username is available'});
          }
        }
      });
    }
  });

  router.post('/login', (req,res) => {
    if (!req.body.username) {
      res.json({success: false, message: 'No username was provided'});
    }else {
      if (!req.body.password) {
        res.json({success: false, message: 'No password was provided'});
      } else {
        User.findOne({ username: req.body.username.toLowerCase() }, (err,user) => {
          if (err) {
            res.json({success: false, message: err });
          }else {
            if (!user) {
              res.json({success: false, message: 'Username not found'});
            }else {
              const validPassword = user.comparePassword(req.body.password);
              if (!validPassword){
                res.json({success: false, message: 'Password Invalid'});
              }else{
                const token = jwt.sign({ userId: user._id }, config.secret, {expiresIn: '24h' });
                res.json({ success: true, message: 'Success!!', token:token, user: { username: user.username }});
              }
            }
          }
        });
      }
    }

  });
  //anything requiring authentication would go after this

  router.use((req,res,next) => {
    const token = req.headers['authorization'];
    if (!token) {
      res.json({success:false, message: 'No token provided'});
    }else {
      jwt.verify(token, config.secret, (err,decoded) => {
        if (err) {
          res.json({success:false, message:'Token invalid '+err});
        }else {
          req.decoded = decoded;
          next();
        }
      })
    }
  });

  router.get('/profile', (req, res) => {
    User.findOne({_id: req.decoded.userId}).select('username email').exec((err, user) => {
      if (err) {
        res.json({success:false, message:err});
      }else {
        if(!user){
          res.json({success:false, message:'User not found'});
        }else {
          res.json({success:false, user: user});
        }
      }
    });
  });

  router.get('/publicProfile/:username', (req,res) => {
    if(!req.params.username){
      res.json({success:false, message: 'No username provided'});
    }else {
      User.findOne({username: req.params.username}).select('username email').exec((err,user) => {
        if (err) {
          res.json({success:false, message: 'Something went wrong'});
        }else {
          if (!user) {
            res.json({success:false, message: 'User not found'});
          }else {
              res.json({success:true, user: user});
          }
        }
      });
    }
  });

  return router;
}
