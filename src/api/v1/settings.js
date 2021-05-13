import ApiModel from '../ApiModel'

class SettingsModel extends ApiModel {
    getRules() {
        return this.api.get(`${this.baseUrl}/permissions`);
    }
    getRoles() {
        return this.api.get(`${this.baseUrl}/roles`);
    }
    updateRole(role, permission, checked) {
        return this.api.put(`${this.baseUrl}/roles`, {role, permission, checked});
    }

    getPermissionsByRole(role) {
        return this.api.get(`${this.baseUrl}/permissions-by-role`, {role});
    }
}

export default new SettingsModel('/settings');