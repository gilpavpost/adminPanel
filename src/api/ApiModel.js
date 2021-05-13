import api from './'

class ApiModel {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.api = api;
    }

    getModels(params) {
        return this.api.get(this.baseUrl, params)
    }

    getModel(id, params) {
        return this.api.get(`${this.baseUrl}/${id}`, params)
    }

    createModel(data) {
        return this.api.post(this.baseUrl, data)
    }

    updateModel(id, data) {
        return this.api.put(`${this.baseUrl}/${id}`, data)
    }

    deleteModel(id) {
        return this.api.delete(`${this.baseUrl}/${id}`)
    }
}

export default ApiModel;