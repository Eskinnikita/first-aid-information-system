<template>
    <div class="visit-snippet">
        <h2>{{visit.title}}</h2>
    </div>
</template>

<script>
    export default {
        props: {
            visit: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .visit-snippet {
        border: 1px solid #bebebe;
        padding: 15px 20px 5px;
        cursor: pointer;
        margin-bottom: 30px;
    }
</style>