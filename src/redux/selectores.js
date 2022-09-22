export const selectIngreso = state => {
    const { ingreso } = state;
    return ingreso;
}
export const selectClave = state => {
    const { clave } = state;
    return clave;
}
export const selectStatus = state => {
    const { status } = state;
    return status;
}
export const selectAhorros = state => {
    const { ahorros } = state;
    return ahorros;
}
export const selectGastos = state => {
    const { gastos } = state;
    return gastos;
}
export const selectLujos = state => {
    const { lujos } = state;
    return lujos;
}