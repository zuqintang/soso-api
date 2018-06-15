'use strict';

module.exports = app => {
  class UsersService extends app.Service {
    * login(req) {
      const condition = { userName: req.userName };
      const record = yield this.app.mysql.get('web_admin', condition);
      return record;
    }
    * findById(req) {
      const condition = { userid: req.userid };
      const record = yield this.app.mysql.get('web_admin', condition);
      return record;
    }
  }
  return UsersService;
};
