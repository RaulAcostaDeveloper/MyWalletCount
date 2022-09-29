import { combineReducers } from "redux";
// Traer los datos de local storage
let initialClave = '';
let initialIngreso = 0;
let initialAhorros = [];
let initialGastos = [];
let initialLujos = [];

// localStorage.clear(); // <--------------------------------------------------------

let items = JSON.parse(localStorage.getItem('items'));
if (items) {
    console.log('LocalStorage');
    console.log(items);
    initialClave = items.clave;
    initialIngreso = items.ingreso;
    initialAhorros = items.ahorros;
    initialGastos = items.gastos;
    initialLujos = items.lujos;
}


const claveReducer = (state = initialClave, action) => {
    switch (action.type) {
        case 'clave/actualizar':
            return action.payload;
        default:
            return state;
    }
}
const ingresoReducer = (state = initialIngreso, action) => {
    switch (action.type) {
        case 'ingreso/actualizar':
            return action.payload;
        default:
            return state;
    }
}
const ahorrosReducer = (state = initialAhorros, action) =>{
    switch (action.type) {
        case 'ahorros/actualizar': {
            return  state = action.payload;
        }
        case 'ahorros/aniadir': {
            return state.concat({ ...action.payload });
        }
        default:
            return state;
    }
}
const gastosReducer = (state = initialGastos, action) => {
    switch (action.type) {
        case 'gastos/actualizar': {
            return action.payload;
        }
        case 'gastos/aniadir': {
            return state.concat({ ...action.payload });
        }
        default:
            return state;
    }
}
const lujosReducer = (state = initialLujos, action) => {
    switch (action.type) {
        case 'lujos/actualizar': {
            return action.payload;
        }
        case 'lujos/aniadir': {
            return state.concat({ ...action.payload });
        }
        default:
            return state;
    }
}
const initialFetching = { loading: 'idle', error: null }
const fetchingReducer = (state = initialFetching, action) => {
    switch (action.type) {
        case 'data/pending':{
            return { ...state, loading: 'pending' }
        }
        case 'data/recibida': {
            return { ...state, loading: 'succeded' }
        }
        case 'data/enviada': {
            return { ...state, loading: 'succeded' }
        }
        case 'data/error': {
            return { ...state, loading: 'rejected', error: action.error }
        }
        default:
            return state;
    }
}

export const reducer = combineReducers({
    clave: claveReducer,
    status: fetchingReducer,
    ingreso: ingresoReducer,
    ahorros: ahorrosReducer,
    gastos: gastosReducer,
    lujos: lujosReducer,
})
