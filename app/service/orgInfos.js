'use strict';

module.exports = app => {
  class OrgInfosService extends app.Service {
    * fetch() {
      const record = yield this.app.mysql.select('org_info');
      return record;
    }
  }
  return OrgInfosService;
};
