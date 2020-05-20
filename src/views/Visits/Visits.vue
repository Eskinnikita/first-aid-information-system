<template>
    <div class="thin-container">
        <div class="thin-container__controls">

        </div>
    </div>
</template>

<script>
    // import VisitSnippet from "../../components/VisitSnippet"
    export default {
        components: {
            // 'visit-snippet': VisitSnippet
        },
        data() {
            return {
                visit: {

                }
            }
        },
        methods: {
            goToVisitAdd() {
                this.$router.push('/visit-form')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .thin-container {
        &__controls {
            display: flex;
            flex-direction: column;

            button {
                margin: 20px 0;
            }
        }
    }
</style>