<script setup>
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { useField, useForm } from 'vee-validate'
import Medicamento from '@/Medicamento.js'
import { ref } from 'vue'


let medicamentos = new Map()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    nombre (value) {
      if (value?.length >= 2) return true

      return 'El nombre debe tener al menos 2 caracteres.'
    },
    categoria (value) {
      if (value?.length >= 2) return true

      return 'La categoria debe tener al menos 2 caracteres.'
    },
    cantidad (value) {
      if (value !== undefined) return true

      return 'Debe insertar una cantidad.'
    },
    precio (value) {
      if(value > 10) return true

      return 'Debe insertar una cantidad.'
    }
  },
})
const nombre = useField('nombre')
const categoria = useField('categoria')
const cantidad = useField('cantidad')
const precio = useField('precio')
const listaNombres = ref([])
const existencias = useField('existencias')
const nombreActualizar = ref('')

const submit = handleSubmit(values => {
  medicamentos.has(values.nombre) ? alert('Ya existe ese medicamento') : medicamentos.set(values.nombre, new Medicamento(values.nombre, values.categoria, values.cantidad, values.precio))
  console.log(medicamentos)
  listaNombres.value.push(values.nombre.toString())
  console.log(listaNombres)
})

const agregarExistencias = () =>{
  medicamentos.has()
}
</script>

<template>
  <h1 class="mt-10 text-center text-h2 mb-14">Gestión de Inventarios de Farmacia</h1>
  <form @submit.prevent="submit" class="ml-lg-10 w-lg-25">
    <h2 class="text-center mb-2">Crear medicamento</h2>
    <v-text-field
      v-model="nombre.value.value"
      :counter="80"
      :error-messages="nombre.errorMessage.value"
      label="Nombre"
    ></v-text-field>

    <v-text-field
      v-model="categoria.value.value"
      :counter="50"
      :error-messages="categoria.errorMessage.value"
      label="Categoria"
    ></v-text-field>

    <v-number-input
      class="w-50"
      control-variant="stacked"
      label="Cantidad"
      :max="1000000"
      :min="10"
      v-model="cantidad.value.value"
    ></v-number-input>

    <v-number-input
      class="w-50"
      control-variant="stacked"
      label="Precio"
      :max="1000000"
      :min="1"
      v-model="precio.value.value"
    ></v-number-input>

    <v-btn
      class="me-4 bg-blue font-weight-bold"
      type="submit"
    >
      Crear
    </v-btn>

    <v-btn @click="handleReset">
      Limpiar campos
    </v-btn>
  </form>

  <div class="ml-lg-10 mt-lg-16 w-lg-25">
    <h2 class="text-center mb-2">Actualizar existencias</h2>
    <v-autocomplete
      class=""
      label="Nombre del medicamento"
      :items="listaNombres"
      v-model="nombreActualizar"
    ></v-autocomplete>
    <v-number-input
      class="w-50"
      control-variant="stacked"
      label="Existencias"
      :max="1000000"
      :min="1"
      v-model="existencias.value.value"
    ></v-number-input>
    <v-btn
    class="bg-blue font-weight-bold"
    @click="agregarExistencias"
    >
      Actualizar
    </v-btn>
  </div>


</template>

<style scoped>
</style>