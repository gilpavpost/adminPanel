import ApiModel from '../ApiModel'

class OurworksModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new OurworksModel('/ourworks');