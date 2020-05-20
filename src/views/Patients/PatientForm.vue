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
        <button style="width: 150px" @click="addPatient">Добавить</button>
    </div>
</template>

<script>
    export default {
        created() {
            let today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = today.getFullYear();
            this.patient.birthDate = `${yyyy}-${mm}-${dd}`;
            console.log(this.patient.birthDate)
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
            }
        },
        computed: {}
    }
</script>

<style scoped>
    .form-container {
        text-align: center;
    }
</style>