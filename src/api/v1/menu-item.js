import ApiModel from '../ApiModel'

class MenuItemModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
  getItemFilters(params) {
    return this.api.get(`${this.baseUrl}/item/filters`, params);
  }
  getMenuItem(id) {
    return this.api.get(`${this.baseUrl}/item/${id}`);
  }
}

export default new MenuItemModel('/menu');