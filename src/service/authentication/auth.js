module.exports = function(isAuthenticated)  {
    return function(req, res, next) {
        if (isAuthenticated === (req.session.currentUser != null)) {
            return next();
        }

        res.send(401);
    }
};