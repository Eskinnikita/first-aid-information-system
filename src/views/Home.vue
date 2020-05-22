<template>
    <div class="control-panel">
        <button class="btn" @click="getData('getPatients', '/patients')">
            Пациенты
        </button>
        <button class="btn" @click="getData('getVisits', '/visits')">
            Посещения
        </button>
        <button class="btn" @click="getData('getMedicals', '/medical-supplies')">
            Медикаменты
        </button>
        <button v-if="user && user.isAdmin" class="btn" @click="getData('getDoctors', '/doctors')">
            Врачи
        </button>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {

            }
        },
        methods: {
            getData(method, route) {
                this.$store.dispatch(method)
                    .then(() => {
                        this.$router.push(route)
                    })
            }
        },
        computed: {
            ...mapState(['user'])
        }
    }
</script>

<style lang="scss" scoped>
    .control-panel {
        /*display: grid;*/
        /*grid-template-columns: repeat(3, auto);*/
        display: flex;
        flex-direction: column;
        width: 500px;
        margin: 0 auto;

        button {
            height: 50px;
        }
    }
</style>