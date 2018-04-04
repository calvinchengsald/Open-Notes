const ApplicationPolicy = require("./application");

module.exports = class wikiPolicy extends ApplicationPolicy {



  edit() {
    return (this._isMember() && !this.record.private) || this._isAdmin() || this._isPremium();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }

  show(){
    return !this.record.private || (this.record.private && (this._isAdmin() || this._isPremium())) ;
  }


}
