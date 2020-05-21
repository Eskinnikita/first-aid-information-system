<template>
    <div class="thin-container">
        <h1 class="page-title">Медикаменты</h1>
        <div class="thin-container__controls">
            <button @click="goToMedicalAdd" style="margin: 20px 0" class="btn">Добавить медикамент</button>
            <div class="input-block">
                <input type="text" placeholder="Поиск по названию" v-model="search">
            </div>
        </div>
        <template v-if="filteredMedical.length">
            <medical-snippet v-for="(medical, index) in filteredMedical" :key="index" :medical="medical"/>
        </template>
        <h2 v-else>Ничего не найдено</h2>
    </div>
</template>

<script>
    import MedicalSnippet from "../../components/MedicalSnippet"
    import {mapState} from 'vuex'
    export default {
        components: {
            'medical-snippet': MedicalSnippet
        },
        created() {
            this.$store.dispatch('getMedicals')
        },
        data() {
            return {
                search: ''
            }
        },
        methods: {
            goToMedicalAdd() {
                this.$router.push('/medical-form')
            }
        },
        computed: {
            ...mapState(['medicalsStore']),
            filteredMedical() {
                return this.medicalsStore.medicals.filter(el => {
                    return el.name.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .thin-container {
        &__controls {
            display: flex;
            flex-direction: column;
        }
    }
</style>