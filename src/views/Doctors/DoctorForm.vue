<template>
    <div class="form-container">
        <h2>Добавление пациента</h2>
        <div class="input-block">
            <label for="lastName">Фамилия<span class="required-sign">*</span></label>
            <input
                    v-model="doctor.lastName"
                    type="text"
                    id="lastName"
                    :class="{'invalid-input': ($v.doctor.lastName.$dirty && !$v.doctor.lastName.required)}"
            >
            <span class="input-block__error" v-if="$v.doctor.lastName.$dirty && !$v.doctor.lastName.required">Введите фамилию</span>
        </div>
        <div class="input-block">
            <label for="firstName">Имя<span class="required-sign">*</span></label>
            <input
                    v-model="doctor.firstName"
                    type="text"
                    id="firstName"
                    :class="{'invalid-input': ($v.doctor.firstName.$dirty && !$v.doctor.firstName.required)}"
            >
            <span class="input-block__error" v-if="$v.doctor.firstName.$dirty && !$v.doctor.firstName.required">Введите имя</span>
        </div>
        <div class="input-block">
            <label for="middleName">Отчество<span class="required-sign">*</span></label>
            <input
                    v-model="doctor.middleName"
                    type="text"
                    id="middleName"
                    :class="{'invalid-input': ($v.doctor.middleName.$dirty && !$v.doctor.middleName.required)}"
            >
            <span class="input-block__error" v-if="$v.doctor.middleName.$dirty && !$v.doctor.middleName.required">Введите отчество</span>
        </div>
        <div class="input-block">
            <label for="password">Пароль от ИС<span class="required-sign">*</span></label>
            <input
                    v-model="doctor.password"
                    type="text"
                    id="password"
                    :class="{'invalid-input': ($v.doctor.password.$dirty && !$v.doctor.password.required)}"
            >
            <span class="input-block__error" v-if="$v.doctor.password.$dirty && !$v.doctor.password.required">Введите отчество</span>
        </div>
        <div class="input-block">
            <label for="phoneNumber">Номер телефона</label>
            <input
                    v-model="doctor.phoneNumber"
                    type="text"
                    id="phoneNumber"
            >
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
    import {required} from 'vuelidate/lib/validators'
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
        validations: {
            doctor: {
                lastName: {required},
                firstName: {required},
                middleName: {required},
                password: {required}
            }
        },
        methods: {
            addDoctor() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                } else {
                    this.doctor.isAdmin = this.doctor.isAdmin === false ? 0 : 1
                    this.$store.dispatch('addDoctor', this.doctor)
                        .then(() => {
                            this.$router.push('/doctors')
                        })
                }
            },
            updateDoctor() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                } else {
                    this.$store.dispatch('updateDoctor', this.doctor)
                        .then(() => {
                            this.$router.push('/doctors')
                        })
                }
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