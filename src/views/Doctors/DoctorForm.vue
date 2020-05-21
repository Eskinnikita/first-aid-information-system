<template>
    <div class="form-container">
        <h2>Добавление пациента</h2>
        <div class="input-block">
            <label for="lastName">Фамилия<span class="required-sign">*</span></label>
            <input v-model="doctor.lastName" type="text" id="lastName">
        </div>
        <div class="input-block">
            <label for="firstName">Имя<span class="required-sign">*</span></label>
            <input v-model="doctor.firstName" type="text" id="firstName">
        </div>
        <div class="input-block">
            <label for="middleName">Отчество<span class="required-sign">*</span></label>
            <input v-model="doctor.middleName" type="text" id="middleName">
        </div>
        <div class="input-block">
            <label for="password">Пароль от ИС<span class="required-sign">*</span></label>
            <input v-model="doctor.password" type="text" id="password">
        </div>
        <div class="input-block">
            <label for="phoneNumber">Номер телефона<span class="required-sign">*</span></label>
            <input v-model="doctor.phoneNumber" type="text" id="phoneNumber">
        </div>
        <div class="input-block input-block__checkbox">
            <label for="adminRights">Предоставить расширенные права?</label>
            <input v-model="doctor.isAdmin" type="checkbox" id="adminRights">
        </div>
        <button class="btn" style="width: 150px;" v-if="!doctorsStore.doctorToUpdate" @click="addDoctor">Добавить</button>
        <button class="btn" style="width: 200px" v-else @click="updateDoctor">Сохранить изменения</button>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        mounted() {
            if (this.doctorsStore.doctorToUpdate !== null) {
                this.doctor = this.doctorsStore.doctorToUpdate
            }
        },
        data() {
            return {
                doctor: {
                    lastName: '',
                    firstName: '',
                    middleName: '',
                    password: '',
                    phoneNumber: '',
                    isAdmin: false
                }
            }
        },
        methods: {
            addDoctor() {
                this.doctor.isAdmin =  this.doctor.isAdmin === false ? 0 : 1
                this.$store.dispatch('addDoctor', this.doctor)
                .then(() => {this.$router.push('/doctors')})
            },
            updateDoctor() {
                this.$store.dispatch('updateDoctor', this.doctor)
                .then(() => {this.$router.push('/doctors')})
            }
        },
        computed: {
            ...mapState(['doctorsStore'])
        },
        beforeDestroy() {
            this.$store.commit('EMPTY_DOCTOR_TO_UPDATE')
        }
    }
</script>

<style scoped>

</style>