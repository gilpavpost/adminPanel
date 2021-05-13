export default {
    methods: {
        $_notification_notify(message) {
            this.$notify({
                type: 'success',
                title: this.$t('main.notifications.title'),
                text: message,
            });
        },
        $_notification_confirmDelete(question, itemTitle, itemName) {
            return this.$swal({
                title: this.$t('main.confirm.title') ,
                text: itemTitle + ': ' + itemName + ' ' +question,
                showCancelButton: true,
                confirmButtonText: this.$t('main.confirm.yes'),
                cancelButtonText: this.$t('main.confirm.no')
            })
        },
    },
}