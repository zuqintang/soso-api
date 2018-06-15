'use strict';

module.exports = app => {
  class ProductsService extends app.Service {
    * fetch(request) {
      const condition = { DEL_FLAG: 0 };
      if (request.code) {
        condition.item_code = request.code;
      }
      if (request.name) {
        condition.item_name = request.name;
      }
      if (request.class) {
        condition.item_class = request.class;
      }
      if (request.price) {
        condition.price = request.price;
      }
      const record = yield this.app.mysql.select('sys_dept', condition);
      return record;
    }
  }
  return ProductsService;
};
