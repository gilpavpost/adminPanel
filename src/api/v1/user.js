import api from '../'

export default {
    auth(user) {
        return api.post('/actions/auth', user);
        // return api.post('/auth', user);
    },
    profile() {
        return api.get('/actions/me');
        // return api.get('/user/me');
    },
    forgot({email}) {
        return api.post('/forgot', {email});
    },
    reset({code, password, passwordRepeat}) {
        return api.post(`/reset`, {
            code,
            password,
            passwordRepeat,
        });
    }
};