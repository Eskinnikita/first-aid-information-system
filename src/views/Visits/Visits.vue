<template>
    <div class="thin-container">
        <div class="thin-container__controls">
        </div>
        <visit-snippet v-for="(visit, index) in visitsStore.visits" :key="index" :visit="visit"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import VisitSnippet from "../../components/VisitSnippet"
    export default {
        components: {
            'visit-snippet': VisitSnippet
        },
        created() {
            this.$store.dispatch('getVisits')
        },
        data() {
            return {
                visit: {}
            }
        },
        methods: {
            goToVisitAdd() {
                this.$router.push('/visit-form')
            }
        },
        computed: {
            ...mapState(['visitsStore'])
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