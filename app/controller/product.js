'use strict';
// 产品查询
module.exports = app => {
  class ProductController extends app.Controller {
    * index() {
      this.ctx.body = 'index';
    }
    * find() {
      console.log('ProductController find');
      const params = this.ctx.request.body;
      console.log(params);
      const result = yield this.service.products.find({ params });
      console.log(result);
      const response = { success: false, message: '' };
      if (result) {
        response.data = result;
        response.success = true;
      } else {
        response.success = false;
        response.message = '无数据';
      }
      this.ctx.body = response;
      this.ctx.status = 200;
    }
    * fetch() {
      console.log('ProductController fetch');
      const params = this.ctx.query;
      params.pageSize = params.pageSize || 10;
      params.currentPage = params.currentPage || 1;
      const result = yield this.service.productSKUs.fetch(params);
      const total = yield this.service.productSKUs.getTotalNum(params);
      const response = {
        list: result,
        pagination: {
          total,
          params: params.pageSize || 10,
          current: parseInt(params.currentPage, 10) || 1,
        },
      };
      this.ctx.body = response;
      this.ctx.status = 200;
    }
  }
  return ProductController;
};
