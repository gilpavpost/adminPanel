<template>
    <div class="error">
        <b-card class="error-box">
            <h1> {{ $t("main.error.occurred") }}</h1>

            <p class="error-desc">{{ $t("main.error.contactUs") }}</p>

            <p>
                <b-button
                        variant="primary"
                        to="/">
                    {{ $t("main.toHome") }}
                </b-button>
                <b-button
                        class="ml-1"
                        variant="warning"
                        v-if="canGoBack"
                        @click="goBack">
                    {{ $t("main.back") }}
                </b-button>
            </p>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: 'error',
        computed: {
            canGoBack() {
                return window.history.length > 1;
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .error {
        max-width: 700px;
        margin: 0 auto;
        padding: 100px 15px 15px 15px;
    }

    .error-box {
        text-align: center;
    }

    .error-logo {
        max-width: 370px;
    }

    @include media-breakpoint-down(xs) {
        .error-logo {
            max-width: 200px;
        }
    }
</style>