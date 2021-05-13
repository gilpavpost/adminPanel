import ApiModel from "../ApiModel";

class GoodsListModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
  getQuery(params) {
    return this.api.get(`${this.baseUrl}?query=&title=${params}`);
  }
}

export default new GoodsListModel("/goods");
