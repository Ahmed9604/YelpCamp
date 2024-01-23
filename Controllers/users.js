const User = require ('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('./user/register')
}

module.exports.register = async (req,res,next) => {
    try {
        const {username, password, email} = req.body;
    const user =new User({username, email})
    const registeredUser = await User.register(user, password)
    req.login(registeredUser, err => {
        if (err) return next(err);
           req.flash('success'," registration successful") 
    res.redirect('/campground')

    });
    
 
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/register')
    }
    
}

module.exports.renderLogin = (req, res) => {
    res.render('./user/login')
}

module.exports.login = (req, res) => {
    req.flash('success','welcome back, you are logged in successfully');
    const redirectUrl = res.locals.returnTo || '/campground';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
    
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You logged out successfully');
        res.redirect('/campground');
    });
}


