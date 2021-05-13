import debounce from 'lodash/debounce'

export default {
    data() {
        return {
            $_table_debounce: 500,
        };
    },
    methods: {
        $_table_composeQuery(tableData, searchParams) {
            const sort = tableData.ascending ? tableData.sort : `-${tableData.sort}`;
            return {
                ...tableData,
                ...searchParams,
                sort,
            };
        }
    },
    created() {
        this.$_table_debouncedRefresh = debounce(this.refreshTable, this.$_table_debounce);
    },
}
