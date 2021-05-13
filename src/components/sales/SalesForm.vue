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
        <b-form-group :label="$t('sales.labels.title')" label-for="titleInput">
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
          :label="$t('sales.labels.description')"
          label-for="discriptionInput"
        >
          <b-form-input
            :state="form.isValid('description')"
            v-model="form.description"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('description')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('sales.labels.type_expanded')"
          label-for="type_expandedInput"
        >
          <multiselect
            v-model="typeExpandedSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="types_expanded"
            :searchable="false"
            :allow-empty="true"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }"
              >{{ option.title }}
            </template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('type_expanded')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <template v-if="this.form.type_expanded === 1">
      <b-form-row>
        <b-col md="12">
          <b-form-group>
            <multiselect
              v-model="goodsExpandedSelect"
              :tag-placeholder="$t('main.notFound')"
              track-by="id"
              :resolveOnLoad="false"
              label="title"
              :multiple="true"
              @search-change="asyncFindGoods"
              :hide-selected="true"
              :placeholder="$t('sales.labels.place_goods')"
              :options="goods"
              :searchable="true"
              :allow-empty="true"
              v-bind="selectOptions"
            >
              <template slot="singleLabel" slot-scope="{ option }"
                >{{ option.title }}
              </template>
            </multiselect>
            <b-form-invalid-feedback
              v-text="form.errors.get('type_expanded')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>

    <template v-if="this.form.type_expanded === 2">

        <b-form-row>
          <b-col md="12">
            <b-form-group>
              <multiselect
                v-model="categoryExpandedSelect"
                :tag-placeholder="$t('main.notFound')"
                track-by="id"
                label="title"
                :multiple="true"
                @search-change="asyncFindCategory"
                :close-on-select="false"
                :hide-selected="true"
                :placeholder="$t('sales.labels.place_goods')"
                :options="categories"
                :searchable="true"
                :allow-empty="true"
                v-bind="selectOptions"
              >
                <template slot="singleLabel" slot-scope="{ option }"
                  >{{ option.title }}
                </template>
              </multiselect>
              <b-form-invalid-feedback
                v-text="form.errors.get('type_expanded')"
              ></b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row> </template>

    <template v-if="this.form.type_expanded === 4">
      <b-form-row>
        <b-col md="12">
          <b-form-group
            :label="$t('sales.labels.link_on_filter')"
            label-for="link_filter"
          >
            <b-form-input
              :state="form.isValid('typeExpandedFilter')"
              v-model="form.configuration_expanded.typeExpandedFilter"
              type="number"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('typeExpandedFilter')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('sales.labels.order_discount')"
          label-for="title_order_discount"
        >
          <b-form-input
            :state="form.isValid('order_discount')"
            v-model="form.order_discount"
            type="number"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('order_discount')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('sales.labels.order_discount_type')"
          label-for="order_discount_typeInput"
        >
          <multiselect
            v-model="orderDiscountTypesSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="order_discount_types"
            :searchable="false"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }"
              >{{ option.title }}
            </template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('order_discount_type')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('sales.labels.dateBeginFormatted')"
          label-for="dateBeginInput"
        >
          <b-form-input
            type="date"
            :state="form.isValid('dateBeginFormatted')"
            v-model="formatBeginDate"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('dateBeginFormatted')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('sales.labels.dateEndFormatted')"
          label-for="dateEndInput"
        >
          <b-form-input
            type="date"
            :state="form.isValid('dateEndFormatted')"
            v-model="formatEndDate"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('dateEndFormatted')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('sales.labels.available')"
          label-for="availableInput"
        >
          <multiselect
            v-model="availabilitySelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="availability"
            :searchable="true"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="firstLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('available')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('sales.labels.priority')"
          label-for="priorityInput"
        >
          <b-form-input
            type="number"
            :state="form.isValid('priority')"
            v-model="form.priority"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('priority')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('sales.labels.status')"
          label-for="statusInput"
        >
          <multiselect
            v-model="statusIdSelect"
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
  </b-form>
</template>

<script>
import Form from "@/utils/Form";
import Api from "@/api/v1/sales";
import CategoryApi from "@/api/v1/categories-goods";
import Goods from "@/api/v1/goods-list";
import Multiselect from "vue-multiselect";
import moment from "moment";

