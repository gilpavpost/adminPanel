import ApiModel from '../ApiModel'

class BannersTypesModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new BannersTypesModel('/banners-types');