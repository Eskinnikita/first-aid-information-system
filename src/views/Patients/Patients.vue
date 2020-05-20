<template>
    <div class="thin-container">
        <div class="thin-container__controls">
            <button @click="goToPatientAdd">Добавить пациента</button>
            <div class="input-block">
                <input type="text" placeholder="Поиск по ФИО" v-model="search">
            </div>
        </div>
        <template v-if="filteredPatients.length">
            <patient-snippet v-for="(patient, index) in filteredPatients" :key="index" :patient="patient"/>
        </template>
        <h2 v-else>Ничего не найдено</h2>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import PatientSnippet from "../../components/PatientSnippet"

    export default {
        components: {
            'patient-snippet': PatientSnippet
        },
        created() {
            this.$store.dispatch('getPatients')
        },
        data() {
            return {
                search: ''
            }
        },
        methods: {
            goToPatientAdd() {
                this.$router.push('/patient-form')
            }
        },
        computed: {
            ...mapState(['patientsStore']),
            filteredPatients() {
                return this.patientsStore.patients.filter(el => {
                    return el.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
                        el.middleName.toLowerCase().includes(this.search.toLowerCase()) ||
                        el.lastName.toLowerCase().includes(this.search.toLowerCase())})
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
                margin: 20px 40px;
            }
        }
    }
</style>