const express = require('express');
const CatchAsync = require('../utility/CatchAsync');
const Campground = require('../models/campground');
const Review = require('../models/reviews');
const {validateReview,isLoggedIn,isReviewAuthor} = require('../middleware')
const Reviews = require('../Controllers/reviews');

const router = express.Router({mergeParams: true});




router.post('/',isLoggedIn, validateReview, CatchAsync(Reviews.createReview));

router.delete('/:reviewid',isLoggedIn,isReviewAuthor,CatchAsync(Reviews.deleteReview));


module.exports = router;