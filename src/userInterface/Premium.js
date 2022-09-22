import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal } from './Modal';
import './Css/Premium.css';
export const Premium = () => {
    const [ openModal, setOpenModal ] = useState(false);
    const [ mensageModal, setMensajeModal ] = useState('');
    return (
        <div className='userInterface'>
            <div className='Premium'> 
                <NavLink className='navlink' to='/'>
                    <div className='header'>
                        <span>Atras</span>
                    </div>
                </NavLink>
                <div className='info'>
                    <div>

                    <p>Consigue la función premium</p>
                    <p>Recibirás beneficios</p>
                    </div>
                </div>
                <div 
                    className='ConseguirPremium'
                    onClick = { () => { setMensajeModal('No existe el servicio'); setOpenModal(true) }} >
                        Conseguir premium
                </div>

                { openModal && 
                    <Modal mensageModal = { mensageModal } setOpenModal = { setOpenModal }/>
                }

            </div>
        </div>
    )
}