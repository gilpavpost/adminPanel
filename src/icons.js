import Vue from 'vue'
import {library, dom, config} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
    faHome, faUser, faArrowsAltH, faAngleRight, faCoins, faUsers, faIndustry, faDoorOpen,
    faEdit, faEye, faSort, faSortUp, faSortDown,
    faSignInAlt, faTrashAlt,
    faUpload, faFileExcel, faCalendarAlt, faLink,
    faCheck, faTimes, faSync, faStar, faHeart, faRubleSign, faMapMarker,
    faBorderAll, faListOl, faListUl, faGripLines, faPlus, faSquare, faBoxes, faDoorClosed, faBookOpen, faCogs,
} from '@fortawesome/free-solid-svg-icons'
import {faSmile, faListAlt, faCheckCircle, faBuilding, faAddressCard, faCircle, faClone} from '@fortawesome/free-regular-svg-icons'
import {faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'

const iconsList = [
    faHome, faUser, faSignInAlt, faTrashAlt, faEdit, faSort, faSortUp, faSortDown,
    faUpload, faCheck, faTimes, faSync, faEye, faStar, faHeart,
    faFileExcel, faCalendarAlt, faLink, faRubleSign, faMapMarker,
    faArrowsAltH, faAngleRight, faCoins, faUsers, faIndustry, faDoorOpen,
    faBorderAll, faListOl, faListUl, faGripLines, faPlus, faSquare, faBoxes, faDoorClosed, faBookOpen, faCogs,

    faSmile, faListAlt, faCheckCircle, faBuilding, faAddressCard, faCircle, faClone,
    faInstagram, faYoutube,
];
// config.searchPseudoElements = true;
config.autoReplaceSvg = "nest";
library.add(...iconsList);
Vue.component('font-awesome-icon', FontAwesomeIcon);

dom.watch();
