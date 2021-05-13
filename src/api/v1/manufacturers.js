import ApiModel from '../ApiModel'

class ManufacturersModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new ManufacturersModel('/manufacturers');