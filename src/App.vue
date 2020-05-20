<template>
    <div id="app">
        <header-comp v-if="hiddenHeader"/>
        <div class="wrapper">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Header from "./components/Header"
    export default {
        components: {
            'header-comp': Header
        },
        computed: {
            hiddenHeader() {
                return this.$route.name !== 'Login'
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: sans-serif;
    }

    .wrapper {
        max-width: 900px;
        margin: 0 auto;
    }

    a {
        color: #000;
        text-decoration: none;
    }

    .thin-container {
        margin: 0 auto;
        max-width: 600px;
    }

    .form-container {
        margin: 0 auto;
        max-width: 500px;
    }

    .input-block {
        text-align: left;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        label {

        }

        input {
            font-size: 15px;
            margin-top: 5px;
            padding: 5px 10px;
            box-sizing: border-box;
            border: 1px solid #bebebe;
        }

        select {
            font-size: 15px;
            margin-top: 5px;
            padding: 5px 10px;
            box-sizing: border-box;
            border: 1px solid #bebebe;
        }
    }

    button {
        margin: 10px;
        background-color: #3b464d;
        color: #fff;
        padding: 10px;
        font-size: 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
            opacity: 0.7;
        }
    }

    .required-sign {
        color: red;
        padding-left: 3px;
    }

</style>
