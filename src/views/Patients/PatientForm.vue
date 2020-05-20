<template>
    <div class="form-container">
        <h2>Добавление пациента</h2>
        <div class="input-block">
            <label for="policy">Номер медицинского полиса<span class="required-sign">*</span></label>
            <input v-model="patient.medicalPolicy" type="text" id="policy">
        </div>
        <div class="input-block">
            <label for="lastName">Фамилия<span class="required-sign">*</span></label>
            <input v-model="patient.lastName" type="text" id="lastName">
        </div>
        <div class="input-block">
            <label for="firstName">Имя<span class="required-sign">*</span></label>
            <input v-model="patient.firstName" type="text" id="firstName">
        </div>
        <div class="input-block">
            <label for="middleName">Отчество<span class="required-sign">*</span></label>
            <input v-model="patient.middleName" type="text" id="middleName">
        </div>
        <div class="input-block">
            <label for="birth">Дата рождения<span class="required-sign">*</span></label>
            <input v-model="patient.birthDate" type="date" id="birth">
        </div>
        <div class="input-block">
            <label for="gender">Пол<span class="required-sign">*</span></label>
            <select v-model="patient.gender" type="date" id="gender">
                <option value="false">Мужской</option>
                <option value="true">Женский</option>
            </select>
        </div>
        <div class="input-block">
            <label for="group">Номер группы<span class="required-sign">*</span></label>
            <input v-model="patient.groupNum" type="text" id="group">
        </div>
        <div class="input-block">
            <label for="phoneNumber">Номер телефона</label>
            <input v-model="patient.phoneNumber" type="text" id="phoneNumber">
        </div>
        <button style="width: 150px" v-if="!this.patientsStore.patientToUpdate" @click="addPatient">Добавить</button>
        <button style="width: 200px" v-else @click="updatePatient">Сохранить изменения</button>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        created() {
            // let today = new Date();
            // const dd = String(today.getDate()).padStart(2, '0');
            // const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            // const yyyy = today.getFullYear();
            // this.patient.birthDate = `${yyyy}-${mm}-${dd}`;
            this.patient.birthDate = this.formatDate(new Date())
            console.log(this.patient.birthDate)
        },
        mounted() {
            if (this.patientsStore.patientToUpdate !== null) {
                this.patientsStore.patientToUpdate.gender = this.patientsStore.patientToUpdate.gender !== 0
                this.patientsStore.patientToUpdate.birthDate = this.convertDateFromJsToSql(this.patientsStore.patientToUpdate.birthDate)
                this.patient = this.patientsStore.patientToUpdate
            }
        },
        data() {
            return {
                patient: {
                    medicalPolicy: '',
                    lastName: '',
                    firstName: '',
                    middleName: '',
                    birthDate: '',
                    gender: true,
                    groupNum: '',
                    phoneNumber: ''
                }
            }
        },
        methods: {
            addPatient() {
                this.$store.dispatch('addPatient', this.patient)
            },
            updatePatient() {
                this.$store.dispatch('updatePatient', this.patient).then(() => {
                    this.$router.push(`/patient-view/${this.patient.id}`)
                })
            },
            formatDate(date) {
                let today = date;
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = today.getFullYear();
                return `${yyyy}-${mm}-${dd}`
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

                return [year, month, day].join('-');
            }
        },
        computed: {
            ...mapState(['patientsStore'])
        },
        beforeDestroy() {
            this.$store.commit('EMPTY_EMPTY_PATIENT_TO_UPDATE')
        }
    }
</script>

<style scoped>
    .form-container {
        text-align: center;
    }
</style>