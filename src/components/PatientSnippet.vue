<template>
    <div class="patient-snippet" v-if="patient">
        <div class="patient-snippet__main-info">
            <div class="main-info__name">
                {{patient.lastName}} {{patient.firstName}} {{patient.middleName}}
            </div>
            <div class="main-info__group">
                Группа: {{patient.groupNum}}
            </div>
        </div>
        <div class="patient-snippet__additional-info">
            <div class="additional-info__policy">
                Номер полиса: {{patient.medicalPolicy}}
            </div>
            <div class="additional-info__policy">
                <button class="btn btn__empty" @click="goToPatientInfo(patient.id)">Перейти</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            patient: {
                type: Object,
                required: true
            }
        },
        methods: {
            goToPatientInfo(id) {
                this.$router.push(`/patient-view/${id}`)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .patient-snippet {
        border: 1px solid #bebebe;
        padding: 15px 20px 5px;
        cursor: pointer;
        margin-bottom: 30px;

        &__main-info {
            display: flex;
            justify-content: space-between;
        }

        &__additional-info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            button {
                margin-right: 0;
            }
        }
    }

    .main-info {
        &__name {
            font-size: 18px;
            font-weight: bold;
        }
    }
</style>