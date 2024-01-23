if(process.env.NODE_ENV !== 'production'){
      require('dotenv').config();
}

const express = require('express');
const CatchAsync = require('../utility/CatchAsync');
const Campgrounds = require ('../Controllers/campgrounds');
const router = express.Router();
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware.js')
const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage});


router.route('/')
      .get(CatchAsync(Campgrounds.index))
      .post(isLoggedIn,upload.array('image'),validateCampground, CatchAsync(Campgrounds.createCamp));

// .post(req,res)=>{
      //       console.log(req.body, req.files)
      //       res.send('did it work??')
      // })

router.get('/new',isLoggedIn, Campgrounds.newCamp); 
 
router.route('/:id')
      .get(CatchAsync(Campgrounds.showCamp))
      .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground, CatchAsync(Campgrounds.updateCamp))
      .delete(isLoggedIn,isAuthor, CatchAsync(Campgrounds.deleteCamp));
 
router.get('/:id/edit',isLoggedIn,isAuthor, CatchAsync(Campgrounds.editCamp)); 

 module.exports= router;