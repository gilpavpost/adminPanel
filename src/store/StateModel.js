class StateModel {

    constructor() {
        this.loading = false;
        this.error = null;
    }

    request() {
        this.loading = true;
        this.error = null;
    }

    success() {
        this.loading = false;
        this.error = null;
    }

    fail(error) {
        this.loading = false;
        this.error = error;
    }
}

export default StateModel;