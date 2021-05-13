import ApiModel from '../ApiModel'

class UsersModel extends ApiModel {
    getFilters(params) {
        return this.api.get(`${this.baseUrl}/filters`, params);
    }
    getSearchUsers(text) {
        return this.api.get(`${this.baseUrl}/smart-search`, {
            q: text
        });
    }
    updateDestModel(id, destination, data) {
        return this.api.put(`${this.baseUrl}/${destination}/${id}`, data)
    }
    createSocials(id, data) {
        return this.api.post(`${this.baseUrl}/socials/${id}`, data)
    }
    uploadFile(url, formData) {
        return this.api.upload(`${this.baseUrl}/${url}`, formData)
    }
    image(url, data) {
        return this.api.get(`${this.baseUrl}/${url}`, data);
    }
    file(url, data) {
        return this.api.get(`${this.baseUrl}/${url}`, data);
    }
    // privateImage(data) {
    //     return this.api.get(`${this.baseUrl}/z-image`, data);
    // }
    // getProfile() {
    //     return this.api.get(`${this.baseUrl}/users/profile`);
    // }
    // updateProfile(id, data) {
    //     return this.api.put(`${this.baseUrl}/profile`, data);
    // }
}

export default new UsersModel('/users');