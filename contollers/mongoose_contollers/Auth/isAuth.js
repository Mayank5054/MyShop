const isAuth = (req,res,next) => {
    if(!req.session.isLoggedIn){
        res.redirect("/mongoose/login");
    }
    next();
}

module.exports = isAuth;