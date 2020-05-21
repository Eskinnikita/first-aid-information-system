<template>
    <div class="patient-view" v-if="this.patient">
        <div class="patient-view__controls">
            <div class="controls__back">
                <button class="btn" @click="goToPatientsList">Назад</button>
            </div>
            <div class="controls__patient-control">
                <button class="btn" @click="updatePatient(patient.id)">Изменить</button>
                <button class="btn" @click="deletePatient(patient.id)">Удалить</button>
            </div>
        </div>
        <h2>Информация о пациенте</h2>
        <div class="patient-view__row">
            <strong>Номер полиса:</strong> {{ this.patient.medicalPolicy }}
        </div>
        <div class="patient-view__row">
            <strong>ФИО:</strong> {{ this.patient.lastName }} {{ this.patient.firstName }} {{ this.patient.middleName }}
        </div>
        <div class="patient-view__row">
            <strong>Дата рождения:</strong> {{ convertDateFromJsToSql(this.patient.birthDate) }}
        </div>
        <div class="patient-view__row">
            <strong>Пол:</strong> {{ this.patient.gender === 1 ? 'женский' : 'мужской' }}
        </div>
        <div class="patient-view__row">
            <strong>Учебная группа:</strong> {{ this.patient.groupNum }}
        </div>
        <div class="patient-view__row">
            <strong>Номер телефона:</strong> {{ this.patient.phoneNumber }}
        </div>
        <div class="patient-view__visits">
            <h2 class="visits__header">
                История посещений
            </h2>
            <div><button class="btn" @click="goToVisitAdd">Добавить посещение</button></div>
        </div>
        <div class="visits-grid">
            <template v-if="patient.visits.length">
                <visit-history-snippet v-for="(visit, index) in patient.visits" :visit="visit" :key="index"/>
            </template>
            <h3 style="font-weight: normal" v-else>Пациент ни разу не посещал медпункт</h3>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import VisitsHistorySnippet from "../../components/VisitsHistorySnippet"

    export default {
        components: {
            'visit-history-snippet': VisitsHistorySnippet
        },
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
            goToVisitAdd() {
                this.$router.push('/visit-form')
            },
            deletePatient(id) {
                this.$store.dispatch('deletePatient', id)
                .then(() => {this.$router.push('/patients')})
            },
            updatePatient(id) {
                this.$store.dispatch('getPatientToUpdate', id)
                    .then(() => {this.$router.push('/patient-form')})
            },
            convertDateFromJsToSql(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [day,month,year].join('.');
            }
        },
        computed: {
            ...mapState(['patientsStore']),
            patient() {
                return this.patientsStore.patient
            }
        },
        beforeDestroy() {
            // this.$store.commit('SET_EMPTY_PATIENT')
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

    .visits-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;
    }

    .visits {
    }

</style>