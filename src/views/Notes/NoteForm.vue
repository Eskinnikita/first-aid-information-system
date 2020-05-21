<template>
    <div class="form-container">
        <h2>Добавление направления</h2>
        <div class="input-block">
            <label for="target">К кому был направлен пациент?</label>
            <input v-model="note.noteTarget" type="text" id="target"/>
        </div>
        <button style="width: 150px" @click="addNote" class="btn">Добавить</button>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                note: {
                    visitId: null,
                    noteTarget: ''
                }
            }
        },
        methods: {
            addNote() {
                this.note.visitId = this.visitsStore.visit.id
                this.$store.dispatch('addNote', this.note)
                .then(() => {this.$router.push(`/visit-view/${this.visitsStore.visit.id}`)})
            }
        },
        computed: {
            ...mapState(['visitsStore'])
        }
    }
</script>

<style scoped>

</style>