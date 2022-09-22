import { fetchingPendiente, fetchingRecibida, fetchingEnviado, fetchingError} from './actions';
import { actualizarIngreso, actualizarAhorros, actualizarGastos, actualizarLujos } from './actions';

export const fetchGETClaveDatos = ( clave ) => async dispatch => {
    dispatch( fetchingPendiente() );
    try {
        const url = 'https://mywalletcountback.com/' + clave;
        const response = await fetch (url);
        const dataFetch = await response.json();
        dispatch( fetchingRecibida() ); 
        console.log(dataFetch);
        //Actualizado de datos
        dispatch( actualizarIngreso('data ingreso') );
        dispatch( actualizarAhorros('data ahorros') );
        dispatch( actualizarGastos('data gastos') );
        dispatch( actualizarLujos('data lujos') );

    } catch (e) {
        dispatch( fetchingError(e.message) ); 
    }
}

export const fetchPOSTClaveDatos = ( clave, data ) => async dispatch => {
    dispatch( fetchingPendiente() );
    try {
        const url = 'https://mywalletcountback.com/' + clave;
        const response = await fetch ( url ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer tokenDeAutenticación',
            },
            body: JSON.stringify({
                data: data,
            })
        });
        const respuesta = await response.json();
        console.log(respuesta);
        dispatch( fetchingEnviado() ); 
    } catch (e) {
        dispatch( fetchingError(e.message) );
    }
}