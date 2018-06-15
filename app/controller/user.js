'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    * index() {
      console.log('UserController index');
      const userid = parseInt(this.ctx.request.body.userid, 10);
      console.log(userid);
      const user = yield this.service.users.findById({ userid });
      console.log(user);
      const res = { status: 'error' };
      if (user) {
        res.name = user.name;
        res.avatar = user.avatar;
        res.userid = user.userid;
        res.notifyCount = user.notifyCount;
        res.status = 'ok';
      } else {
        res.message = '用户找不到';
      }
      this.ctx.body = res;
      this.ctx.status = 200;
    }
  }
  return UserController;
};
