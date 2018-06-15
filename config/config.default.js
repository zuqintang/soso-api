'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527568933531_8445';

  // add your config here
  exports.middleware = [ 'robot', 'errorHandler', 'apiWrapper' ];
  exports.errorHandler = {
    match: '/api',
  };
  exports.robot = {
    ua: [ /curl/i, /Baiduspider/i ],
  };
  exports.security = {
    ignore: '/api/',
    domainWhiteList: [ 'http://127.0.0.1:8000', 'http://localhost:8000' ],
    methodnoallow: { enable: false },
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };

  exports.cors = {
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH',
  };

  exports.multipart = {
    fileExtensions: [ '.xls', '.doc', '.ppt', '.docx', '.xlsx', '.pptx' ],
  };

  exports.oAuth2Server = {
    grants: [ 'password' ],
    expires: 60,
  };
  config.middleware = [];

  return config;
};
