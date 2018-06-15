'use strict';
// 部门查询
module.exports = app => {
  class ProductController extends app.Controller {
    * index() {
      this.ctx.body = 'index';
    }

    generateChildren(current, result) {
      const children = [];
      result.forEach(item => {
        if (item.PARENT_ID === current.DEPT_ID) {
          if (result.filter(data => data.PARENT_ID === item.DEPT_ID).length > 0) {
            item.children = this.generateChildren(item, result);
          }
          children.push(item);
        }
      });
      return children;
    }

    * fetch() {
      console.log('DeptController find');
      const params = this.ctx.query;
      console.log(params);
      const result = yield this.service.dept.fetch({ params });
      let dataSource = [];
      result.forEach(item => {
        if (item.PARENT_ID === 0) {
          // result.forEach(child => {
          //   if(child.PARENT_ID === item.DEPT_ID){
          //     if(!item.children) item = { ...item, 'children': []};
          //     result.forEach(grandson => {
          //       if(grandson.PARENT_ID === child.DEPT_ID){
          //         if(!grandson.children) child = {...child,'children': []};
          //         //continue
          //         child.children.push(grandson);
          //       }
          //     })
          //     item.children.push(child);
          //   }
          // });
          if (result.filter(data => data.PARENT_ID === item.DEPT_ID).length > 0) {
            item.children = this.generateChildren(item, result);
          }
          dataSource = dataSource.concat(item);
        }
      });

      if (params.name) {
        dataSource = dataSource.filter(data => data.NAME.indexOf(params.name) > -1);
      }
      if (params.no) {
        dataSource = dataSource.filter(data => data.DEPT_ID === parseInt(params.no, 10));
      }

      const response = {
        list: dataSource,
        pagination: {
          total: dataSource.length,
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
