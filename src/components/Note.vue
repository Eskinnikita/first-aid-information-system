<template>
    <div class="visit-note">
        <div class="visit-note__target">
            {{note.noteTarget}}
        </div>
        <div class="visit-note__controls">
            <button @click="deleteNote" class="btn btn__empty">Удалить</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            note: {
                type: Object,
                required: true
            }
        },
        methods: {
            deleteNote() {
                this.$store.dispatch('deleteNote', this.note.id)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .visit-note {
        width: 100%;
        border: 1px solid #bebebe;
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        margin-bottom: 20px;
        &__target {
            width: 80%;
        }
    }
</style>