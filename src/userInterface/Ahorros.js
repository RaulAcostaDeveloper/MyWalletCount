import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal } from './Modal';
import './Css/Lista.css';
import './Css/Formulario.css';

export const Ahorros =({ ahorros, handleAhorro, restante, handleActualizaAhorros })=>{
    const [ openModal, setOpenModal ] = useState(false);
    const [ mensageModal, setMensajeModal ] = useState('');

    const [ openForm, setOpenForm ] = useState(false);
    const [ nombre, setNombre ] = useState('');
    const [ cantidad, setCantidad ] = useState('');
    const handleToggleForm = ()=>{
        setOpenForm(!openForm);
    }

    const handleAniadir = (e) => {
        e.preventDefault();
        // Validaciones
        if (nombre.length<=0) {
            setOpenModal(true);
            setMensajeModal('Escribe el nombre');
            return;
        }
        if (nombre.length>20 ) {
            setOpenModal(true);
            setMensajeModal('Escribe un nombre mas corto');
            return;
        }
        if (typeof(Number(cantidad)) != 'number') {
            setOpenModal(true);
            setMensajeModal('La cantidad debe ser un número');
            return;
        }
        if (Number(cantidad) <= 0) {
            setOpenModal(true);
            setMensajeModal('La cantidad debe ser positiva');
            return;
        }
        if (Number(cantidad) > restante) {
            setOpenModal(true);
            setMensajeModal('La cantidad no puede ser mayor a lo que te resta de dinero');
            return;
        }
        // Si pasa las validaciones
        const id = Math.random().toString(36); //Crea un id random
        handleAhorro({
            nombre,
            cantidad: Number(cantidad),
            id,
        })
        setNombre('');
        setCantidad('');
        handleToggleForm();

    }

    const handleBorrar = id => {
        let nuevoArreglo = ahorros;
        for (let index = 0; index < nuevoArreglo.length; index++) {
            if (nuevoArreglo[index].id === id) {
                nuevoArreglo.splice(index, 1);
            }
        }
        handleActualizaAhorros( nuevoArreglo )
    }

    return (
        <div className='userInterface'>
            <div className='listaScreen'> 
                <NavLink className='navlink' to='/'>
                    <div className='header'>
                        <span>Atras</span>
                    </div>
                </NavLink>
                <button className='agregarBoton' onClick={handleToggleForm} >
                    <div className='agregarAhorrosBoton'>
                        <span>Agregar ahorro</span>
                    </div>
                </button    >
                    { openForm &&
                    <div className='formulario'>
                        <div className='fondoGris' onClick={handleToggleForm}>
                        </div>
                            <form onSubmit={handleAniadir}>
                                <button className='botonCerrar' onClick={handleToggleForm}>X</button>
                                <input type={'text'} 
                                    value = { nombre } 
                                    onChange={(e)=> setNombre(e.target.value)} 
                                    placeholder='nombre'/>
                                <input type={'number'} 
                                    value = { cantidad } 
                                    onChange={(e)=> setCantidad(e.target.value)} 
                                    placeholder='cantidad'/>
                                <button className='botonAniadir' type='submit'>Añadir</button>
                            </form>
                    </div>
                    }
                <div className='contenedorLista'>
                    {ahorros.map( ahorro =>
                            <div className='contenedorElemento'  key={ahorro.id}>
                                <div className='contenedorNombre'>
                                    <span>{ahorro.nombre}</span>
                                </div>
                                <div className='contenedorCantidad'>
                                    <span>{ahorro.cantidad}</span>
                                </div>
                                <button className='contenedorBorrar' onClick={()=>handleBorrar(ahorro.id)}>
                                    <span>X</span>
                                </button>
                            </div>
                    )}
                </div>
                { openModal && 
                    <Modal mensageModal = { mensageModal } setOpenModal = { setOpenModal }/>
                }
            </div>
        </div>
    )
}