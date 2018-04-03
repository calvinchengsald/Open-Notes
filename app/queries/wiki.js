const Wiki = require('../models').Wiki;

module.exports = {
  getAllWikis(callback){
    return Wiki.all()
    .then((wikis)=>{
      callback(null, wikis);
    })
    .catch((err)=>{
      console.log(err);
      callback(err, null);
    })
  },

  create(req, callback){
    return Wiki.create({
      title: req.body.title,
      body: req.body.body,
      private: req.body.private,
      userId: req.user.id
    })
    .then((wiki)=>{
      callback(null, wiki);
    })
    .catch((err)=>{
      console.log(err);
      callback(err);
    })
  },

  getWiki(id, callback){
    return Wiki.findById(id)
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  },

  updateWiki(req, callback){
    return Wiki.findById(req.params.id)
    .then((wiki) => {
      if(!wiki){
        return callback("Wiki not found");
      }
      let updatedWiki = {
        title: req.body.title,
        body: req.body.body,
        private: req.body.private
      };
      wiki.update(updatedWiki, {
        fields: Object.keys(updatedWiki)
      })
      .then(() => {
        callback(null, wiki);
      })
      .catch((err) => {
        console.log(err)
        callback(err);
      });


    });

  },

  deleteWiki(req, callback){
    return Wiki.findById(req.params.id)
    .then((wiki)=>{
      if(!wiki){
        return callback("Wiki not found");
      }
      wiki.destroy().
      then((delected)=>{
        callback(null, delected);
      })
      .catch((err) => {
        callback(err, wiki);
      })

    });


  },

}
