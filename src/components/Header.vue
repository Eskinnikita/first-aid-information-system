<template>
    <div class="header">
        <div class="header__wrapper wrapper">
            <router-link to="/"><h2 class="header__title">ИС Медпункта</h2></router-link>
            <div class="header__user">
                <div class="header__name" v-if="user">
                    {{user.lastName}} {{spliceName(user.firstName)}} {{spliceName(user.middleName)}}
                </div>
                <button @click="logout">Выйти</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        methods: {
            logout() {
                this.$store.dispatch('logoutUser')
                .then(() => {this.$router.push('/login')})
            },
            spliceName(word) {
                return word[0]+'.'
            }
        },
        computed: {
            ...mapState(['user']),
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        height: auto;
        border-bottom: 1px solid #bebebe;
        margin-bottom: 20px;

        &__wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__user {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        &__title {
            color: #000;
            text-decoration: none;
        }
    }
</style>