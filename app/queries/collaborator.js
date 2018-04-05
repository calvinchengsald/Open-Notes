const Wiki = require('../models').Wiki;
const User = require('../models').User;
const Collaborator = require('../models').Collaborator;

module.exports = {

  getAllCollaboratorFromWiki(wikiId, callback){
    return Collaborator.all()
    .then((collaborators)=>{
      collaborators = collaborators.filter(collab => collab.wikiId == wikiId);
      callback(null, collaborators);
    })
    .catch((err)=>{
      console.log(err);
      callback(err, null);
    })
  },

  getAllCollaboratorFromUser(userId, callback){
    return Collaborator.all()
    .then((collaborators)=>{
      collaborators = collaborators.filter(collab => collab.userId == userId);
      callback(null, collaborators);
    })
    .catch((err)=>{
      console.log(err);
      callback(err, null);
    })
  },

  create(req, callback){

    if (req.user.email == req.body.collaborator){
      return callback(`You cannot add yourself as a collaborator`);
    }
    User.findAll({
      where: {
        email: req.body.collaborator
      }
    })
    .then((users)=>{
      if(!users[0]){
        callback("User not found");
      }
      Collaborator.findAll({
        where: {
          userId: users[0].id,
          wikiId: req.params.id,
        }
      })
      .then((collaborators)=>{
        if(collaborators.length != 0){
          return callback(`${req.body.collaborator} is already a collaborator`);
        }
        return Collaborator.create({
          wikiId: req.params.id,
          userId: users[0].id
        })
        .then((wiki)=>{
          callback(null, wiki);
        })
        .catch((err)=>{
          console.log(err);
          callback(err);
        })
      })
      .catch((err)=>{
        console.log(err);
        callback(err);
      })
    })
    .catch((err)=>{
      console.log(err);
      callback(err);
    })

  },
  delete(req, callback){
    return User.findAll({
      where: {
        email: req.body.collaborator
      }
    })
    .then((users)=>{
      if(!users[0]){
        callback("User was not found");
      }
      Collaborator.findAll({
        where: {
          userId: users[0].id,
          wikiId: req.params.id
        }
      })
      .then((collab)=>{
        if(!collab[0]){
          callback("Collaborator was not found");
        }
        return collab[0].destroy()
        .then((collab)=>{
          callback(null, collab);
        })
        .catch((err)=>{
          console.log(err);
          callback(err);
        })
      })
      .catch((err)=>{
        console.log(err);
        callback(err);
      })

    })
    .catch((err)=>{
      console.log(err);
      callback(err);
    })
  },


}
