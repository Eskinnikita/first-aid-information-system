<template>
    <div class="form-container">
        <h2>Добавление пациента</h2>
        <div class="input-block">
            <label for="policy">Номер медицинского полиса<span class="required-sign">*</span></label>
            <input v-model="patient.medicalPolicy" type="text" id="policy"
                   :class="{'invalid-input': ($v.patient.medicalPolicy.$dirty && !$v.patient.medicalPolicy.required)}">
            <span class="input-block__error" v-if="$v.patient.medicalPolicy.$dirty && !$v.patient.medicalPolicy.required">Введите номер медицинского полиса</span>
        </div>
        <div class="input-block">
            <label for="lastName">Фамилия<span class="required-sign">*</span></label>
            <input v-model="patient.lastName" type="text" id="lastName"
                   :class="{'invalid-input': ($v.patient.lastName.$dirty && !$v.patient.lastName.required)}">
            <span class="input-block__error" v-if="$v.patient.lastName.$dirty && !$v.patient.lastName.required">Введите фамилию</span>
        </div>
        <div class="input-block">
            <label for="firstName">Имя<span class="required-sign">*</span></label>
            <input v-model="patient.firstName" type="text" id="firstName"
                   :class="{'invalid-input': ($v.patient.firstName.$dirty && !$v.patient.firstName.required)}">
            <span class="input-block__error" v-if="$v.patient.firstName.$dirty && !$v.patient.firstName.required">Введите имя</span>
        </div>
        <div class="input-block">
            <label for="middleName">Отчество<span class="required-sign">*</span></label>
            <input v-model="patient.middleName" type="text" id="middleName"
                   :class="{'invalid-input': ($v.patient.middleName.$dirty && !$v.patient.middleName.required)}">
            <span class="input-block__error" v-if="$v.patient.middleName.$dirty && !$v.patient.middleName.required">Введите отчество</span>
        </div>
        <div class="input-block">
            <label for="birth">Дата рождения<span class="required-sign">*</span></label>
            <input v-model="patient.birthDate" type="date" id="birth"
                   :class="{'invalid-input': ($v.patient.birthDate.$dirty && !$v.patient.birthDate.required)}">
            <span class="input-block__error" v-if="$v.patient.birthDate.$dirty && !$v.patient.birthDate.required">Введите дату рождения</span>
        </div>
        <div class="input-block">
            <label for="gender">Пол<span class="required-sign">*</span></label>
            <select v-model="patient.gender" type="date" id="gender">
                <option value="0">Мужской</option>
                <option value="1">Женский</option>
            </select>
        </div>
        <div class="input-block">
            <label for="group">Номер группы<span class="required-sign">*</span></label>
            <input v-model="patient.groupNum" type="text" id="group"
                   :class="{'invalid-input': ($v.patient.groupNum.$dirty && !$v.patient.groupNum.required)}">
            <span class="input-block__error" v-if="$v.patient.groupNum.$dirty && !$v.patient.groupNum.required">Введите номер группы</span>
        </div>
        <div class="input-block">
            <label for="phoneNumber">Номер телефона</label>
            <input v-model="patient.phoneNumber" type="text" id="phoneNumber">
        </div>
        <button class="btn" style="width: 150px" v-if="!this.patientsStore.patientToUpdate" @click="addPatient">
            Добавить
        </button>
        <button class="btn" style="width: 200px" v-else @click="updatePatient">
            Сохранить изменения
        </button>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {required} from 'vuelidate/lib/validators'

    export default {
        created() {
            this.patient.birthDate = this.formatDate(new Date())
        },
        mounted() {
            if (this.patientsStore.patientToUpdate !== null) {
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
                    gender: 0,
                    groupNum: '',
                    phoneNumber: ''
                }
            }
        },
        validations: {
            patient: {
                medicalPolicy: {required},
                lastName: {required},
                firstName: {required},
                middleName: {required},
                birthDate: {required},
                gender: {required},
                groupNum: {required}
            }
        },
        methods: {
            addPatient() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                } else {
                    this.$store.dispatch('addPatient', this.patient)
                        .then(() => {
                            this.$router.push(`/patients`)
                        })
                }
            },
            updatePatient() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                } else {
                    this.$store.dispatch('updatePatient', this.patient).then(() => {
                        this.$router.push(`/patient-view/${this.patient.id}`)
                    })
                }
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
            this.$store.commit('EMPTY_PATIENT_TO_UPDATE')
        }
    }
</script>

<style scoped>
</style>