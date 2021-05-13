import ApiModel from '../ApiModel'

class KnowledgebaseModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new KnowledgebaseModel('/knowledgebase');