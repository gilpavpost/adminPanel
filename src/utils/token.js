const tokenKey = 'user-token';

export default {
    get() {
        return localStorage.getItem(tokenKey);
    },
    set(token) {
        localStorage.setItem(tokenKey, token);
    },
    unset() {
        localStorage.removeItem(tokenKey);
    }
};