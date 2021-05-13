<template>
  <b-form
    autocomplete="off"
    @keydown="form.errors.clear()"
    @submit.prevent="submit"
    @reset="reset"
  >
    <loading :active="loading" :is-full-page="false"> </loading>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('bannersTypes.labels.title')"
          label-for="titleInput"
        >
          <b-form-input :state="form.isValid('title')" v-model="form.title">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('title')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('bannersTypes.labels.alias')"
          label-for="aliasInput"
        >
          <b-form-input :state="form.isValid('alias')" v-model="form.alias">
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('title')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('bannersTypes.labels.banner_id')"
          label-for="banner_idInput"
        >
          <multiselect
            v-model="bannerSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="banners"
            :searchable="true"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="firstLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('banner_id')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('bannersTypes.labels.img')">
          <b-form-file
            v-model="setImg"
            :placeholder="$t('main.load_img')"
          ></b-form-file>
          <b-form-invalid-feedback
            v-text="form.errors.get('img')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('bannersTypes.labels.type')"
          label-for="typeInput"
        >
          <multiselect
            v-model="typeSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="types"
            :searchable="true"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="firstLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('type')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <div v-if="typeSelect !== null">
      <template v-if="typeSelect.id == 0">
        <b-form-row>
          <b-col md="12">
            <b-form-group
              :label="$t('bannersTypes.labels.link')"
              label-for="linkInput"
            >
              <b-form-input :state="form.isValid('link')" v-model="form.link">
              </b-form-input>
              <b-form-invalid-feedback
                v-text="form.errors.get('link')"
              ></b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>
      </template>
      <template v-if="typeSelect.id == 1">
        <b-form-row>
          <b-col md="12">
            <b-form-group
              :label="$t('bannersTypes.labels.position')"
              label-for="positionInput"
            >
              <b-form-input
                type="number"
                :state="form.isValid('link')"
                v-model="form.position"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-text="form.errors.get('position')"
              ></b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="12">
            <b-form-group :label="$t('bannersTypes.labels.content')">
              <editor :content="form.content" @content="setContent" />
              <b-form-invalid-feedback
                v-text="form.errors.get('content')"
              ></b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>
      </template>
      <template v-if="typeSelect.id == 2">
        <b-form-row>
          <b-col md="12">
            <b-form-group
              :label="$t('bannersTypes.labels.position')"
              label-for="positionInput"
            >
              <b-form-input
                type="number"
                :state="form.isValid('link')"
                v-model="form.position"
              >
              </b-form-input>
              <b-form-invalid-feedback
                v-text="form.errors.get('position')"
              ></b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col md="12">
            <b-form-group
              :label="$t('bannersTypes.labels.source_id')"
              label-for="typeInput"
            >
              <multiselect
                v-model="menuSelect"
                track-by="id"
                label="title"
                :placeholder="$t('main.pickAValue')"
                :options="menus"
                :searchable="true"
                :allow-empty="false"
                v-bind="selectOptions"
              >
                <template slot="firstLabel" slot-scope="{ option }">{{
                  option.title
                }}</template>
              </multiselect>
              <b-form-invalid-feedback
                v-text="form.errors.get('menu')"
              ></b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>
      </template>
    </div>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('bannersTypes.labels.status')"
          label-for="statusInput"
        >
          <multiselect
            v-model="statusSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="statuses"
            :searchable="false"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }"
              >{{ option.title }}
            </template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('status')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('bannersTypes.labels.sort')"
          label-for="sortInput"
        >
          <b-form-input
            type="number"
            :state="form.isValid('sort')"
            v-model="form.sort"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('sort')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
import Form from "@/utils/Form";
import Api from "@/api/v1/banners-types";
import Multiselect from "vue-multiselect";
import editor from "@/components/editor";

export default {
  components: {
    Multiselect,
    editor,
  },
  props: {
    internalId: {
      default: null,
    },
  },
  data: function() {
    return {
      loading: false,
      statuses: [],
      types: [],
      banners: [],
      menus: [],
      statusSelect: null,
      typeSelect: null,
      bannerSelect: null,
      menuSelect: null,
      selectOptions: {
        multiple: false,
        showNoOptions: false,
        showNoResults: false,
        selectLabel: "",
        selectedLabel: "",
        deselectLabel: "",
        openDirection: "bottom",
      },

      form: new Form({
        id: null,
        title: "",
        alias: "",
        banner_id: "",
        type: "",
        img: "",
        link: "",
        content: "",
        position: "",
        source_id: "",
        sort: "",
        status: "",
      }),
    };
  },
  watch: {
    statusSelect(newValue) {
      if (newValue !== undefined) {
        this.form.status = newValue.id;
      }
    },
    bannerSelect(newValue) {
      if (newValue !== undefined) {
        this.form.banner_id = newValue.id;
      }
    },
    typeSelect(newValue) {
      if (newValue !== undefined) {
        this.form.type = newValue.id;
      }
    },
    menuSelect(newValue) {
      if (newValue !== undefined) {
        this.form.source_id = newValue.id;
      }
    },
  },
  methods: {
    setContent(content) {
      this.form.content = content;
    },
    setImg(content) {
      (this.Form.img = content), (this.Form.img.src = content.src);
    },
    async load(id) {
      const response = await Api.getModel(id);
      this.form.load(response.data);
      this.statusSelect = this.statuses.find(
        (x) => String(x.id) === String(this.form.status)
      );
      this.bannerSelect = this.banners.find(
        (x) => String(x.id) === String(this.form.banner_id)
      );
      this.typeSelect = this.types.find(
        (x) => String(x.id) === String(this.form.type)
      );
    },
    async filtersLoad() {
      const response = await Api.getFilters();
      this.statuses = response.data.statuses;
      this.banners = response.data.banners;
      this.menus = response.data.menus;
      this.types = response.data.types;
    },
    async submit() {
      try {
        if (this.form.id) {
          await Api.updateModel(this.form.id, this.form.data);
          this.$emit("updated");
        } else {
          await Api.createModel(this.form.data);
          this.$emit("created");
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
    await this.filtersLoad();

    if (this.internalId) {
      await this.load(this.internalId);
    } else {
      this.isNewForm = true;
      // this.statusSelect = this.statuses[0];
    }
    this.loading = false;
  },
};
</script>
