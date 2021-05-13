<template>
  <div class="col">
    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('main.seo_title')" label-for="seo_titleInput">
          <b-form-input
            :state="form.isValid('seo_title')"
            v-model="form.seo_title"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('seo_title')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('main.seo_discription')"
          label-for="seo_discriptionInput"
        >
          <b-form-input
            :state="form.isValid('seo_discription')"
            v-model="form.seo_discription"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('seo_discription')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('main.seo_keywords')"
          label-for="seo_keywordsInput"
        >
          <b-form-input
            :state="form.isValid('seo_keywords')"
            v-model="form.seo_keywords"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('seo_keywords')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('main.og_type')" label-for="og_typeInput">
          <b-form-input :state="form.isValid('og_type')" v-model="form.og_type">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('og_type')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('main.og_discription')"
          label-for="og_discriptionInput"
        >
          <b-form-input
            :state="form.isValid('og_discription')"
            v-model="form.og_discription"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('og_discription')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('main.og_url')" label-for="og_urlInput">
          <b-form-input :state="form.isValid('og_url')" v-model="form.og_url">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('og_url')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('main.og_site_name')"
          label-for="seo_discriptionInput"
        >
          <b-form-input
            :state="form.isValid('og_site_name')"
            v-model="form.og_site_name"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('og_site_name')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('main.og_title')" label-for="og_titleInput">
          <b-form-input
            :state="form.isValid('og_title')"
            v-model="form.og_title"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('og_title')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
  </div>
  <!-- SEO BLOCK END -->
</template>

<script>
export default {
    name: SeoFields,
    props: 
};
</script>

<style></style>
