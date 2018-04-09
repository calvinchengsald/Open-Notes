const ApplicationPolicy = require("./application");

module.exports = class wikiPolicy extends ApplicationPolicy {



  edit() {
    return (this._isMember() && !this.record.private && this._isOwner()) || (this.record.private && (this._isAdmin() || this._isOwner() || this._isCollaborator())) ;
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }

  show(){
    return !this.record.private || (this.record.private && (this._isAdmin() || this._isOwner() || this._isCollaborator())) ;
  }

  _isCollaborator(){
    if (this.user && this.record && this.record.collaborators){
      let collabs = this.record.collaborators;
      for(var i = 0; i < collabs.length; i++){
        //console.log("HEYYY LISTENNNNERQR2-4124-04120-1920-3-01231");
        //console.log(collabs[i].User.id);
        if(collabs[i].User.id == this.user.id){
          return true;
        }
      }
    }
    return false;
  }

  editCollab(){
    return ((this._isOwner() && this._isPremium()) || this._isAdmin());
  }

}
