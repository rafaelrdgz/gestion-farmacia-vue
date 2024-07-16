<script setup>
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { useField, useForm } from 'vee-validate'
import Medicamento from '@/Medicamento.js'
import { ref } from 'vue'

let medicamentos = new Map()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    nombre(value) {
      if (value?.length >= 2) return true

      return 'El nombre debe tener al menos 2 caracteres.'
    },
    categoria(value) {
      if (value?.length >= 2) return true

      return 'La categoria debe tener al menos 2 caracteres.'
    }
  }
})

const nombre = useField('nombre')
const categoria = useField('categoria')
const cantidad = useField('cantidad')
const precio = useField('precio')
const listaNombres = ref([])
const existencias = useField('existencias')
const nombreActualizar = ref('')
const medicamentosPorCategoria = ref([])
const buscarMedCategoria = ref('buscarMedCategoria')
const listaCategorias = ref([])
buscarMedCategoria.value = null

const submit = handleSubmit(async (values) => {
  try {
    await crearMedicamento(values)
    listaNombres.value.push(values.nombre.toString())
    alert('Medicamento creado con éxito')
    if (!buscarCategoria(values.categoria)) listaCategorias.value.push(values.categoria)
  } catch (error) {
    alert(error.message)
  }
})

async function crearMedicamento(values) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (medicamentos.has(values.nombre)) {
        reject(new Error('Ya existe ese medicamento'))
      } else {
        medicamentos.set(
          values.nombre,
          new Medicamento(values.nombre, values.categoria, values.precio, values.cantidad)
        )
        resolve()
      }
    }, 1000)
  })
}

function buscarCategoria(cat) {
  for (let c of listaCategorias.value) {
    if (c === cat) return true
  }
  return false
}

const aumentarExistencias = () => {
  if (!medicamentos.has(nombreActualizar.value)) {
    alert('No existe ese medicamento')
  } else {
    medicamentos.get(nombreActualizar.value).aumentarCantidad(existencias.value.value)
    existencias.value.value = 0
    nombreActualizar.value = ' '
  }
}

const decrementarExistencias = () => {
  if (!medicamentos.has(nombreActualizar.value)) {
    alert('No existe ese medicamento')
  } else {
    medicamentos.get(nombreActualizar.value).decrementarCantidad(existencias.value.value)
    existencias.value.value = 0
    nombreActualizar.value = ' '
  }
}

const buscarPorCategoria = () => {
  medicamentosPorCategoria.value.splice(0, medicamentosPorCategoria.value.length)
  let found = false
  let arr = [...medicamentos.values()]
  console.log(buscarMedCategoria.value)
  console.log(arr)
  for (let m of arr) {
    if (m.categoria === buscarMedCategoria.value) {
      medicamentosPorCategoria.value.push(m)
      found = true
    }
  }
  if (!found) alert('No existen medicamentos en dicha categoria')
}
</script>

<template>
  <h1 class="mt-10 text-center text-h2 mb-14">Gestión de Inventarios de Farmacia</h1>
  <v-row class="ml-3 mr-3 mr-lg-16">
    <v-col class="ml-lg-16 ml-sm-10">
      <form @submit.prevent="submit" class="w-md-50">
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
          class="w-lg-50"
          control-variant="stacked"
          label="Cantidad"
          :max="1000000"
          :min="1"
          v-model="cantidad.value.value"
        ></v-number-input>

        <v-number-input
          class="w-lg-50"
          control-variant="stacked"
          label="Precio"
          :max="1000000"
          :min="1"
          v-model="precio.value.value"
        ></v-number-input>

        <v-btn class="me-4 bg-blue font-weight-bold" type="submit"> Crear </v-btn>

        <v-btn class="mt-md-3 mt-lg-0" @click="handleReset"> Limpiar campos </v-btn>
      </form>

      <div class="w-md-50 mt-md-16">
        <h2 class="text-center mb-2">Actualizar existencias</h2>
        <v-autocomplete
          class=""
          label="Nombre del medicamento"
          :items="listaNombres"
          v-model="nombreActualizar"
        ></v-autocomplete>
        <v-number-input
          class="w-lg-50"
          control-variant="stacked"
          label="Existencias"
          :max="1000000"
          :min="1"
          v-model="existencias.value.value"
        ></v-number-input>
        <v-row class="ml-auto">
          <v-btn class="bg-blue font-weight-bold" @click="aumentarExistencias"> Aumentar </v-btn>
          <v-btn
            class="bg-blue font-weight-bold ml-lg-10 mt-md-3 mt-lg-0"
            @click="decrementarExistencias"
            >Decrementar</v-btn
          >
        </v-row>
      </div>
    </v-col>
    <v-col class="mr-lg-16">
      <div>
        <h2>Busqueda por categoria</h2>
        <v-autocomplete
          class="w-50"
          label="Categoria"
          :items="listaCategorias"
          v-model="buscarMedCategoria"
        ></v-autocomplete>
        <v-btn class="bg-blue font-weight-bold" @click="buscarPorCategoria"> Buscar </v-btn>
        <v-data-table class="mr-15" :items="medicamentosPorCategoria"></v-data-table>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped></style>
