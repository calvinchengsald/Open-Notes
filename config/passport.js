const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models').User;
const userQueries = require ('../app/queries/user');

module.exports = {
  init(app){

  // #2
      app.use(passport.initialize());
      app.use(passport.session());

  // #3
      passport.use(new LocalStrategy({
              usernameField: 'email'
          },
          function (email, password, callback) {
            return User.findOne({ where: {email: email, activated: true}})
            .then(user => {
              if (!user) {
                return callback(null, false, {message: 'Incorrect email'});
              }
              return userQueries.comparePassword(user, password, (err, isMatch) => {
                if (err) { return callback(null, false, { error: err }); }

                if (!isMatch) {
                  return callback(null, false, {message: 'Incorrect password'});
                }

                return callback(null, user, {message: 'Logged In Successfully'} );
              });
            })
            .catch(err => {
              return callback(err);
            });
          }
      ));

      passport.serializeUser((user, callback) => {

    //      console.log("serialize");
        callback(null, user.id);
      });

      passport.deserializeUser((id, callback) => {

    //      console.log("deserialize");
        User.findById(id)
        .then((user) => {
          callback(null, user);
        })
        .catch((err =>{
          callback(err, user);
        }))

      });
  }
}
