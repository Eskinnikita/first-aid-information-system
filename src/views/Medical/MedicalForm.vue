<template>
    <div class="form-container">
        <h2>Добавление медикамента</h2>
        <div class="input-block">
            <label for="name">Название медикамента</label>
            <input v-model="medical.name" type="text" id="name">
        </div>
        <div class="input-block">
            <label for="quantity">Название медикамента</label>
            <input v-model="medical.quantity" type="number" id="quantity">
        </div>
        <div class="input-block">
            <label for="availableQuantity">Название медикамента</label>
            <input v-model="medical.availableQuantity" type="number" id="availableQuantity">
        </div>
        <button class="btn" @click="addMedical" style="width: 150px">Добавить</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                medical: {
                    name: '',
                    quantity: 0,
                    availableQuantity: 0
                }
            }
        },
        methods: {
            addMedical() {
                this.medical.quantity = +this.medical.quantity
                this.medical.availableQuantity = +this.medical.availableQuantity
                this.$store.dispatch('addMedical', this.medical)
                .then(() => this.$router.push('/medical-supplies'))
            }
        }
    }
</script>

<style scoped>

</style>