

import ApiModel from '../ApiModel'

class SettingSiteModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new SettingSiteModel('/settings');