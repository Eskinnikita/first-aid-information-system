<template>
    <div class="login">
        <h1>ИC Медпункта</h1>
        <form class="login__form">
            <h1>Авторизация</h1>
            <div class="input-block">
                <label for="name">
                    ФИО
                </label>
                <input v-model="fullName" type="text" id="name">
            </div>
            <div class="input-block">
                <label for="password">
                    Пароль
                </label>
                <input v-model="user.password" autocomplete="on" type="password" id="password">
            </div>
            <button @click.prevent="login" class="btn">Войти</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fullName: '',
                user: {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                this.user.lastName = this.fullName.split(' ')[0]
                this.user.firstName = this.fullName.split(' ')[1]
                this.user.middleName = this.fullName.split(' ')[2]
                this.$store.dispatch('loginUser', this.user)
                .then(() => this.$router.push('/'))
                .catch(err => console.log(err))
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        width: 100%;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;

        &__form {
            display: flex;
            flex-direction: column;
            border: 1px solid #bebebe;
            box-sizing: border-box;
            padding: 15px 60px 35px 60px;
            margin-bottom: 100px;
            min-width: 400px;
            text-align: center;
        }
    }
</style>