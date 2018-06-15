'use strict';

const moment = module.require('moment');
module.exports = app => {
  class ProductSKUsService extends app.Service {
    * fetch(request) {
      let str = `
        SELECT
        product_sku.ID,
        products.NAME,
        SPEC,
        MODEL,
        product_units.NAME as UNIT,
        producer.NAME as PRODUCER,
        product_sku.CREATE_TIME,
        product_sku.UPDATE_TIME,
        product_sku.STATUS,
        (select GROUP_CONCAT(product_barcode.BARCODE) from product_barcode where product_barcode.SKU_ID = product_sku.ID) as BARCODE
        FROM product_sku
        INNER JOIN products on product_sku.PRODUCT_ID = products.ID
        INNER JOIN product_units on product_sku.UNITS_ID = product_units.ID
        INNER JOIN org_info producer on producer.ID = products.PRODUCER_ID
        WHERE 1=1`;
      const param = [];
      if (request.spec) {
        str = `${str} AND SPEC LIKE ?`;
        param.push(`%${request.spec}%`);
      }
      if (request.model) {
        str = `${str} AND MODEL LIKE ?`;
        param.push(`%${request.model}%`);
      }
      if (request.name) {
        str = `${str} AND products.NAME like ? `;
        param.push(`%${request.name}%`);
      }
      if (request.status) {
        str = `${str} AND product_sku.STATUS = ?`;
        param.push(request.status);
      }
      if (request.sku_id) {
        str = `${str} AND product_sku.ID = ?`;
        param.push(request.sku_id);
      }
      if (request.beginDate) {
        str = `${str} AND product_sku.UPDATE_TIME >= ?`;
        param.push(moment(request.beginDate).format('YYYY-MM-DD'));
      }
      if (request.endDate) {
        str = `${str} AND product_sku.UPDATE_TIME <= ?`;
        param.push(moment(request.endDate).format('YYYY-MM-DD'));
      }
      const offset = (parseInt(request.currentPage, 10) || 1 - 1) * request.pageSize;
      str = `${str} limit ${request.pageSize}
        offset ${offset}`;
      const record = yield this.app.mysql.query(str, param);
      return record;
    }
    * getTotalNum(request) {
      let str = `
        SELECT
        count(product_sku.ID) as total
        FROM product_sku
        INNER JOIN products on product_sku.PRODUCT_ID = products.ID
        WHERE 1=1`;
      const param = [];
      if (request.spec) {
        str = `${str} AND SPEC LIKE ?`;
        param.push(`%${request.spec}%`);
      }
      if (request.model) {
        str = `${str} AND MODEL LIKE ?`;
        param.push(`%${request.model}%`);
      }
      if (request.name) {
        str = `${str} AND products.NAME like ? `;
        param.push(`%${request.name}%`);
      }
      if (request.status) {
        str = `${str} AND product_sku.STATUS = ?`;
        param.push(request.status);
      }
      if (request.sku_id) {
        str = `${str} AND product_sku.ID = ?`;
        param.push(request.sku_id);
      }
      if (request.beginDate) {
        str = `${str} AND product_sku.UPDATE_TIME >= ?`;
        param.push(moment(request.beginDate).format('YYYY-MM-DD'));
      }
      if (request.endDate) {
        str = `${str} AND product_sku.UPDATE_TIME <= ?`;
        param.push(moment(request.endDate).format('YYYY-MM-DD'));
      }
      const record = yield this.app.mysql.query(str, param);
      const { total } = record[0];
      console.log(total);
      return total;
    }
  }
  return ProductSKUsService;
};
