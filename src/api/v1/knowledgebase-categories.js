import ApiModel from '../ApiModel'

class KnowledgebaseCategoriesModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new KnowledgebaseCategoriesModel('/knowledgebase-categories');