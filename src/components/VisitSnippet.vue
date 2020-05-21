<template>
    <div class="visit-snippet">
        <div class="visit-snippet__info">
            <p>Тема посещения: <strong> {{visit.title}}</strong></p>
            <p>
                Дата посещения: <strong>{{convertDateFromJsToSql(visit.visitDate)}}</strong>
            </p>
        </div>
        <div class="visit-snippet__controls">
            <button @click="goToVisitDetails" class="btn btn__empty">Подробнее</button>
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
            goToVisitDetails() {
                this.$store.commit('SET_BACK_STATUS', 2)
                this.$router.push(`/visit-view/${this.visit.id}`)
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
    }
</script>

<style scoped>
    .visit-snippet {
        border: 1px solid #bebebe;
        padding: 10px 20px;
        cursor: pointer;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>