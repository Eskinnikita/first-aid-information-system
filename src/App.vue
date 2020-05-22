<template>
    <div id="app">
        <header-comp v-if="hiddenHeader"/>
        <div class="loading" v-show="loadingStatus">
            <clip-loader/>
        </div>
        <div class="wrapper" v-show="!loadingStatus">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Header from "./components/Header"
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
    export default {
        components: {
            'header-comp': Header,
            'clip-loader': ClipLoader
        },
        created() {
        },
        computed: {
            ...mapState(['loadingStatus']),
            hiddenHeader() {
                return this.$route.name !== 'Login'
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: sans-serif;
        padding-bottom: 40px;
    }

    .wrapper {
        max-width: 900px;
        margin: 0 auto;
    }

    .page-title {
        text-align: left;
        margin: 0;
    }

    .invalid-input {
        border: 1px solid red !important;
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
        text-align: center;
    }

    .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 17%;
    }

    .input-block {
        text-align: left;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        &__error {
            color: red;
            margin-top: 5px;
            font-size: 13px;
        }

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

        textarea {
            font-size: 15px;
            resize: none;
            padding: 5px 10px;
            margin-top: 3px;
            border: 1px solid #bebebe;
        }
    }

    .btn {
        margin: 10px;
        background-color: #3b464d;
        color: #fff;
        padding: 10px;
        font-size: 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s;

        &__empty {
            background: none;
            border: 1px solid #3b464d;
            color: #3b464d;
            font-weight: bold;
            box-sizing: border-box;
        }

        &:hover {
            opacity: 0.7;
        }
    }

    .required-sign {
        color: red;
        padding-left: 3px;
    }

    .toast-text {
        font-family: sans-serif;
    }

</style>
