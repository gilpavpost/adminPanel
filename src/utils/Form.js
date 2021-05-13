import cloneDeep from 'lodash/cloneDeep'
import Errors from './Errors'
import api from '@/api'

class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
    constructor(data) {
        // Клонирование объекта, чтобы можно было работать со сложными формами
        this.originalData = cloneDeep(data);
        this.attributes = data;

        for (let attribute in data) {
            Object.defineProperty(this, attribute, {
                get() {
                    return this.getAttribute(attribute);
                },
                set(value) {
                    this.setAttribute(attribute, value);
                },
            });
        }

        this.errors = new Errors();
    }

    getAttribute(attribute) {
        return this.attributes[attribute]
    }

    setAttribute(attribute, value) {
        this.attributes[attribute] = value
    }

    /**
     * Loads data to form.
     *
     * @param {object} data
     */
    load(data) {
        for (let attribute in data) {
            // Проверка, чтобы избежать работы с внутренними свойствами
            if (data.hasOwnProperty(attribute) && this.attributes.hasOwnProperty(attribute)) {
                this.setAttribute(attribute, data[attribute]);
            }
        }

        return data;
    }

    /**
     * Fetch all relevant data for the form.
     */
    get data() {
        return this.attributes;
    }

    /**
     * Reset the form fields.
     */
    reset() {
        this.attributes = cloneDeep(this.originalData);
        this.errors.clear();
    }

    /**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     */
    post(url) {
        return this.submit('post', url);
    }

    /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     */
    put(url) {
        return this.submit('put', url);
    }

    /**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     */
    patch(url) {
        return this.submit('patch', url);
    }

    /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     */
    delete(url) {
        return this.submit('delete', url);
    }

    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     */
    async submit(requestType, url) {
        try {
            const response = await api.request(requestType, url, this.data);
            this.onSuccess();

            return response.data;
        } catch (error) {
            this.onFail(error.response.data);

            return error.response.data;
        }
    }

    /**
     * Handle a successful form submission.
     */
    onSuccess() {
        this.reset();
    }

    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
    onFail(errors) {
        let errorsFormat = {};
        for (let error of errors) {
            errorsFormat[error.field] = error.message;
        }

        this.errors.record(errorsFormat);
    }

    isValid(field) {
        if (this.errors.has(field)) {
            return false;
        }

        return null;
    }
}

export default Form;