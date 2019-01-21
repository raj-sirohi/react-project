const passport = require('passport');
const jwt = require('jwt-simple');

/*function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, keys.jsonTokenKey);
}*/

module.exports = app =>{
 
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            console.log('GOOGLE callback',req.user); /* whatever we return from done in passport is put in user property of request object */
            res.redirect('/dashboard?token='+req.user);
            /*res.send({
                token: tokenForUser(req.user),
                user: req.user
            });*/
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });



}
