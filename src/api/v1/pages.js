import ApiModel from '../ApiModel'

class PagesModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new PagesModel('/pages');