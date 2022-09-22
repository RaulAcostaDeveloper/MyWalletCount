import './userInterface/Css/Global.css';

import { useEffect, useState } from 'react';
import { useRoutes, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectIngreso, selectClave, selectStatus, selectAhorros, selectGastos, selectLujos } from './redux/selectores';
import { actualizarClave, actualizarIngreso, actualizarAhorros, actualizarGastos, actualizarLujos, aniadirAhorros,aniadirGastos, aniadirLujos} from './redux/actions';
import { fetchGETClaveDatos, fetchPOSTClaveDatos } from './redux/asyncActions';

import { PrincipalPage } from './userInterface/PrincipalPage';
import { Ahorros } from './userInterface/Ahorros';
import { Gastos } from './userInterface/Gastos';
import { Lujos } from './userInterface/Lujos';
import { Premium } from './userInterface/Premium';

const App = () => {
  const dispatch = useDispatch();

  const clave   = useSelector( selectClave   );
  const ingreso = useSelector( selectIngreso );
  const ahorros = useSelector( selectAhorros );
  const gastos  = useSelector( selectGastos  );
  const lujos   = useSelector( selectLujos   );
  const status  = useSelector( selectStatus  );

  const [ restante, setRestante ] = useState(0);
  const [ promedioDiario, setPromedioDiario] = useState(0);    
  const [ forzaRenderiza, setForzaRenderiza ] = useState(false);


  useEffect(()=>{
    // Actualiza Local Storage
    localStorage.setItem('items', JSON.stringify({clave,ingreso,ahorros,gastos,lujos,status}))
  },[clave,ingreso,ahorros, gastos,lujos,status])

  useEffect(()=>{
    if ( clave ) {
      dispatch( fetchGETClaveDatos( clave ) ) 
    } else {
      console.log('No clave GET');
    }
  },[clave])

  useEffect(()=>{
    // Cálculos
      let totalAhorro = ahorros.map(ahorro => ahorro.cantidad ).reduce(( prev, curr ) => prev + curr, 0);
      let totalGastos = gastos.map( gasto => gasto.cantidad ).reduce(( prev, curr ) => prev + curr, 0);
      let totalLujos = lujos.map( lujo => lujo.cantidad ).reduce(( prev, curr ) => prev + curr, 0);
      setRestante(ingreso - totalAhorro - totalGastos - totalLujos );
  },[ingreso, ahorros, gastos, lujos]);

  useEffect(()=>{
      setPromedioDiario(restante/15);
  },[restante]);

  const handleSend = () => { //Para cada acción puede actualizar en el back end
    let payload = {
      ingreso,
      ahorros,
      gastos,
      lujos,
    }
    if ( clave ) {
      dispatch( fetchPOSTClaveDatos( clave, payload ) );
    } else {
      console.log('No clave POST');
    }
    setForzaRenderiza(!forzaRenderiza);
  }

  const handleIngreso = ( ingreso ) => {
    dispatch( actualizarIngreso( ingreso ) );
    handleSend();
  }

  const handleActualizaAhorros = ( payload ) => {
    dispatch ( actualizarAhorros ( payload ));
    handleSend();
  }

  const handleActualizaGastos = ( payload ) => {
    dispatch ( actualizarGastos ( payload ));
    handleSend();
  }

  const handleActualizaLujos = ( payload ) => {
    dispatch ( actualizarLujos ( payload ));
    handleSend();
  }

  const handleAhorro = ( ahorro ) => {
    dispatch( aniadirAhorros( ahorro ) );
    handleSend();
  }

  const handleGasto = ( gasto ) => {
    dispatch( aniadirGastos( gasto ) );
    handleSend();
  }

  const handleLujo = ( lujo ) => {
    dispatch( aniadirLujos( lujo ) );
    handleSend();
  }

  const routes = useRoutes ([
    { 
    path: '/', 
    element: <PrincipalPage
        ingreso = { ingreso }
        restante = { restante }
        handleIngreso= { handleIngreso }
        promedioDiario = { promedioDiario }
    />
    },
    { 
        path: '/ahorros', 
        element:  <Ahorros
            ahorros      = { ahorros }
            handleAhorro = { handleAhorro }
            restante     = { restante }
            handleActualizaAhorros = { handleActualizaAhorros }
        />
    },
    { 
        path: '/gastos', 
        element:  <Gastos
            gastos      = { gastos }
            handleGasto = { handleGasto }
            restante    = { restante }
            handleActualizaGastos = { handleActualizaGastos }
        />
    },
    { 
        path: '/lujos', 
        element:  <Lujos
            lujos      = { lujos }
            handleLujo = { handleLujo }
            restante   = { restante }
            handleActualizaLujos = { handleActualizaLujos }
        /> 
    },
    { 
        path: '/premium', 
        element:  <Premium/> 
    },
  ]);

  return (
    <Routes>
      <Route
        path = '/'
        element = { <PrincipalPage
          ingreso = { ingreso }
          restante = { restante }
          handleIngreso= { handleIngreso }
          promedioDiario = { promedioDiario }
        /> }
      />
      <Route
        path = '/ahorros'
        element = { <Ahorros
          ahorros      = { ahorros }
          handleAhorro = { handleAhorro }
          restante     = { restante }
          handleActualizaAhorros = { handleActualizaAhorros }
        /> }
      />
      <Route
        path = '/gastos'
        element = { <Gastos
          gastos      = { gastos }
          handleGasto = { handleGasto }
          restante    = { restante }
          handleActualizaGastos = { handleActualizaGastos }
        /> }
      />
      <Route
        path = '/lujos'
        element = {  <Lujos
          lujos      = { lujos }
          handleLujo = { handleLujo }
          restante   = { restante }
          handleActualizaLujos = { handleActualizaLujos }
        />  }
      />
      <Route
        path = '/premium'
        element = {  <Premium/>   }
      />
    </Routes>
  )
  return routes;
}

export default App;