import ArticuloBase from './ArticuloBase'

export default class Medicamento extends ArticuloBase {
  constructor(nombre, categoria, precio, cantidad) {
    super(nombre, categoria)
    this.precio = precio
    this.cantidad = cantidad
  }
  aumentarCantidad(cant){
    this.cantidad += cant
  }
}
