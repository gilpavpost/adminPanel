export default {
    filters: {
        currency(value) {
            return Number(value).toLocaleString('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 0
            });
        },
        percent(value) {
            const floatValue = Number(value);
            return `${floatValue} %`;
        },
        thousands(value) {
            return Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 0
            });
        },
    },
}