<template>
    <div class="visit-view">
        <div class="visit-view__controls">
            <div class="controls__back">
                <button @click="() => {}">Назад</button>
            </div>
            <div class="controls__patient-control">
                <button @click="updateVisit(visit.id)">Изменить</button>
                <button @click="deleteVisit(visit.id)">Удалить</button>
            </div>
        </div>
        <h2>Информация о посещении</h2>
        <div class="visit-view__row">
            <strong>Пациент:</strong> {{visit.patientInfo.lastName}} {{visit.patientInfo.firstName}}
            {{visit.patientInfo.middleName}} из группы {{visit.patientInfo.groupNum}}
        </div>
        <div class="visit-view__row">
            <strong>Дата и время посещения:</strong> {{visit.visitDate}}
        </div>
        <div class="visit-view__row">
            <strong>Жалоба:</strong>
            <p>{{visit.complaint}}</p>
        </div>
        <div class="visit-view__row">
            <strong>Диагноз:</strong>
            <p>{{visit.diagnosis}}</p>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        created() {
            const id = this.$route.params.id
            this.$store.dispatch('getVisitById', id)
        },
        methods: {
            updateVisit(id) {
                this.$store.dispatch('getVisitToUpdate', id)
                    .then(() => {
                        this.$router.push('/visit-form')
                    })
            },
            deleteVisit(id) {
                this.$store.dispatch('deleteVisit', id)
                    .then(() => {
                        this.$router.push('/visits')
                    })
            }
        },
        computed: {
            ...mapState(['visitsStore']),
            visit() {
                return this.visitsStore.visit
            }
        }
    }
</script>

<style lang="scss" scoped>
    .visit-view {
        &__controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #bebebe;
            margin-bottom: 40px;
        }

        &__row {
            margin-bottom: 15px;
            font-size: 18px;

            p {
                margin: 10px 0 0 0;
                padding: 0;
            }
        }
    }
</style>