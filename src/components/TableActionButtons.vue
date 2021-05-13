<template>
    <div class="float-right">
        <slot name="prependButtons"></slot>
        <b-button
                v-if="selectedVisible"
                size="sm"
                class="ml-1"
                variant="outline-secondary"
                @click.stop="selectedClick">
            <font-awesome-icon
                    fixed-width
                    icon="check">
            </font-awesome-icon>
        </b-button>
        <b-button
                v-if="updateVisible"
                size="sm"
                class="ml-1"
                variant="outline-secondary"
                @click.stop="updateClick">
            <font-awesome-icon
                    fixed-width
                    icon="edit">
            </font-awesome-icon>
        </b-button>
        <b-button
                v-if="deleteVisible"
                size="sm"
                class="ml-1"
                variant="outline-secondary"
                @click.stop="deleteClick">
            <font-awesome-icon
                    fixed-width
                    icon="trash-alt">
            </font-awesome-icon>
        </b-button>
        <b-button
                v-if="printVisible"
                size="sm"
                class="ml-1"
                variant="outline-secondary"
                @click.stop="printClick">
            <font-awesome-icon
                    fixed-width
                    icon="book-open">
            </font-awesome-icon>
        </b-button>
        <slot name="appendButtons"></slot>
    </div>
</template>

<script>
  export default {
    props: {
      selectedVisible: {
        type: Boolean,
        default: false,
      },
      updateVisible: {
        type: Boolean,
        default: true,
      },
      deleteVisible: {
        type: Boolean,
        default: true,
      },
      printVisible: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      selectedClick () {
        this.$emit('selected');
      },
      updateClick () {
        this.$emit('update');
      },
      deleteClick () {
        this.$emit('delete');
      },
      printClick () {
        this.$emit('print');
      },
    },
  }
</script>