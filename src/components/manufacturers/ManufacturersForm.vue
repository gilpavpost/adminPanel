<template>
  <div>
    <b-form
        autocomplete="off"
        @keydown="form.errors.clear()"
        @submit.prevent="submit"
        @reset="reset">
      <loading
          :active="loading"
          :is-full-page="false">
      </loading>

      <b-form-row>
        <b-col md="12">
          <b-form-group
              :label="$t('manufacturers.labels.title')"
              label-for="titleInput">
            <b-form-input
                :state="form.isValid('title')"
                v-model="form.title">
            </b-form-input>
            <b-form-invalid-feedback v-text="form.errors.get('title')"></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-form>

    <b-form-row>
      <b-col md="12">
        <b-form-group
            :label="$t('manufacturers.labels.category')"
            label-for="category_idInput">
          <multiselect
              id="category_idInput"
              v-model="categoryIdSelect"
              track-by="id"
              label="categories"
              :placeholder="$t('main.pickAValue')"
              :options="categories"
              :searchable="false"
              :allow-empty="false"
              v-bind="selectOptions">
            <template slot="singleLabel" slot-scope="{ option }">{{ option.title }}</template>
          </multiselect>
          <b-form-invalid-feedback v-text="form.errors.get('category_id')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

  </div>

</template>

<script>
  import Form from '@/utils/Form'
  import Api from '@/api/v1/manufacturers'
  import Multiselect from 'vue-multiselect'

  import {
    CATEGORIES_INTERIOR_DOOR,
    CATEGORIES_FURNITURE_RYCHKI,
    CATEGORIES_FURNITURE_PETLY,
    CATEGORIES_FURNITURE_MEHANIZMY
  } from '@/utils/CategoriesGoods'

  export default {
    components: {
      Multiselect,
    },
    props: {
      internalId: {
        default: null,
      },
      categoryId: {
        default: null,
      },
    },
    data: function () {
      return {
        categories: [],
        categoryIdSelect: null,
        selectOptions: {
          multiple: false,
          showNoOptions: false,
          showNoResults: false,
          selectLabel: '',
          selectedLabel: '',
          deselectLabel: '',
          openDirection: 'bottom',
        },
        loading: false,
        form: new Form({
          id: null,
          title: '',
          category_id: null,
        }),

        isNewForm: false,
      }
    },
    watch: {
      categoryIdSelect(newValue) {
        if (newValue !== undefined) {
          this.form.category_id = newValue.id
        }
      },
    },
    methods: {
      isDoor() {
        let destination;
        switch(this.categoryId) {
          case CATEGORIES_INTERIOR_DOOR:
            destination = 'interiorDoor';
            break;
          case CATEGORIES_FURNITURE_RYCHKI:
          case CATEGORIES_FURNITURE_PETLY:
          case CATEGORIES_FURNITURE_MEHANIZMY:
            destination = 'furniture';
            break;
        }

        return destination;
      },
      async load(id) {
        const response = await Api.getModel(id);
        this.form.load(response.data);
        this.form.id = id;
        this.categoryIdSelect = this.categories.find(x => String(x.id) === String(this.form.category_id))
      },
      async categoriesLoad() {
        // const response = await ApiCategories.getFilters();
        // this.categories = response.data;
      },
      async submit() {
        try {
          if (this.form.id) {
            await Api.updateModel(this.form.id, this.form.data);
            this.$emit('updated');
          } else {
            await Api.createModel(this.form.data);
            this.$emit('created');
          }
          this.form.onSuccess();
        } catch (error) {
          this.form.onFail(error.response.data);
        }
      },
      reset() {
        this.form.reset();
      },
    },
    async created() {
      this.loading = true;
      await this.categoriesLoad();
      if (this.internalId) {
        await this.load(this.internalId);
      } else {
        this.isNewForm = true;
      }
      this.loading = false;
    },
  }
</script>