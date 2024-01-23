const express = require('express');
const router = express.Router();
const catchAsync = require('../utility/CatchAsync');
const User = require ('../models/user');
const passport = require('passport');
const {storeReturnTo} = require('../middleware.js')
const Users = require('../Controllers/users');

router.route('/register')
      .get(Users.renderRegister)
      .post(catchAsync(Users.register));

router.route('/login')
      .get(Users.renderLogin)
      .post(storeReturnTo, passport.authenticate('local',{failureFlash : true , failureRedirect : '/login'} ), Users.login);

router.get('/logout', Users.logout);

module.exports = router