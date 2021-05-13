import ApiModel from '../ApiModel'

class SalesModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new SalesModel('/sales');