import api from '../'

export default {
    site(data) {
        return api.get(`/${data}`);
    },
};