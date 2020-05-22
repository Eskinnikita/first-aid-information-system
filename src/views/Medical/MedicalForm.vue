<template>
    <div class="form-container">
        <h2>Добавление медикамента</h2>
        <div class="input-block">
            <label for="name">Название медикамента<span class="required-sign">*</span></label>
            <input
                    v-model="medical.name"
                    type="text"
                    id="name"
                    :class="{'invalid-input': ($v.medical.name.$dirty && !$v.medical.name.required)}"
            >
            <span class="input-block__error" v-if="$v.medical.name.$dirty && !$v.medical.name.required">Введите название медикамента</span>
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
    import {required} from 'vuelidate/lib/validators'
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
        validations: {
            medical: {
                name: {required}
            }
        },
        methods: {
            addMedical() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                } else {
                    this.medical.quantity = +this.medical.quantity
                    this.medical.availableQuantity = +this.medical.availableQuantity
                    this.$store.dispatch('addMedical', this.medical)
                        .then(() => this.$router.push('/medical-supplies'))
                }
            }
        }
    }
</script>

<style scoped>

</style>