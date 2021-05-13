import ApiModel from '../ApiModel'

class BannersModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new BannersModel('/banners');