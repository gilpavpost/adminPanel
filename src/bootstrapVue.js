import Vue from 'vue'

import bBadge from 'bootstrap-vue/es/components/badge/badge';
import bButton from 'bootstrap-vue/es/components/button/button';
import bImg from 'bootstrap-vue/es/components/image/img';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
import bFormCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group';
import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox';
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
import bFormTextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea';
import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select';
import bLink from 'bootstrap-vue/es/components/link/link';
import bPagination from 'bootstrap-vue/es/components/pagination/pagination';
import bTable from 'bootstrap-vue/es/components/table/table';
import bAlert from 'bootstrap-vue/es/components/alert/alert';
import bfromFile from 'bootstrap-vue/es/components/form-file/form-file';

import { Navbar } from 'bootstrap-vue/es/components';
import { Card } from 'bootstrap-vue/es/components';
import { Modal } from 'bootstrap-vue/es/components';
import { Layout } from 'bootstrap-vue/es/components';
import { Form } from 'bootstrap-vue/es/components';
import { InputGroup } from 'bootstrap-vue/es/components';
// import { Tooltip } from 'bootstrap-vue/es/directives';
import { VBPopoverPlugin } from 'bootstrap-vue/es/directives';
import { ListGroup } from 'bootstrap-vue/es/components';
import { Collapse } from 'bootstrap-vue/es/components';
import { Progress } from 'bootstrap-vue/es/components';

Vue.use(Progress);
Vue.use(Collapse);
Vue.use(ListGroup);
// Vue.use(Tooltip);
Vue.use(VBPopoverPlugin);
Vue.use(InputGroup);
Vue.use(Form);
Vue.use(Layout);
Vue.use(Modal);
Vue.use(Card);
Vue.use(Navbar);

Vue.component('b-alert', bAlert);
Vue.component('b-badge', bBadge);
Vue.component('b-button', bButton);
Vue.component('b-img', bImg);
Vue.component('b-link', bLink);
Vue.component('b-pagination', bPagination);
Vue.component('b-table', bTable);

Vue.component('b-form-checkbox-group', bFormCheckboxGroup);
Vue.component('b-form-checkbox', bFormCheckbox);
Vue.component('b-form-input', bFormInput);
Vue.component('b-form-group', bFormGroup);
Vue.component('b-form-select', bFormSelect);
Vue.component('b-form-textarea', bFormTextarea);
Vue.component('b-form-file', bfromFile);