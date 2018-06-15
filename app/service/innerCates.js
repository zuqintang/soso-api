'use strict';

module.exports = app => {
  class InnerCatesService extends app.Service {
    * fetch() {
      const record = yield this.app.mysql.select('inner_cates');
      return record;
    }
  }
  return InnerCatesService;
};
