<template>
    <div class="control-panel">
        <button class="btn" v-for="(button, index) in controlButtons" :key="index" @click="routeTo(button.uri)">
            {{ button.content }}
        </button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                controlButtons: [
                    {
                        content: 'Пациенты',
                        uri: '/patients'
                    },
                    {
                        content: 'Посещения',
                        uri: '/visits'
                    },
                    {
                        content: 'Медикаменты',
                        uri: ''
                    },
                    {
                        content: 'Врачи',
                        uri: '/doctors'
                    }
                ]
            }
        },
        methods: {
            routeTo(uri) {
                this.$router.push(uri)
            }
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