export default {
  components: {
    Multiselect,
  },
  props: {
    internalId: {
      default: null,
    },
  },
  data: function() {
    return {
      loading: false,
      goods: [],
      categories: [],
      statuses: [],
      types_expanded: [],
      order_discount_types: [],
      delivery_discount_types: [],
      availability: [],
      statusIdSelect: null,
      typesSelect: null,
      formatBeginDate: null,
      formatEndDate: null,
      dateBeginFormatted: null,
      dateEndFormatted: null,
      typeExpandedSelect: [],
      goodsExpandedSelect: [],
      categoryExpandedSelect: [],
      orderDiscountTypesSelect: [],
      deliveryDiscountTypesSelect: [],
      availabilitySelect: [],
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
        status: "",
        description: "",
        type_expanded: "",
        configuration_expanded: {
          typeExpandedGoods: [],
          typeExpandedCategories: [],
          typeExpandedFilter: null,
        },
        order_discount: "",
        order_discount_types: "",
        dateBeginFormatted: "",
        dateEndFormatted: "",
        availability: "",
        priority: "",
      }),
    };
  },

  watch: {
    formatBeginDate(newValue) {
      this.form.dateBeginFormatted = moment(newValue).format("DD-MM-YYYY");
    },
    formatEndDate(newValue) {
      this.form.dateEndFormatted = moment(newValue).format("DD-MM-YYYY");
    },
    statusIdSelect(newValue) {
      if (newValue !== undefined) {
        this.form.status = newValue.id;
      }
    },
    async typeExpandedSelect(newValue) {
      if (newValue.lenght > 0) {
        this.form.type_expanded = newValue.id;
        if (newValue.id === 1) {
          await this.goodsLoad();
        } else if (newValue.id === 2) {
          await this.categoriesLoad();
        }
      }
    },
    availabilitySelect(newValue) {
      if (newValue !== undefined) {
        this.form.available = newValue.id;
      }
    },
    orderDiscountTypesSelect(newValue) {
      if (newValue !== undefined) {
        this.form.order_discount_types = newValue.id;
      }
    },
    goodsExpandedSelect(newValue) {
      if (newValue.length > 0) {
        this.form.configuration_expanded.typeExpandedGoods.length = 0;
        newValue.forEach((element) => {
          this.form.configuration_expanded.typeExpandedGoods.push(element.id);
        });
      }
    },
    categoryExpandedSelect(newValue) {
      if (newValue.length > 0) {
          this.form.configuration_expanded.typeExpandedCategories.length = 0;
        newValue.forEach((element) => {
          this.form.configuration_expanded.typeExpandedCategories.push(
            element.id
          );
        });
      }
    },
  },
  methods: {
    asyncFindGoods(query) {
      this.isLoading = true;
      Goods.getQuery(query).then((response) => {
        this.goods = response.data;
        this.isLoading = false;
      });
    },
    asyncFindCategory(query) {
      this.isLoading = true;
      CategoryApi.getQuery(query).then((response) => {
        this.categories = response.data;
        this.isLoading = false;
      });
    },

    async load(id) {
      const response = await Api.getModel(id);
      this.form.load(response.data);
      this.formatBeginDate = moment(this.form.dateBeginFormatted).format(
        "YYYY-MM-DD"
      );
      this.formatEndDate = moment(this.form.dateEndFormatted).format(
        "YYYY-MM-DD"
      );
      this.statusIdSelect = this.statuses.find(
        (x) => String(x.id) === String(this.form.status)
      );
      this.typeExpandedSelect = this.types_expanded.find(
        (x) => String(x.id) === String(this.form.type_expanded)
      );
      this.orderDiscountTypesSelect = this.order_discount_types.find(
        (x) => String(x.id) === String(this.form.order_discount_types)
      );
      this.availabilitySelect = this.availability.find(
        (x) => String(x.id) === String(this.form.availability)
      );
    },
    async filtersLoad() {
      const response = await Api.getFilters();
      this.statuses = response.data.statuses;
      this.types_expanded = response.data.types_expanded;
      this.order_discount_types = response.data.order_discount_types;
      this.delivery_discount_types = response.data.delivery_discount_types;
      this.availability = response.data.availability;
    },
    async goodsLoad() {
      const response = await Goods.getModels();
      const arr = this.form.configuration_expanded.typeExpandedGoods;
      this.goods = response.data;
      this.goodsExpandedSelect.length = 0;
      for (var iter = 0; iter < arr.length; iter++) {
        this.goodsExpandedSelect.push(
          this.goods.find((x) => String(x.id) === String(arr[iter]))
        );
      }
    },

    async categoriesLoad() {
      const response = await CategoryApi.getModels();
      this.categories = response.data;
      this.categoryExpandedSelect.length = 0;
      const arr = this.form.configuration_expanded.typeExpandedCategories;
      for (var iter = 0; iter < arr.length; iter++) {
        this.categoryExpandedSelect.push(
          this.categories.find((x) => String(x.id) === String(arr[iter]))
        );
      }
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
      this.statusIdSelect = this.statuses[0];
      this.typeExpandedSelect = this.types_expanded[0];
      this.orderDiscountTypesSelect = this.order_discount_types[0];
      this.availabilitySelect = this.availability[0];
    }
    this.loading = false;
  },
};
</script>
