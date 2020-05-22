<template>
    <div class="doctor-snippet">
        <div class="doctor-snippet__header">
            <span>{{doctor.lastName}} {{doctor.firstName}} {{doctor.middleName}}</span>
            <div v-if="doctor.id !== user.id">
                <button class="btn btn__empty" @click="updateDoctor(doctor.id)">Изменить</button>
                <button class="btn btn__empty" @click="deleteDoctor">Удалить</button>
            </div>
        </div>
        <div class="doctor-snippet__content">
            <p v-if="doctor.phoneNumber">
                Номер телефона: {{doctor.phoneNumber}}
            </p>
            <p>
                Является ли администратором: {{doctor.isAdmin === 0 ? 'Нет' : 'Да'}}
            </p>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        props: {
            doctor: {
                type: Object,
                required: true
            }
        },
        mounted() {

        },
        methods: {
            updateDoctor(id) {
                this.$store.dispatch('getDoctorToUpdate', id)
                    .then(() => {
                        this.$router.push('/doctor-form')
                    })
            },
            deleteDoctor() {
                this.$store.dispatch('deleteDoctor', this.doctor.id)
            }
        },
        computed: {
            ...mapState(['user'])
        }
    }
</script>

<style lang="scss" scoped>
    .doctor-snippet {
        margin-bottom: 20px;
        padding: 15px 15px;
        border: 1px solid #bebebe;

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>