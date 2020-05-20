<template>
    <div class="control-panel">
        <button v-for="(button, index) in controlButtons" :key="index" @click="routeTo(button.uri)">
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
                        uri: ''
                    },
                    {
                        content: 'Медикаменты',
                        uri: ''
                    },
                    {
                        content: 'Врачи',
                        uri: ''
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
        display: grid;
        grid-template-columns: repeat(3, auto);

        button {
            height: 50px;
        }
    }
</style>