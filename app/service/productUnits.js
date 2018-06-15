'use strict';

module.exports = app => {
  class ProductUnitsService extends app.Service {
    * fetch() {
      const record = yield this.app.mysql.select('product_units');
      return record;
    }
  }
  return ProductUnitsService;
};
