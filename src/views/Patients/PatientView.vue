<template>
    <div class="patient-view" v-if="this.patient">
        <div class="patient-view__controls">
            <div class="controls__back">
                <button @click="goToPatientsList">Назад</button>
            </div>
            <div class="controls__patient-control">
                <button @click="updatePatient(patient.id)">Изменить</button>
                <button @click="deletePatient(patient.id)">Удалить</button>
            </div>
        </div>
        <div class="patient-view__row">
            <strong>Номер полиса:</strong> {{ this.patient.medicalPolicy }}
        </div>
        <div class="patient-view__row">
            <strong>ФИО:</strong> {{ this.patient.lastName }} {{ this.patient.firstName }} {{ this.patient.middleName }}
        </div>
        <div class="patient-view__row">
            <strong>Дата рождения:</strong> {{ this.patient.birthDate }}
        </div>
        <div class="patient-view__row">
            <strong>Пол:</strong> {{ this.patient.gender === true ? 'женский' : 'мужской' }}
        </div>
        <div class="patient-view__row">
            <strong>Учебная группа:</strong> {{ this.patient.groupNum }}
        </div>
        <div class="patient-view__row">
            <strong>Номер телефона:</strong> {{ this.patient.phoneNumber }}
        </div>
        <div class="patient-view__visits">
            <div class="visits__header">
                История посещений
            </div>
            <div><button>Добавить посещение</button></div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        created() {
            const id = this.$route.params.id
            this.$store.dispatch('getPatientById', id)
        },
        data() {
            return {
            }
        },
        methods: {
            goToPatientsList() {
                this.$router.push('/patients')
            },
            deletePatient(id) {
                this.$store.dispatch('deletePatient', id)
                .then(() => {this.$router.push('/patients')})
            },
            updatePatient(id) {
                this.$store.dispatch('getPatientToUpdate', id)
                    .then(() => {this.$router.push('/patient-form')})
            }
        },
        computed: {
            ...mapState(['patientsStore']),
            patient() {
                return this.patientsStore.patient
            }
        },
        beforeDestroy() {
            this.$store.commit('SET_EMPTY_PATIENT')
        }
    }
</script>

<style lang="scss" scoped>
    .patient-view {
        &__row {
            margin-bottom: 15px;
            font-size: 18px;
        }

        &__controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #bebebe;
            margin-bottom: 40px;
        }

        &__visits {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #bebebe;
        }
    }

</style>