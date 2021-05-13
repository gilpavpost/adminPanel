import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

const options = {
    color: '#ff8304',
    failedColor: '#874b4b',
    location: 'top',
};

Vue.use(VueProgressBar, options);
