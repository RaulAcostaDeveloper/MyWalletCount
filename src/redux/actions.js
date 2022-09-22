export const actualizarClave= payload => ({ type: 'clave/actualizar', payload });

export const actualizarIngreso = payload => ({ type: 'ingreso/actualizar', payload });

export const actualizarAhorros = payload => ({ type: 'ahorros/actualizar', payload });
export const actualizarGastos = payload => ({ type: 'gastos/actualizar', payload });
export const actualizarLujos = payload => ({ type: 'lujos/actualizar', payload });

export const aniadirAhorros = payload => ({ type: 'ahorros/aniadir', payload });
export const aniadirGastos = payload => ({ type: 'gastos/aniadir', payload });
export const aniadirLujos = payload => ({ type: 'lujos/aniadir', payload });

export const fetchingPendiente = () => ({ type: 'data/pending' });
export const fetchingRecibida = () => ({ type: 'data/recibida' });
export const fetchingEnviado = () => ({ type: 'data/enviada' });
export const fetchingError = payload => ({ type: 'data/error', payload });
