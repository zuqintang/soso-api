'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/product/find', controller.product.find);
  router.post('/api/login/account', controller.login.account);
  router.post('/api/currentUser', controller.user.index);
  router.get('/api/dept', controller.dept.fetch);
  router.get('/api/product', controller.product.fetch);
};
