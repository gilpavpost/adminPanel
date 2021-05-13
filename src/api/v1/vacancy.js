import ApiModel from '../ApiModel'

class VacancyModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new VacancyModel('/vacancy');