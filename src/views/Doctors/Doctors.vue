<template>
    <div class="thin-container">
        <h1 class="page-title">Персонал</h1>
        <div class="thin-container__controls">
            <button @click="addDoctor" class="btn" style="margin: 20px 0">Добавить врача</button>
            <div class="input-block">
                <input type="text" placeholder="Поиск по ФИО" v-model="search">
            </div>
        </div>
        <template v-if="filteredDoctors.length">
            <doctor-snippet v-for="(doctor, index) in filteredDoctors" :key="index" :doctor="doctor"/>
        </template>
        <h2 v-else>Ничего не найдено</h2>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import DoctorSnippet from "../../components/DoctorSnippet"

    export default {
        components: {
            'doctor-snippet': DoctorSnippet
        },
        created() {
            this.$store.dispatch('getDoctors')
        },
        data() {
            return {
                search: ''
            }
        },
        methods: {
            addDoctor() {
                this.$router.push('/doctor-form')
            }
        },
        computed: {
            ...mapState(['doctorsStore']),
            filteredDoctors() {
                return this.doctorsStore.doctors.filter(el => {
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
        }
    }
</style>