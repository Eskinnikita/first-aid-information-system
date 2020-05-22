<template>
    <div class="form-container">
        <h2>Добавление направления</h2>
        <div class="input-block">
            <label for="target">К кому был направлен пациент?</label>
            <input
                    v-model="note.noteTarget"
                    type="text"
                    id="target"
                    :class="{'invalid-input': ($v.note.noteTarget.$dirty && !$v.note.noteTarget.required)}"
            />
            <span class="input-block__error" v-if="$v.note.noteTarget.$dirty && !$v.note.noteTarget.required">Введите направление</span>
        </div>
        <button style="width: 150px" @click="addNote" class="btn">Добавить</button>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators'
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
        validations: {
            note: {
                noteTarget: {required}
            }
        },
        methods: {
            addNote() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                } else {
                    this.note.visitId = this.visitsStore.visit.id
                    console.log(this.note)
                    this.$store.dispatch('addNote', this.note)
                        .then(() => {
                            this.$router.push(`/visit-view/${this.visitsStore.visit.id}`)
                        })
                }
            }
        },
        computed: {
            ...mapState(['visitsStore'])
        }
    }
</script>

<style scoped>

</style>