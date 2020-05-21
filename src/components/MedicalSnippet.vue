<template>
    <div class="medical-snippet">
        <div class="medical-snippet__header">
            <h4>Название: {{medical.name}}</h4>
            <button class="btn btn__empty" style="padding: 5px" @click="deleteMedical">Удалить</button>
        </div>
        <p>Необходимое количество: {{medical.quantity}}</p>
        <div class="medical-snippet__available-quantity">
            <p style="margin-right: 5px;">Доступное количество: </p>
            <div v-if="!editMode">{{medical.availableQuantity}}</div>
            <div v-if="editMode" class="input-block">
                <input v-model="medical.availableQuantity" type="number">
            </div>
            <button v-if="!editMode" class="btn btn__empty" style="padding: 5px" @click="toggleEditMode">Обновить</button>
            <button v-if="editMode" class="btn btn__empty" style="padding: 5px" @click="updateQuantity">Сохранить</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            medical: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                editMode: false
            }
        },
        methods: {
            deleteMedical() {
                this.$store.dispatch('deleteMedical', this.medical.id)
            },
            toggleEditMode() {
                this.editMode = !this.editMode
            },
            updateQuantity() {
                this.medical.availableQuantity = +this.medical.availableQuantity
                this.$store.dispatch('updateMedical', this.medical)
                .then(() => {
                    this.toggleEditMode()
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .medical-snippet {
        padding: 10px 15px;
        border: 1px solid #bebebe;
        margin-bottom: 20px;
        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__available-quantity {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }
</style>