<template>
    <div class="permissionsList">
        <b-form
                autocomplete="off">
            <loading
                    :active="loading"
                    :is-full-page="false">
            </loading>

            <b-form-row>
                <b-col md="3">
                    <b-form-group
                            :label="$t('users.permissions.labels.role')"
                            label-for="rolesInput">
                        <multiselect
                                id="rolesInput"
                                v-model="rolesIdSelect"
                                track-by="name"
                                label="description"
                                :options="roles"
                                :searchable="false"
                                :allow-empty="false"
                                v-bind="selectOptions">
                            <template slot="singleLabel" slot-scope="{ option }">{{ option.description }}</template>
                        </multiselect>
                    </b-form-group>
                </b-col>
            </b-form-row>
<!-- 
            <b-form-row v-for="themeRules in rules">
                <b-card
                        border-variant="light"
                        :header="themeRules.description"
                        header-bg-variant="light"
                >
                    <b-col md="12" v-for="groups in themeRules.groups">
                        <h5><b>{{groups.description}}</b></h5>
                        <b-form-row>
                            <b-col md="6" v-for="destination in groups.destination">
                                <fieldset class="form-group">
                                    <legend tabindex="-1" class="col-form-label pt-0">{{destination.description}}
                                    </legend>
                                    <div v-for="permission in destination.permissions">
                                        <b-form-checkbox
                                                @change="changeRule(permission)"
                                                v-model="permissionsList[permission.title]">
                                            {{ permission.description }}
                                        </b-form-checkbox>
                                    </div>
                                </fieldset>
                            </b-col>
                        </b-form-row>
                    </b-col>
                </b-card>
            </b-form-row> -->

        </b-form>
    </div>
</template>

<script>
    import Api from '@/api/v1/settings'
    import Multiselect from 'vue-multiselect'
    import notificationMixin from '@/mixins/notification'

    export default {
        components: {
            Multiselect,
        },
        mixins: [
            notificationMixin,
        ],
        data: function () {
            return {
                permissionsList: {},
                selectOptions: {
                    placeholder: this.$t('main.pickAValue'),
                    selectLabel: '',
                    selectedLabel: '',
                    deselectLabel: '',
                    openDirection: 'bottom',
                },

                role: null,
                roles: [],
                rolesIdSelect: null,

                rules: [],
                loading: false,
            }
        },
        watch: {
            rolesIdSelect(newValue) {
                if (newValue !== undefined) {
                    this.role = newValue.name;
                    this.loadPermissions();
                }
            },
        },
        methods: {
            async load() {
                const response = await Api.getRules();
                this.rules = response.data.theme;
                this.permissionsList = response.data.permissions;

                const rolesResponse = await Api.getRoles();
                this.roles = rolesResponse.data;
            },
            async changeRule({title}) {
                if (this.role == null || title == null) {
                    return;
                }

                await Api.updateRole(this.role, title, !this.permissionsList[title]);
            },
            resetPermissionsList() {
                for (let key in this.permissionsList) {
                    this.permissionsList[key] = false;
                }
            },
            async loadPermissions() {
                this.loading = true;
                this.resetPermissionsList();

                if (this.role == null) {
                    return;
                }

                const response = await Api.getPermissionsByRole(this.role);
                for (let key in response.data) {
                    this.permissionsList[key] = true;
                }
                this.loading = false;
            },
        },
        async created() {
            this.loading = true;
            await this.load();
            this.loading = false;
        },
    }
</script>

<style lang="scss">
    .permissionsList .card {
        width: 100%;
    }
</style>