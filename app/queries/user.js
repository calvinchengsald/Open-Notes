const User = require('../models').User;
const Wiki = require('../models').Wiki;
const Collaborator = require('../models').Collaborator;
const sgMail = require('@sendgrid/mail');
const bcrypt = require("bcryptjs");

module.exports = {
  signUp(body, callback){
    if (body.password !== body.password_conf) {
      let err = {
        title: "Unmatch Error",
        msg: "Password must match with confirmation password"
      };
      callback(null,err);
      return;
    }
    if (body.name.length <= 0) {
      let err = {
        param: "Name Error",
        msg: "Please enter a name"
      };
      callback(null,err);
      return;
    }
    if (body.password.length <= 0) {
      let err = {
        param: "Password Error",
        msg: "Please enter a password"
      };
      callback(null,err);
      return;
    }
    body.email = body.email.toLowerCase();
    User.all()
    .then((users)=>{
      let uniqueEmail = true;
      for(var i = 0; i < users.length; i++){
        if(users[i].email === body.email){
          uniqueEmail =false;
          break;
        }
      }
      if(!uniqueEmail){
        let err = {
          param: "Email Error",
          msg: "This email already exist"
        };
        callback(null,err);
        return;
      }
      let ranToken = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
      User.create({
        name: body.name,
        email: body.email,
        password: body.password,
        activated: false,
        token: ranToken,
        role: 0
      })
      .then((user)=>{
        sgMail.setApiKey(process.env.sendgrid);

        const htmlz = `
        <form method="POST" action="${process.env.userCreateUrl}">
          <div class="form-group">
            <input  type="hidden" name="ranToken" placeholder="${ranToken}" value="${ranToken}" class="form-control"/>
          </div><br/>
          <input type="submit" value="Confirm Email" class="btn btn-primary"/>
        </form>
        `;
        const msg = {
          to: body.email,
          from: 'calvinanvin@gmail.com',
          subject: 'Confirmation Email',
          text: 'Click the link below to confirm',
          html: htmlz,
        };
        sgMail.send(msg);
        callback(null,null,true);
        return;
      })
      .catch((err)=>{
        console.log(err);
        callback(err);
        return;
      })


    })
    .catch((err)=>{
      console.log(err);
      callback(err);
      return;
    })
  },

  create(body, callback){
    User.scope({method: ["withToken", body.ranToken]}).all()
    .then((users)=>{
      if(!users[0]){
        return callback("User not found");
      }
      let updatedUser = {
        token: body.ranToken,
        activated : true,
      }
      users[0].update(updatedUser, {
          fields: Object.keys(updatedUser)
        })
        .then((user2) => {
          return callback(null, user2);
        })
        .catch((err) => {
          console.log(err);
          return callback("Problem with account activation");
        });
    })
    .catch((err)=>{
      console.log(err);
      callback(err);
      return;
    })
  },

  comparePassword(user, password, cb){
    bcrypt.compare(password, user.password, function(err, isMatch){
      if(err){
        return cb(err);
      } else {
        cb(null, isMatch);
      }
    });
  },

  getUser(id, callback){

    let result = {};
    User.findById(id)
    .then((user) => {
      if(!user){
        return callback("User not found");
      }
      result.user = user;
      Wiki.scope({method: ["allAuthoredWikis", id]}).all()
      .then((wikis)=>{
        result.wikis = wikis;
        Collaborator.scope({method: ["allCollabWikis", id]}).all()
        .then((collabs)=>{
          result.collabs = collabs;
          return callback(null, result);
        })
        .catch((err) => {
          console.log(err);
          callback(err);
        })
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      })
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  },

  updateUser(id, updatedUser, callback){
    return User.findById(id)
    .then((user) => {
      if(!user){
        callback("User not found");
      }
      user.update(updatedUser, {
          fields: Object.keys(updatedUser)
        })
        .then((user2) => {
          callback(null, user2);
        })
        .catch((err) => {
          console.log(err);
          callback(err);
        });
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  }
}
