<template>
    <b-form>
        <b-form-row>
            <b-col>
                <b-form-group>
                    <b-form-input
                            v-model="search.fullName"
                            :placeholder="$t('controlUsers.search.fio')">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <b-form-input
                            v-model="search.phone"
                            :placeholder="$t('controlUsers.search.phone')">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
            <b-form-group>
                <b-form-input
                        v-model="search.email"
                        :placeholder="$t('controlUsers.search.email')">
                </b-form-input>
            </b-form-group>
            </b-col>
            <b-col md="2">
                <b-form-group>
                    <b-dropdown
                            split
                            v-model="search.status"
                            text="Статус">
                        <b-dropdown-item active @click="search.status = null">Не задан</b-dropdown-item>
                        <b-dropdown-item @click="search.status = 1">Активен</b-dropdown-item>
                        <b-dropdown-item @click="search.status = 0">Не активен</b-dropdown-item>
                    </b-dropdown>
                </b-form-group>
            </b-col>
        </b-form-row>
    </b-form>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    components: {
      Multiselect,
    },
    data () {
      return {
        loaded: false,
        search: {
          fullName: '',
          phone: '',
          email: '',
          status: null,
        },
      }
    },
    computed: {},
    methods: {
      async fetchFilters () {
        this.loaded = true
      },
      clearField (field) {
        this.search.id = ''
      },
    },
    watch: {
      search: {
        handler (value) {
          this.$emit('search', value)
        },
        deep: true,
      },
    },
    created () {
      this.fetchFilters()
    },
  }
</script>

<style scoped>

</style>