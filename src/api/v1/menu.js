import ApiModel from '../ApiModel'

class MenuModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new MenuModel('/menu');