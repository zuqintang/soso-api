'use strict';

module.exports = app => {
  class LoginController extends app.Controller {
    * account() {
      console.log('LoginController account');
      const { MD5 } = require('../utils/libs');
      const userName = this.ctx.request.body.userName;
      const password = this.ctx.request.body.password;
      const type = this.ctx.request.body.type;
      console.log(userName);
      const user = yield this.service.users.login({ userName });
      console.log(user);
      const res = { status: 'error', type };
      if (user) {
        if (user.password === MD5(password)) {
          res.status = 'ok';
          res.currentAuthority = user.authority;
          res.userid = user.userid;
        } else {
          res.status = 'error';
          res.currentAuthority = 'guest';
        }
      }
      this.ctx.body = res;
      this.ctx.status = 200;
    }
  }
  return LoginController;
};
