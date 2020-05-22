<template>
    <div class="visit-view" v-if="visit">
        <div class="visit-view__controls">
            <div class="controls__back">
                <button class="btn" @click="goBack">Назад</button>
            </div>
            <div class="controls__patient-control">
                <button class="btn" @click="updateVisit(visit.id)">Изменить</button>
                <button class="btn" @click="deleteVisit(visit.id)">Удалить</button>
            </div>
        </div>
        <h2>Информация о посещении</h2>
        <div class="visit-view__row">
            <strong>Причина обращения:</strong> {{visit.title}}
        </div>
        <div class="visit-view__row">
            <strong>Пациент:</strong> {{visit.patientInfo.lastName}} {{visit.patientInfo.firstName}}
            {{visit.patientInfo.middleName}} из группы {{visit.patientInfo.groupNum}}
        </div>
        <div class="visit-view__row">
            <strong>Дата и время посещения:</strong> {{convertDateFromJsToSql(visit.visitDate)}}
        </div>
        <div class="visit-view__row" v-if="visit.complaint">
            <strong>Жалоба:</strong>
            <p>{{visit.complaint}}</p>
        </div>
        <div class="visit-view__row" v-if="visit.diagnosis">
            <strong>Диагноз:</strong>
            <p>{{visit.diagnosis}}</p>
        </div>
        <div class="notes">
            <div class="notes__header">
                <h2>Выданные направления</h2>
                <button class="btn" @click="addNote">Добавить направление</button>
            </div>
            <template v-if="visit.notes.length">
                <visit-note v-for="(note, index) in visit.notes" :key="index" :note="note"/>
            </template>
            <h3 v-else style="font-weight: normal">
                Во время посещения пациенту не были выданы направления
            </h3>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Note from "../../components/Note"

    export default {
        components: {
            'visit-note': Note
        },
        created() {
            const id = this.$route.params.id
            this.$store.dispatch('getVisitById', id)
        },
        data() {
            return {
            }
        },
        methods: {
            addNote() {
                this.$router.push('/note-form')
            },
            goBack() {
                console.log(this.visit)
                if(this.visitsStore.backStatus === 1) {
                    this.$router.push(`/patient-view/${this.visit.patientId}`)
                }
                else if(this.visitsStore.backStatus === 2) {
                    this.$router.push(`/visits`)
                }
            },
            updateVisit(id) {
                this.$store.dispatch('getVisitToUpdate', id)
                    .then(() => {
                        this.$router.push('/visit-form')
                    })
            },
            deleteVisit(id) {
                this.$store.dispatch('deleteVisit', id)
                    .then(() => {
                        if(this.visitsStore.backStatus === 1) {
                            this.$router.push(`/patient-view/${this.visit.patientId}`)
                        }
                        else if(this.visitsStore.backStatus === 2) {
                            this.$router.push(`/visits`)
                        }
                    })
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
            ...mapState(['visitsStore']),
            visit() {
                return this.visitsStore.visit
            }
        },
        beforeDestroy() {
            // this.$store.commit('SET_BACK_STATUS', 3)
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

    .notes {
        border-top: 1px solid #bebebe;
        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>