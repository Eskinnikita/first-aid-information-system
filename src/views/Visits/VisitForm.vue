<template>
    <div class="form-container">
        <h2>Добавление посещения</h2>
        <div class="input-block">
            <label for="1">Тема обращения<span class="required-sign">*</span></label>
            <input v-model="visit.title" type="text" id="1">
        </div>
        <div class="input-block">
            <label for="3">Дата и время посещения (текущие по умолчанию)</label>
            <input v-model="visit.visitDate" type="datetime-local" id="3">
        </div>
        <div class="input-block">
            <label for="4">Жалобы</label>
            <textarea v-model="visit.complaint" style="height: 200px" type="text" id="4"></textarea>
        </div>
        <div class="input-block">
            <label for="5">Предположительный диагноз</label>
            <textarea v-model="visit.diagnosis" style="height: 200px" type="text" id="5"></textarea>
        </div>
        <button style="width: 150px" v-if="!visitsStore.visitToUpdate" @click="addVisit">Добавить</button>
        <button style="width: 200px" @click="updateVisit" v-else >Сохранить изменения</button>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        mounted() {
            this.visit.visitDate = this.getLocalDate(Date.now())
            if(this.visitsStore.visitToUpdate !== null) {
                this.visit = this.visitsStore.visitToUpdate
                this.visit.visitDate = this.getLocalDate(this.visit.visitDate)
            }
        },
        data() {
            return {
                visit: {
                    patientId: null,
                    doctorId: null,
                    visitDate: null,
                    title: '',
                    complaint: '',
                    diagnosis: ''
                }
            }
        },
        methods: {
            addVisit() {
                this.visit.patientId = this.patientsStore.patient.id
                this.visit.doctorId = this.user.id
                this.$store.dispatch('addVisit', this.visit)
                .then(() => {this.$router.push(`/patient-view/${this.patientsStore.patient.id}`)})
            },
            getLocalDate(value) {
                const offset = new Date().getTimezoneOffset() * 1000 * 60
                const offsetDate = new Date(value).valueOf() - offset
                const date = new Date(offsetDate).toISOString()
                return date.substring(0, 16)
            },
            updateVisit() {
                this.$store.dispatch(`updateVisit`, this.visit)
                .then(() => {this.$router.push(`/visit-view/${this.visit.id}`)})
            }
        },
        computed: {
           ...mapState(['patientsStore', 'user', 'visitsStore'])
        },
        beforeDestroy() {
            this.$store.commit('SET_EMPTY_VISIT_TO_UPDATE')
        }
    }
</script>

<style scoped>

</style>