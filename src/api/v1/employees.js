import ApiModel from '../ApiModel'

class EmployeesModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new EmployeesModel('/employees');