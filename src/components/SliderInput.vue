<template>
    <div class="carrot-slider">
        <label v-text="label"></label>
        <vue-slider
                :class="classObject"
                v-bind="$attrs"
                ref="slider"
                :tooltip="false"
                v-model="range"
                :min="min"
                :max="max"
                :lazy="true"
                :disabled="isDisabled">
        </vue-slider>
        <b-input-group
                class="mt-2"
                size="sm"
                v-if="editing">
            <b-form-input
                    class="text-center"
                    v-model="valueFrom">
            </b-form-input>
            <div class="input-group-prepend">
                <span class="input-group-text">-</span>
            </div>
            <b-form-input
                    class="text-center"
                    v-model="valueTo">
            </b-form-input>
            <div class="input-group-append">
                <b-button
                        size="sm"
                        variant="outline-secondary"
                        @click="finishEdit">
                    <font-awesome-icon icon="check"></font-awesome-icon>
                </b-button>
            </div>
        </b-input-group>
        <div class="carrot-slider-range" v-else>
            <span
                    v-if="isDisabled"
                    class="text-muted">
                {{ $t('main.error.noInformation') }}
            </span>
            <template v-else>
                <span class="text-muted align-middle">
                    {{ valueFrom | thousands }} - {{ valueTo | thousands }}
                </span>
                <b-button
                        class="text-muted"
                        size="sm"
                        variant="link"
                        @click="startEdit">
                    <font-awesome-icon icon="edit"></font-awesome-icon>
                </b-button>
            </template>
        </div>
    </div>
</template>

<script>
    import vueSlider from 'vue-slider-component'
    import filtersMixin from '@/mixins/filters'

    export default {
        name: 'slider-input',
        inheritAttrs: false,
        components: {
            vueSlider,
        },
        mixins: [filtersMixin],
        props: {
            label: {
                type: String,
                required: true,
            },
            from: {
                required: true,
            },
            to: {
                required: true,
            },
            min: {
                type: Number,
            },
            max: {
                type: Number,
            },
        },
        data() {
            return {
                editing: false,
                valueFrom: this.min,
                valueTo: this.max,
            };
        },
        computed: {
            range: {
                get() {
                    return [this.valueFrom, this.valueTo];
                },
                set(newValue) {
                    [this.valueFrom, this.valueTo] = newValue;
                }
            },
            isDisabled() {
                //Если не указаны предельные значения, или максимальное значение совпадает с минимальным
                return (this.min === null) || (this.max === null) || (this.min === this.max);
            },
            classObject() {
                return {
                    'custom-slider': true,
                    inactive: (this.min === this.valueFrom) && (this.max === this.valueTo),
                };
            },
        },
        methods: {
            startEdit() {
                this.editing = true;
            },
            finishEdit() {
                this.editing = false;
            },
        },
        watch: {
            valueFrom(newValue) {
                this.$emit('update:from', newValue);
            },
            valueTo(newValue) {
                this.$emit('update:to', newValue);
            },
            min(newValue, oldValue) {
                if (this.valueFrom === oldValue) {
                    this.valueFrom = newValue;
                } else {
                    this.valueFrom = Math.max(this.valueFrom, newValue);
                }
            },
            max(newValue, oldValue) {
                if (this.valueTo === oldValue) {
                    this.valueTo = newValue;
                } else {
                    this.valueTo = Math.min(this.valueTo, newValue);
                }
            },
        },
    };
</script>

<style lang="scss">
    .custom-slider.vue-slider-component {
        .vue-slider-tooltip {
            background-color: $secondary;
            border-color: $secondary;
        }

        .vue-slider-process {
            background-color: $secondary;
        }

        &.inactive {
            .vue-slider-process {
                background-color: transparent;
            }
        }

        &.vue-slider-disabled {
            .vue-slider-dot {
                //display: none;
                transform: translateX(-8px);
            }
        }
    }

    .carrot-slider-range {
        margin-bottom: 1rem;
    }
</style>