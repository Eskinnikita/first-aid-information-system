<template>
    <div class="visit-history-snippet">
        <div class="visit-history-snippet__header">
            <h3 class="visit-history-snippet__title">{{visit.title}}</h3>
            <button class="btn btn__empty" @click="goToVisitDetails">Подробнее</button>
        </div>
        <div class="visit-history-snippet__text">
            <p v-if="visit.complaint">{{shortComplaint}}</p>
            <span>Дата посещения: {{convertDateFromJsToSql(visit.visitDate)}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            visit: {
                type: Object,
                required: true
            }
        },
        methods: {
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
            },
            goToVisitDetails() {
                this.$store.commit('SET_EMPTY_VISIT')
                this.$store.commit('SET_BACK_STATUS', 1)
                this.$router.push(`/visit-view/${this.visit.id}`)
            }
        },
        computed: {
            shortComplaint() {
                return this.visit.complaint.split('').splice(0, 80).join('') + '...'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .visit-history-snippet {
        border: 1px solid #bebebe;
        padding: 10px 15px  20px;

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__title {
            font-weight: normal;
        }
    }
</style>