'use strict';

module.exports = app => {
  class ProductsService extends app.Service {
    * find(request) {
      const condition = {};
      if (request.ID) {
        condition.ID = request.ID;
      }
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
      const record = yield this.app.mysql.get('products', condition);
      return record;
    }
    * fetchProducts(request) {
      const condition = {};
      if (request.code) {
        condition.item_code = request.code;
      }
      const record = yield this.app.mysql.select('products');
      return record;
    }
  }
  return ProductsService;
};
